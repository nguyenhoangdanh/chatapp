import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({messageStatus}) {
  return (
    <div>
      {messageStatus === "sent" && <BsCheck className="text-lg"></BsCheck>}
      {messageStatus === "delivered" && <BsCheckAll className="text-lg"></BsCheckAll>}
      {messageStatus === "read" && (
        <BsCheckAll className="text-lg text-icon-ack"></BsCheckAll>
      )}
    </div>
  );
}

export default MessageStatus;
