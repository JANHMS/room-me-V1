import React from 'react'
import moment from 'moment'
import { IonSkeletonText, IonText, IonThumbnail, IonImg, IonItem } from "@ionic/react";

const ChatMessages = ({messages, authUser}) => {

  const renderMessages = (messages, authUser) => {
    if (messages.length > 0) {
      return messages.map(message => {
        // Message is from currently logged in USER
        if (message.user.uid === authUser.uid) {
          return (
              <IonItem key={message.id}>
                  <IonThumbnail slot="start">
                    <IonImg
                      src={message.user.avatar}
                      alt="avatar"
                      style={{width: "50px", }}/>
                  </IonThumbnail>
                    <IonText>{message.content}</IonText>
                  <br />
                <IonText slot="end">{moment(message.timestamp).fromNow()}</IonText>
              </IonItem>
          )
        }

        return (
          <IonItem key={message.id} >
              <IonThumbnail slot="end">
                <IonImg
                  src={message.user.avatar}
                  style={{width: "50px"}}/>
                </IonThumbnail>
              <div>
                <IonText >{message.content}</IonText>
              </div>
            <IonText slot="start">{moment(message.timestamp).fromNow()}</IonText>
        </IonItem>
        )
      })
    }

    return null
  }

  return renderMessages(messages, authUser)
}

export default ChatMessages