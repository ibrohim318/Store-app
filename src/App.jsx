import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import ProtectedRoute from "./auth/ProtectedRoute"
import Auth from "./auth/Auth"
import Navlink from "./navs/Navlink"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Customers from "./pages/Customers"
import Products from "./pages/Products"
import Analytics from "./pages/Analytics"

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navlink />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
      { path: "/customers", element: <Customers /> },
      { path: "/products", element: <Products /> },
      { path: "/analytics", element: <Analytics /> },
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App