import React from "react";
import ChatView from "./ChatView";

interface Message {
  id: string
}

interface Props {
  messages: any;
  sendMessage: (e: any) => Promise<void>;
  setFormValue: any;
  formValue: string;
  dummy: any;
  auth: any;
}

const ChatRoomView: React.FC<Props> = ({
  messages,
  dummy,
  sendMessage,
  setFormValue,
  formValue,
  auth
}) => {

  return (
    <ChatView   
      messages={messages}
      dummy={dummy}
      sendMessage={sendMessage}
      setFormValue={setFormValue}
      formValue={formValue}
      auth={auth}
    />
  )
}

export default ChatRoomView;
