import { useState, useEffect } from "react";

// ? icons
import { IoAddOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import { TbSettingsQuestion } from "react-icons/tb";

// * hooks
import { useFetch, useCreate, useUpdate } from "../hooks/useFirestore"
import toast from "react-hot-toast";
import { collection } from "firebase/firestore";

function Orders() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const [modal, setModal] = useState(false)
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [quantity, setQuantity] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState("")

  const { data: orders, fetchItems, loading } = useFetch("products")
  const { createItem, loading: creating } = useCreate("products");
  const { updateItem } = useUpdate("products");


  useEffect(() => { fetchItems() }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    if (!name || !color || !costPrice || !sellPrice || !quantity || !costPrice || !sellPrice || !date) {
      toast.error("Please, fill in the required fields.")
      return
    }
    try {
      await createItem({ name, brand, size, color, quantity: Number(quantity), costPrice: Number(costPrice), sellPrice: Number(sellPrice), orderDate: date, status: "ordered" })
      toast.success("Product added")
      setModal(false)
      fetchItems()
    } catch (err) {
      toast.error("Error" + err.message)
    }

  }

  const filteredOrders = orders
    ?.filter((item) => {
      if (filter === "all") return true;
      if (filter === "ordered") return item.status === "ordered";
      if (filter === "arrived") return item.status === "in_stock";
      return true;
    })
    .filter((item) =>
      `${item.name} ${item.brand} ${item.color}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  async function handleMarkArrived(id) {
    try {
      await updateItem(id, { status: "in_stock" });
      toast.success("Ombor holatiga o'tkazildi!");
      fetchItems();
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    }
  }

  return (
    <div className="py-5 px-7">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold dark:text-white">All Orders</h1>
        <button onClick={() => setModal(!modal)} className="flex items-center gap-2 bg-[#4f46e5] rounded-lg text-white px-4 py-1.5 cursor-pointer "><IoAddOutline /> New Order </button>
      </div>

      <div className="w-full h-[55px] rounded-lg border border-gray-200 my-5 bg-white dark:bg-[#1e293b] dark:border-[#334155] flex items-center justify-center gap-4 px-3">
        <div className="w-[83%] h-[35px] rounded-md bg-[#f1f5f9] dark:bg-[#1e293b] border-1 border-gray-200 dark:border-[#334155] flex items-center gap-3 px-2">
          <IoSearch className="text-[#b9c4d2] dark:text-[#64748b]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="focus-within:outline-none w-full placeholder-slate-400 dark:placeholder-slate-500" placeholder="Search by product, brand, color..." />
        </div>
        <div className="w-[17%] h-[35px] rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] flex items-center p-1 gap-1">
          <button onClick={() => setFilter("all")} className={`flex-1 h-full text-xs font-medium rounded-md transition-colors cursor-pointer ${filter === "all" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>All</button>
          <button onClick={() => setFilter("ordered")} className={`flex-1 h-full text-xs font-medium rounded-md transition-colors cursor-pointer ${filter === "ordered" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>Ordered</button>
          <button onClick={() => setFilter("arrived")} className={`flex-1 h-full text-xs font-medium rounded-md transition-colors cursor-pointer ${filter === "arrived" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}>Arrived</button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 dark:text-slate-500 border-b border-gray-200 dark:border-[#334155] bg-slate-50 dark:bg-slate-800/50">
              <th className="p-3 font-medium">Product</th>
              <th className="p-3 font-medium">Brand</th>
              <th className="p-3 font-medium">Size</th>
              <th className="p-3 font-medium">Color</th>
              <th className="p-3 font-medium">Qty</th>
              <th className="p-3 font-medium">Cost Price</th>
              <th className="p-3 font-medium">Sell Price</th>
              <th className="p-3 font-medium">Order Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-slate-400">Yuklanmoqda...</td>
              </tr>
            ) : filteredOrders?.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-slate-400">Hali mahsulot yo'q</td>
              </tr>
            ) : (
              filteredOrders?.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-[#334155] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{item.brand || "-"}</td>
                  <td className="p-3">{item.size}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{item.color}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">${item.costPrice}</td>
                  <td className="p-3 font-medium">${item.sellPrice}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{item.orderDate || "-"}</td>
                  <td className="p-3">
                    {item.status === "ordered" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Ordered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Arrived
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.status === "ordered" ? (
                      <button onClick={() => handleMarkArrived(item.id)} className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium cursor-pointer flex items-center gap-2"> <FaRegCheckCircle />Mark as Arrived</button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaRegCheckCircle className="text-[#25c690]" />
                        <p className="text-xs text-gray-400">In WareHouse</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-[#334155] bg-slate-50 dark:bg-slate-800/30 w-full">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {filteredOrders?.length || 0} orders
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Total cost: <span className="font-semibold text-slate-800 dark:text-slate-100">
              ${filteredOrders?.reduce((sum, item) => sum + (Number(item.costPrice) || 0) * (Number(item.quantity) || 0), 0).toFixed(2)}
            </span>
          </p>
        </div>
      </div>


      {/* modal */}
      <div>
        <div onClick={() => setModal(false)} className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${modal ? "opacity-100 pointer-events-auto blur-lg" : "opacity-0 blur-xl pointer-events-none"}`} />
        <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-xl z-50 transition-transform duration-300 ease-in-out ${modal ? "translate-x-0" : "translate-x-full"}`}>

          <div className="flex items-start justify-between p-5 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">New Order</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Add a supplier order</p>
            </div>
            <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xl mt-1 cursor-pointer">
              <IoMdClose />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto h-[calc(100%-73px)] flex flex-col gap-4">
            {/* name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Product Name <span className="text-red-500">*</span></label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Men's Bomber Jacket" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500" />
            </div>
            {/* brand */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. UrbanWear" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* size */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Size <span className="text-red-500">*</span></label>
                <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500">
                  <option>XS</option>
                  <option>S</option>
                  <option defaultValue>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              {/* color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Color <span className="text-red-500">*</span></label>
                <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="e.g. Navy Blue" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Quantity <span className="text-red-500">*</span></label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Cost Price <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">$</span>
                  <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="0" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg pl-7 pr-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Sell Price <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">$</span>
                  <input type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="0" className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg pl-7 pr-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Order Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg px-3 py-2.5 text-sm outline-none text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Image URL <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span></label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} className="..." />            </div>

            <div className="flex items-center gap-3 ">
              <button
                type="submit"
                disabled={creating}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Saqlanmoqda..." : "Place Order"}
              </button>              <button type="button" onClick={() => setModal(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium px-4">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Orders