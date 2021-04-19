import { IonContent, IonPage, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonText, IonButton } from '@ionic/react';
import React, { useState } from "react";
import HeaderImage from '../../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import ToggleBar from '../ToggleBar';


interface Props {
  users: any;
  user: any;
  handleMyUserProfileClick: () => void;
}
const UserListComponent: React.FC<Props> = ({
  users,
  user,
  handleMyUserProfileClick
}) => {
  
return (
  <IonPage>
    <HeaderImage 
    />
    <IonContent className="icon-padding">
      <IonItem>

      <IonText 
        style={{fontSize: "10px", color: "darkblue", postion: "absolue", marginLeft: "2%" }}
        > Hi {user.fullName} here are users in {user.citylocation}. 
      </IonText>
      <IonText 
        style={{fontSize: "10px", color: "darkblue", postion: "absolue", marginLeft: "2%" }}
        >Click Button to see your profile. 
      </IonText>
          <IonButton onClick={handleMyUserProfileClick}>Your Profile</IonButton>
    </IonItem>

      <IonList>
          {users.map((user) =>
            <IonItem button key={user.id}
              routerLink={`/my/users/${user.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={user.image} />
              </IonThumbnail>
              <IonLabel>
                <h2>MATCH</h2>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
    </IonContent>
    <ToggleBar />
  </IonPage>
  
  )
}

export default UserListComponent;