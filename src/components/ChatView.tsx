import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter } from '@ionic/react';
import React from "react";
import HeaderImage from './HeaderImage';
import ToggleBar from './ToggleBar';

interface Props {
  messages: any;
  formValue: any;
  dummy: any;
  sendMessage: any;
  setFormValue: any;
  auth: any;
}

const ChatView: React.FC<Props> = ({
  messages,
  dummy,
  formValue,
  sendMessage,
  setFormValue,
  auth,
}) => {
  
  function ChatMessage(props: any) {
  const { text, uid, photoURL } = props.message;
  if (auth.currentUser) {
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <div className={`message ${messageClass}`} style={{display:"flex", marginLeft:"10px",  flexDirection: "row", flexWrap: "wrap"}}>
        <img src={photoURL} style={{ borderRadius: "50%", height:"35px"}} />
        <p>{text}</p>
      </div>
    )
  } else {
    return null
  }
}

return (
  <div>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <HeaderImage/>
        </IonToolbar>
      </IonHeader>
        <h2>Chat</h2>
        <IonContent className="icon-padding">
          <main>
            {messages && messages.map((msg: any) => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
            
            <button type="submit" disabled={!formValue}>🕊️</button>
          </form>
        <IonFooter><p><ToggleBar/></p></IonFooter>
      </IonContent>
    </IonPage>
  </div>
  )
}

export default ChatView;