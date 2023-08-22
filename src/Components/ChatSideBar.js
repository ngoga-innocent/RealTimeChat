import React,{useEffect, useState} from "react";
// import Avatar from "react-avatar";
import Support from "../Assets/Support.jpeg";
import Userpic from '../Assets/userpic.avif'
// import { chatList } from "../dumyhelp";
import 'firebase/database'
//  import {db } from "../firebase-config"
// import { onValue,ref,set } from "firebase/database";
// import firebase from 'firebase/app'
import Cookie from 'universal-cookie'
import { getDatabase,onValue,ref } from "firebase/database";
const ChatSideBar = (props) => {
    const [chats,setData]=useState([])
    const user=props.user
    const cookies=new Cookie()
    useEffect(() => {
      const dbRef = getDatabase();
      const chatRef = ref(dbRef, 'chats');
      
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
    
        if (data) {
          const updatedChatList = Object.keys(data)
          // const newChat=Object.keys(data).map(key=>({
          //   id:key,
          //   ...data[key]
          // }))
          //  console.log(updatedChatList)
          setData(updatedChatList)
        }
        else{
          return <div>
            <h1>No support for now</h1>
          </div>
        }
      });
    }, []);
    
    
    const onPress=(name)=>{
        
        const username=name
        props.onPress(username)
        // const messages=chatList.filter(message=>{
        //     message.index=index
        // })

    }
    const Logout =()=>{
      cookies.remove('token')
      window.location.reload()
    }
  return (
    <div className="flex flex-col h-screen w-1/3 bg-teal-950 shadow-inner shadow-white rounded-r-2xl p-5">
      <div className="flex justify-between items-center pb-11">
        <h1 className="font-bold text-white text-xl">KAZ NI KAZ </h1>
        <div className="flex items-center justify-center">
          <img alt="support" src={Support} className=" rounded-full w-9 h-9 overflow-hidden p-1" />
          <h1 className="text-white font-bold px-2">{user}</h1>
          <button className="font-bold bg-white p-1 rounded" onClick={Logout}>Logout</button>
        </div>
      </div>
      <div>
        {chats.map((item, index) => {
          return (
            <button key={index} className="flex m-2 rounded-md  px-2 bg-black py-2 text-left" onClick={()=>onPress(item)}>
              <img alt="user" src={Userpic} className="w-1/6 h-1/6 rounded-full mr-4" />
              <div>
              <h2 className="font-semibold text-xl text-white">{item}</h2>
              <span className="text-white text-xs">{item.msg}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ChatSideBar;
