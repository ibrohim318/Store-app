import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./auth/AuthContext"
import { ThemeProvider } from "./theme/ThemeContext"
import ProtectedRoute from "./auth/ProtectedRoute"
import Auth from "./auth/Auth"
import Navlink from "./navs/Navlink"
import Dashboard from "./pages/Dashboard"
import Orders from "./pages/Orders"
import Sales from "./pages/Sales"
import Warehouse from "./pages/Warehouse"
import Products from "./pages/Products"

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
      { path: "/sales", element: <Sales /> },
      { path: "/warehouse", element: <Warehouse /> },
      { path: "/products", element: <Products /> },
    ]
  }
])

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App