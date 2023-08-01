import React, { useEffect, useRef, useState } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md"
import { IoVideocam } from "react-icons/io5"
import { BiSearchAlt2 } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import VoiceCall from "../Call/VoiceCall";
import ContextMenu from "../common/ContextMenu";

function ChatHeader()  {
  const [{ currentChatUser, onlineUsers }, dispatch] = useStateProvider();

  const[contextMenuCordinates, setContextCordinates] = useState({
    x:0,
    y:0
  })

  const[isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) =>{
    e.preventDefault();
    setContextCordinates({ x: e.pageX - 50, y: e.pageY + 20 });
    setIsContextMenuVisible(true);
  }

  const contextMenuOptions = [
    {
      name: "Exit",
      callback: async() => {
        setIsContextMenuVisible(false);
        dispatch({type: reducerCases.SET_EXIT_CHAT})
      }
    }
  ]

  const handleMessageSearch = () =>{
    dispatch({type: reducerCases.SET_MESSAGE_SEARCH})
  }

  

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "video", 
        roomId: Date.now(),
      },
    });
  };

  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "voice", 
        roomId: Date.now(),
      },
    });
  };
  console.log({onlineUsers});

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
       <div className="flex items-center justify-center gap-6">
      <Avatar type="sm" image={currentChatUser?.profilePicture}></Avatar>
       <div className="flex flex-col">
        <span className="text-primary-strong">{currentChatUser?.name}</span>
        <span className="text-secondary text-sm">
        
          {
            onlineUsers.includes(currentChatUser.id)
            ? (
              <div className="justify-start items-center flex gap-x-1.5">
                <div className="text-green-500 rounded-full bg-green-500 w-[10px] h-[10px] overflow-hidden" />
                online 
              </div>
              
              
            ) : (
              <div className="justify-start items-center flex gap-x-1.5">
                <div className="text-red-500 rounded-full bg-red-500 w-[10px] h-[10px] overflow-hidden" />
                offline 
              </div>
            )
          }
        </span>
       </div>
      </div>
      <div className="flex gap-6">
       <MdCall 
       className="text-panel-header-icon cursor-pointer text-xl" 
       onClick={handleVoiceCall}
       />
       <IoVideocam 
       className="text-panel-header-icon cursor-pointer text-xl"
       onClick={handleVideoCall}
       />
      
       <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl"
         onClick={handleMessageSearch}
         />
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl"
        onClick={(e) => showContextMenu(e)}
        id="context-opener"/>
        {isContextMenuVisible && (
          <ContextMenu 
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          />
        )} 
      </div>
     </div>

  );
}

export default ChatHeader;
