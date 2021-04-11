import { IonContent, IonPage, IonList, IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/react';
import React, { useState } from "react";
import HeaderImage from '../../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import ToggleBar from '../ToggleBar';


interface Props {
  users: any;
}
const UserListComponent: React.FC<Props> = ({
  users,
}) => {
  
return (
  <IonPage>
    <HeaderImage 
    />
    <IonContent className="icon-padding">
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