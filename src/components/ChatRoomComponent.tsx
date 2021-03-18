import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import firebase from "firebase/app";
import React, { useRef, useState } from "react";
import ChatRoomView from "./ChatRoomView";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

interface ChatProps {
  auth: any
}

export const ChatRoom: React.FC<ChatProps> = ({auth}: any)  => {

  const dummy = useRef<any>();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: any) => {
    e.preventDefault();

    const { uid, photoURL }: any = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    if (dummy) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    else return;
  }
  return (
    <ChatRoomView   
      messages={messages}
      dummy={dummy}
      sendMessage={sendMessage}
      setFormValue={setFormValue}
      formValue={formValue}
      auth={auth}
    />
  )
}

export default ChatRoom;