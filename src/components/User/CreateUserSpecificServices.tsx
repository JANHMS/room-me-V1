import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HeaderImage from '.././HeaderImage';

interface Props {
  createScore: () => void;
}

const CreateUserSpecificServices: React.FC<Props> = ({
  createScore
}) => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <HeaderImage />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonTitle 
          style={{       
          position: "fixed", 
          top: "-10%"
        }}>Find your Room-Me's</IonTitle>
        <IonButton      
         style={{  
           position: "fixed", 
           top: "50%",
           left: "35%",
        }}
        expand="block" onClick={createScore}>Room-Me</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default CreateUserSpecificServices;