import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HeaderImage from '.././HeaderImage';

interface Props {
  handleCreateClick: () => void;
  createScore: () => void;
}

const CreateUserSpecificServices: React.FC<Props> = ({
  handleCreateClick,
  createScore
}) => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <h2>Create Services</h2>
      createScore
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={createScore}>CreateScore</IonButton>
        <IonButton expand="block" onClick={handleCreateClick}>CreateServices</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateUserSpecificServices;