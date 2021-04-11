import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton, IonText, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import React, { useState } from "react";
import ToggleBar from "../../components/ToggleBar";
import HeaderImage from '../../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';
import { Link } from 'react-router-dom';


interface Props {
  logout: any;
  loadingLogout: boolean;
  entries: any;
  formatDate: any;
  user: any;
  users: any[];
  character: any;
}
const UserListComponent: React.FC<Props> = ({
  logout,
  loadingLogout,
  entries,
  formatDate,
  user,
  users,
  character
}) => {
  
return (
  <IonPage>
    <HeaderImage />
    <IonContent className="icon-padding">
      <IonLoading message="Logging out..." duration={0} isOpen={loadingLogout}/>
      <IonList>
          <IonCard>
            <img src={user.image}/>
            <IonCardHeader>
              <IonItem  routerLink={`/my/users/${user.id}`}>
                Profile of {user.fullName}
              </IonItem>
            </IonCardHeader>
              <IonCardContent>
                { character.map((answer, index) => (
                  <div key={index}>
                    <IonItem key={index} style={{height: "50px"}} no-lines>
                    <IonText style={{fontSize: "10px", color: "darkblue" }}>{answer.question}</IonText>
                  </IonItem>
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

export default UserListComponent;