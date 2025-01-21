import chatIcon from "../assets/chat.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { createRoom } from "../services/RoomService";

const JoinCreateChat = () => {

    const [detail, setDetail] = useState({
        roomId:'',
        userName:'',
    })

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

    function joinChat(){

        if(validateForm()){
            //Join Room
        }

    }

    async function createRoom(){

        if(validateForm()){
            // Create Room to Join
            console.log(detail)
            // call api to create room on backend
            try {
                const response=createRoom(detail.roomId)
                console.log(response)
                toast.success("Room Created Successfully");
            } catch (error) {
                console.log(error)
                console.log("Error in creatin room")
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
            <input  onClick={handleFormInputChange}
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
