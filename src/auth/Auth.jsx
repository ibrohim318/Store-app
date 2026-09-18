import Signup from "./Signup"
import Login from "./Login"
import { useState } from "react"

function Auth() {
    const [mode, setMode] = useState("login")

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-[380px] bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex justify-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-medium">S</div>
                </div>
                <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                    <button onClick={() => setMode("login")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === "login" ? "bg-white text-slate-900 shadow-sm transition-all duration-400" : "text-slate-500 transition-all duration-400"}`}>Kirish</button>
                    <button onClick={() => setMode("signup")} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === "signup" ? "bg-white text-slate-900 shadow-sm transition-all duration-400" : "text-slate-500 transition-all duration-400"}`}>Ro'yxatdan o'tish</button>
                </div>

                <div key={mode} className="animate-fadeIn">
                    {mode === "signup" && <Signup />}
                    {mode === "login" && <Login />}
                </div>
            </div>
        </div>
    )
}

export default Auth