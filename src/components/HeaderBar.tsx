import { IonButton, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonToolbar } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import HeaderImage from "./HeaderImage"
import { useHistory } from "react-router-dom";

interface Props {
  logout?: any
}

const HeaderBar: React.FC<Props> = ({
  logout
}) => {
  const history = useHistory()
  const [url, setUrl] = useState()

  useEffect(() => {
    history.push(url)
  },[url])

  return (
      <IonHeader>
        <IonToolbar>
          <HeaderImage />
          <IonButton onClick={logout} style={{
            position: "absolute",
            width: "100px", 
            fontSize:"10px", 
            height:"5vw",
            top: "2.5px",
            right: "20px"
          }}>Logout</IonButton>
          <div className="dropdown">
            <IonItem>
              <IonLabel>RoomMe Actions</IonLabel>
              <IonSelect okText="Okay" cancelText="Dismiss" onIonChange={e => setUrl(e.detail.value)}>
                <IonSelectOption value="/my/entries/add">            
                  Create Service
                </IonSelectOption>
                
                <IonSelectOption value="/my/messages/received">            
                  Messages received
                </IonSelectOption>
                
                <IonSelectOption value="/my/services/me">            
                  My Services
                </IonSelectOption>


                <IonSelectOption value="/my/offers/sent">            
                  Offers Sent
                </IonSelectOption>
                
                <IonSelectOption value="/my/offers/received">            
                  Received Offers
                </IonSelectOption>
                
                <IonSelectOption value="/my/collaborations/me">            
                  Received Collaborations
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            </div>

              </IonToolbar>

                {/* 
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                  Messages
              </a>
              <div className="navbar-dropdown navbar-dropdown-messages">
                {/* { messages && <ReceivedMessages /> } */}

      </IonHeader>
  )
}

export default HeaderBar;
