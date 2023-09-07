import React, { useState } from "react";
import Cookies from "universal-cookie";
import { ClipLoader } from "react-spinners";
const Login = (props) => {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [logged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Login = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (username !== "" && password !== "") {
      var formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      var requestOptions = {
        method: "POST",
        // headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://www.kaznikaz.com/api/chat/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.token.access, result.user_info);
          console.log(result);
          if (result.token) {
            //setName(result.user_info.username);
            setIsLogged(true);
            props.getName(result.user_info.username, true);
            cookies.set("token", result.token.access);
            window.location.replace("/");
            setIsLoading(false);
          } else {
            console.log("invalid credentials");
          }
        })
        .catch((error) => console.log("error", error));
 
    } else {
      console.log("no password or emaill");
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-b from-teal-300 to-teal-950">
      <ClipLoader
        loading={isLoading}
        color="red"
        size={150}
        arial-label="loading Spiner"
        data-testid="loader"
      />
      <div className=" h-1/2 w-1/3 flex flex-col  bg-slate-500 shadow-lg shadow-white items-center justify-center rounded-lg">
        <h1 className="text-white font-bold text-3xl">Login</h1>
        <form className="p-5 flex flex-col space-y-8 w-full" onSubmit={Login}>
          <input
            type="text"
            placeholder="username or Email"
            className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3 text-white font-semibold"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <input type="email" placeholder="email" className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold" /> */}
          <input
            type="password"
            placeholder="password"
            className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className=" rounded-md bg-white py-3 font-bold">
            Login
          </button>
        </form>
        <span>
          <a href="/register">Register here</a>
        </span>
      </div>
    </div>
  );
};
export default Login;
