import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton, IonText, IonCard, IonCardHeader, IonCardContent, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from "react";
import ToggleBar from "../../components/ToggleBar";
import HeaderImage from '../../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';
import { Link } from 'react-router-dom';

interface Props {
  user: any;
  character: any;
}
const UserDeatilComponent: React.FC<Props> = ({
  user,
  character
}) => {
  
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton/>
        </IonButtons>
        <IonTitle>Profile of {user.fullName}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="icon-padding">
      <IonList>
          <IonCard>
            <img src={user.image}/>
            <IonCardHeader>
                Profile of {user.fullName}
            </IonCardHeader>
              <IonCardContent>
                { character.map((answer, index) => (
                  <div key={index}>
                    <IonItem key={index} style={{height: "50px"}} no-lines>
                    <IonText style={{fontSize: "10px", color: "darkblue" }}>{answer.question}</IonText>
                  </IonItem>
                  {answer.answer && 
                    <IonItem no-lines>
                      <IonLabel style={{ fontSize: "10px" }}>{answer.answer}</IonLabel>
                    </IonItem>
                  }
                  <IonList lines = "none">
                  { answer.checkedList && answer.checkedList.map((a,index) => (
                    (
                      a.text === "" ? <div></div> :
                      <IonItem no-lines>
                        <IonLabel style={{ fontSize: "10px" }}>{a.text}</IonLabel>
                      </IonItem>

                   )
                 ))
                }
              </IonList>
              </div>
                 ))
               }
             </IonCardContent>
           </IonCard>
        </IonList>
    </IonContent>
    <ToggleBar />
  </IonPage>
  
  )
}

export default UserDeatilComponent;