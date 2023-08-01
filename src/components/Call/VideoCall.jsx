import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useStateProvider } from "@/context/StateContext";
const Container = dynamic(() => import("./Container"), {
  ssr: false,
});
function VideoCall() {
  const [{ videoCall, socket, userInfo }] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out-going") {
      // console.log({ userInfo });
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profilePicture,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);
  return <Container data={videoCall} />;
}

export default VideoCall;
