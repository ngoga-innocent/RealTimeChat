import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ChatSideBar from "./Components/ChatSideBar";
import ChatScreen from "./Components/Chatscreen";
import Cookies from 'universal-cookie';
import {db} from './firebase-config'
function App() {
  const cookies = new Cookies();
  const [name, setName] = useState('');
  const [name1, setName1] = useState('');
  const [isLogged, setIsLogged] = useState(true);
  const[ispressed,setPressed]=useState(false)
  useEffect(() => {
    const logged = cookies.get('token');
    if(logged == null){
      setIsLogged(false);
      // console.log(logged)
    }
    else{
      setIsLogged(true);
      // console.log(logged)
    }
  }, []);

  const getMessage = (name,pressed) => {
    setName(name);
    setPressed(pressed)
  };

  const getName = (name1, logged) => {
    setName1(name1);
    setIsLogged(logged);
    // console.log(name1)
  };

  return (
    <Router>
      <div className="flex-1">
        <Routes>
          <Route path="/register" element={<Register />} />
          {/* Redirect to login if not logged in */}
          {/* {!isLogged ? (
            <Route path="*" element={<Navigate to="/login" />} />
          ) : (
            <Route path="/" element={<ChatContainer name={name} name1={name1} getMessage={getMessage} />} />
          )} */}
          <Route path="/login" element={<Login getName={getName} />} />
          <Route path="/" element={isLogged? <ChatContainer name={name} name1={name1} ispressed={ispressed} getMessage={getMessage} /> :<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Create a separate component for the chat container
const ChatContainer = ({ name, name1, getMessage,ispressed }) => (
  <div className="flex space-x-5">
    <ChatSideBar onPress={getMessage} user={name1} />
  {ispressed && <ChatScreen name={name} />}
  </div>
);

export default App;
