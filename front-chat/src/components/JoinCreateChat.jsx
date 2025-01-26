import chatIcon from "../assets/chat.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { createRoom as createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {

    const [detail, setDetail] = useState({
        roomId:'',
        userName:'',
    })


    const {roomId, userName,connected, setRoomId, setCurrentUser,setConnected}= useChatContext()
    const navigate= useNavigate();


    function handleFormInputChange(event){
        setDetail({
            ...detail,
            [event.target.name]:event.target.value,
        });

    }

    function validateForm(){
        if(detail.roomId=="" || detail.userName==""){
            toast.error("Invalid Input !!")
            return false;
        }
        return true;
    }

    async function joinChat(){
        if(validateForm()){
            //Join Room
            
            try {
                const room = await joinChatApi(detail.roomId);
                toast.success("Joined Room !!!")
                setCurrentUser(detail.userName);
                setRoomId(detail.roomId);
                setConnected(true);

                navigate('/chat')
                
            } catch (error) {
                if(error.status=400){
                    toast.error(error.response.data)
                }
                else{
                    toast.error("Error in joining the room")
                }
                console.log(error)
            }
        }

    }

    async function createRoom(){

        if(validateForm()){
            // Create Room to Join
            console.log(detail)
            // call api to create room on backend
            try {
                const response= await createRoomApi(detail.roomId)
                console.log(response)
                toast.success("Room Created Successfully");
                // Join the Room
                setCurrentUser(detail.userName)
                setRoomId(detail.roomId)
                setConnected(true)

                // forward to chat page
                navigate("/chat")


            } catch (error) {
                if(error.status==400){
                    toast.error("Room already Exists !!")
                }else{
                    toast("Error in creating room")
                }
                
            }
        }
        

    }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-12 dark:border-gray-700 border w-full flex  flex-col max-w-md gap-5 rounded dark:bg-gray-950 shadow">
        <div>
            <img src={chatIcon} className="w-20 mx-auto"/>
        </div>
        <h1 className="text-2xl font-semibold text-center"> Join room/ Create Room</h1>

        {/* name div*/}
        <div className="">
            <label htmlFor="name" className="block font-medium mb-2"> Your name</label>
            <input  onChange={handleFormInputChange}
                    value={detail.userName}
                    type="text" 
                    id="name" 
                    name="userName"
                    placeholder="Enter the Name"
                    className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            

        </div>

        {/* Room id  div*/}
        <div className="">
            <label htmlFor="name" className="block font-medium mb-2">Room ID / New Room ID</label>
            <input  onChange={handleFormInputChange}
                    value={detail.roomId}
                    name="roomId"
                    placeholder="Enter RoomID"
                    type="text" 
                    id="name" 
                    className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        

        </div>

        {/* Button */}

        <div className="flex justify-center gap-5 mt-4">
            <button  onClick={joinChat} className="px-3 py-2 dark:bg-blue-400 hover:dark:bg-blue-700 rounded-lg">
                Join Room
            </button>

            <button onClick={createRoom} className="px-3 py-2 dark:bg-orange-400 hover:dark:bg-orange-700 rounded-lg">
                Create Room
            </button>
        </div>
        

      </div>

    </div>
  )
}

export default JoinCreateChat
