//import React from 'react'
import { useState,useRef } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";







const ChatPage = () => {

    const [messages,setMessages] = useState([
        {
            content:"Hello World",
            sender:"sai kumar",
        },
        {
            content:"Hi Sai",
            sender:"world",
        },
        {
            content:"How are you?",
            sender:"sai kumar",
        },
    ]);
    const [input,setInput] = useState("");
    const inputRef=useRef(null)
    const chatBoxRef=useRef(null)
    const [stompClient, setStompClient] = useState(null)
    const [currentUser] = useState("sai kumar");




  return (
    <div className="">

        {/* This the header portion */}
        <header className="border flex justify-around py-3 dark:border-gray-500  fixed w-full dark:bg-gray-600 border shadow items-center h=18"> 
            {/* room name container  */}
            <div>
                <h1 className="text-xl font-semibold">
                    Room: <span> Family Room</span>
                </h1>
            </div>

            {/* Username Container */}
            <div>
                <h1 className="text-xl font-semibold">
                    User: <span> Sai Kumar</span>
                </h1>
            </div>

            {/* Button: leave room*/}
            <div>
                <button className="dark:bg-red-500 hover:dark:bg-red-800 px-3 py-2 rounded-full">
                    Leave Room
                </button>
            </div>
            
        </header>


        <main className=" pt-20 px-10 h-screen w-2/3 overflow-auto mx-auto dark:bg-slate-600">
            {
                messages.map((message,index)=>(
                    <div key={index} className={`flex ${message.sender==currentUser?'justify-end':'justify-start' }`}>
                        <div className={`my-2 ${message.sender==currentUser?'bg-green-800':'bg-gray-800'}  rounded p-2 max-w-xs`}>
                        <div className="flex flex-row gap-2">
                            <img className="h-10 w-10" src="https://avatar.iran.liara.run/public/38"/>
                            <div className=" flex flex-col gap-1">
                                <p className="text-sm font-bold">{message.sender}</p>
                                <p>{message.content}</p>
                            </div>


                        </div>

                    </div>
                    </div>
                    
                ))
            }
        </main>
      


        {/* Input Message Container  */}
        <div className=" fixed bottom-4 w-full h-12">
            <div className="w-1/2 h-full mx-auto dark:bg-gray-800 rounded-full flex items-center justify-between pr-4 gap-5 ">

                <input type="text" placeholder="Type your message"
                       className="dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-full w-full focus:outline-none"/>

                <div className="flex gap-1 "> 
                    <button className=" dark:bg-purple-600 px-3 py-2 rounded-full h-11 w-10 flex justify-center items-center"> 
                        <MdAttachFile size={20} />
                    </button>

                    <button className=" dark:bg-green-600 px-3 py-2 rounded-full h-11 w-10 flex justify-center items-center"> 
                        <MdSend size={20} />
                    </button>
                </div>
                
            </div>
        </div>


    </div>
  )
};

export default ChatPage
