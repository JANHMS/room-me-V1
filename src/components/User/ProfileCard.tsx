import { IonAlert, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSlide, IonSlides, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { add, chatbox } from "ionicons/icons";
import React from "react";
import { formatDate } from "../../date";

interface Props {
  user?: any;
  questions?: {
    id: string;
    text: string;
  }[];
}

const UserProfileCard:React.FC<Props> = ({
  user,
  questions,
}) => {
// creating an array to map over
return(
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/my/dashboard"/>
        </IonButtons>
        <IonTitle>{user.fullName}</IonTitle>
      </IonToolbar>
    </IonHeader>
    
    <IonContent>
      <IonCard style={{top: "-10px"}}>
        <img src={user.image} />
       <IonCardHeader>
         Profile of {user.fullName}
       </IonCardHeader>
         <IonCardContent>
           { character.map(answer => (
             <IonItem key={answer.id} style={{height: "50px"}}>
               <div style={{fontSize: "14px", color: "darkblue" }}>{answer.text}</div>
             <IonLabel>answer</IonLabel>
            </IonItem>
            ))
          }
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  )
}

export default UserProfileCard;