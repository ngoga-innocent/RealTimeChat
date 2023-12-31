import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const RegisterUser = (e) => {
    setIsLoading(true)
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("email", email);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://www.kaznikaz.com/api/chat/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if(result.user_info){
            window.location.replace("login");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
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
        <h1 className="text-white font-bold text-3xl">Register</h1>
        <form
          className="p-5 flex flex-col space-y-8 w-full"
          onSubmit={RegisterUser}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3 text-white font-semibold"
          />

          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="bg-transparent  w-full border-b-white border-2 py-2 rounded-md px-3  text-white font-semibold"
          />

          <button type="submit" className=" rounded-md bg-white py-3 font-bold">
            Register
          </button>
        </form>
        <span>
          <a href="/login">Login here</a>
        </span>
      </div>
    </div>
  );
};
export default Register;
