import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonImg, IonItem, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { useAuth } from "../../auth";
import HeaderBar from "../../components/HeaderBar";
import ToggleBar from "../../components/ToggleBar";
import { firestore } from "../../firebase";
import { getMessages } from "../../reducers";
import { markMessageAsRead } from '../../actions'

const RecievedMessagesPage = (props) => {
  
  const { userId } = useAuth();
  const [messages, setMessages] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  const history = useHistory()

  const handleMessageAsRead = message => {
    markMessageAsRead(message)
  }

  const goToCollaboration = message => {
    // markMessageAsRead(message)
    history.push('/my/collaborations/individual/'+ (message.cta.split('/')[2]))
  }

  const getMessages =  (userId) => firestore.collection('profiles')
    .doc(userId)
    .collection('messages')
    .get()
    .then(snapshot => {
      const messageData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setMessages(messageData)
    })
    
  useEffect(() => {
    getMessages(userId)
    console.log(messages)
  },[])
  
  const { loadFresh } = props
  useEffect(() => {
    if (!loadFresh) { return }
    const script = document.createElement('script')
    script.src = `${process.env.PUBLIC_URL}/js/fresh.js`
    script.async = true
    document.body.appendChild(script)
  }, [loadFresh])
  
  
  return(
    messages ?
      <div>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/my/dashboard" />
              </IonButtons>
              <IonTitle>Users Chat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {messages.filter(m => !m.isRead).map(message => 
              <IonItem key={message.id}
                style={{height: "800px"}}>
                <IonCard>
                  <IonImg src={message.fromUser.avatar} />
                    <IonCardHeader>
                      <IonCardSubtitle>{message.fromUser.name}</IonCardSubtitle>
                    </IonCardHeader>
                      <IonCardContent>

                      <div className="from-user">
                        <span>From: </span>{message.fromUser.name}
                      </div>
                      <hr />
                        <div>
                          { message.text }
                        </div>
                        <IonButton onClick={() => goToCollaboration(message)} color="success">
                          Chat
                        </IonButton>
                      </IonCardContent>
                    </IonCard>

                  </IonItem>
                )}
              </IonList>
            </IonContent>
          <ToggleBar/>
        </IonPage>
            </div> : <IonLoading isOpen={loading}/>
    )
}



const mapStateToProps = (state) => ({messages: getMessages(state)})

export default connect(mapStateToProps)(RecievedMessagesPage)

function handleMessageAsRead(message: any): void {
  throw new Error("Function not implemented.");
}
function goToCollaboration(message: any): void {
  throw new Error("Function not implemented.");
}

