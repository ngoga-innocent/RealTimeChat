
import React from "react";

const Login =()=>{
    return(
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-b from-teal-300 to-teal-950">
           
           <div className=" h-1/2 w-1/3 flex flex-col  bg-slate-500 shadow-lg shadow-white items-center justify-center rounded-lg">
           <h1 className="text-white font-bold text-3xl">Login</h1>
           <form className="p-5 flex flex-col space-y-8 w-full">
            <input type="text" placeholder="username or Email" className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3 text-white font-semibold"  />
            {/* <input type="email" placeholder="email" className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold" /> */}
            <input type="password" placeholder="password" className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold" />
            <button className=" rounded-md bg-white py-3 font-bold">Login</button>
           </form>
           <span>
            <a href="/">Register here</a>
           </span>
           </div>
        </div>
    )
}
export default Login