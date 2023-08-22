import React, { useState, useEffect } from "react";
// import { db } from "../firebase-config";
import 'firebase/database'
import { getDatabase,onValue,ref,set,update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
const ChatScreen = (props) => {
  //  const message=props
  //  console.log(message.messages)
   const {name}=props
  const [messages, setMessages] = useState([]);
  const [msg,setMsg]=useState('')
  
 useEffect(()=>{
  if(name){
    const dbRef=getDatabase()
    const chatRef=ref(dbRef,'chats/' + name);
    onValue(chatRef,(snapshot)=>{
      const data=snapshot.val()
      const Chats=Object.values(data)
      if(Chats){
        const messageList=Object.entries(data).map(([key,value])=>({
          key,
          ...value
        }));
         console.log(messageList[0].newMessage.createdAt)
        
        const sortedMessages = messageList.sort((a, b) => {
          const dateA = new Date(a.newMessage.createdAt);
          const dateB = new Date(b.newMessage.createdAt);
          return dateA - dateB;
        });
        
        setMessages(sortedMessages);
      
      }else{
        setMessages([])
      }
    })
  }
  else{
    return 
  }
    
    
    
 },[name])
  const sendMsg = () => {
    const id=uuidv4()
    if (msg.trim() !== "") {
      const dbRef = getDatabase();
      const chatRef = ref(dbRef, 'chats/' + name + '/'+ id + '/newMessage' );
      const newMessage = {
        _id: Math.random().toString(),
        text: msg,
        lastmsg: msg,
        createdAt: new Date().toISOString(),
        user: {
          _id:  2 // Your user ID
        },
      };
    set(chatRef, newMessage);
    setMsg('')
  }
  }
  // const sortedMessages = [...messages].sort(
  //   (a, b) => new Date(a.newMessage.createdAt) - new Date(b.newMessage.createdAt)
  // );
  return (
    <div className="w-full items-center justify-center ">
    <h1 className="text-white font-bold text-3xl items-center justify-center self-center">{name}</h1>
    <div className="py-4 flex h-screen pb-24 flex-col-reverse w-full">
    
      <div>
        {messages.map((item,index) => {
          {/* console.log(item) */}
          const userId=item.newMessage?.user?._id
          return (
            <div className="w-1/2" key={index}>
            
              {
                userId ===2 ? (
                  <div className="py-2 bg-transparent border-2 px-7 rounded-lg mb-2  ml-64 justify-center">
                    <p className='self-end'>{item.newMessage.text}</p>
                  </div>
                ) : (
                  <div className="py-2  border-2 px-7 rounded-lg mb-2 bg-teal-950 items-center justify-center">
                    <p className="text-white ">{item.newMessage.text}</p>
                  </div>
                )
              }
            </div>
          );
        })}
      </div>
      <div className="flex w-3/4 fixed bottom-2 space-x-3 ">
        <input
        value={msg}
        onChange={e=>setMsg(e.target.value)}
          type="text"
          placeholder="your message"
          className=" bg-transparent border-2 py-3 rounded-lg px-1 w-3/4 text-white"
        />
        <button className="px-4 border-white border-2 rounded-lg font-bold text-white" onClick={()=>sendMsg()}>
          Send
        </button>
      </div>
    </div>
    </div>
  );
};
export default ChatScreen;
