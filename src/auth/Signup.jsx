import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = !email.trim() && !password.trim() && !name.trim()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isFormValid) {
            toast("Barcha maydonlar to'ldirilmagan!.", {
                icon: "⚠️",
                style: { background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74" }
            });
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });

            toast.success("Hisob muvaffaqiyatli yaratildi!");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm text-slate-600 mb-1">Ism</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ismingiz" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="mb-4">
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="name@company.com" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="mb-2">
                <label className="block text-sm text-slate-600 mb-1">Parol</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="********" className="w-full border border-slate-200 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
            </div>
            <button type="submit" className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg mt-2 transition-colors">Hisob yaratish</button>
        </form>
    )
}

export default Signup