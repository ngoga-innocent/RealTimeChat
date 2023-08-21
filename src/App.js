import React,{useState} from "react";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ChatSideBar from "./Components/ChatSideBar";
import ChatScreen from "./Components/Chatscreen";

function App() {
  // const [messages,setMessage]=useState([])
  const [name,setName]=useState('')
  
  const getMessage=(name)=>{
    // console.log(name)
    setName(name)
    // setMessage(message)
  }
  return (
   
    
    <div className="flex-1">
      {/* <Register />
      <Login /> */}
      <div className="flex space-x-5">
      <ChatSideBar onPress={getMessage} />
      <ChatScreen name={name}/>
      </div>
    </div>
   
  );
}

export default App;
