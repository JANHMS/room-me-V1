import { IonAlert, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonPage, IonSlide, IonSlides, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { add, chatbox } from "ionicons/icons";
import React from "react";
import { formatDate } from "../../date";

//character is a complex array with objects and the answered questiondata
interface Props {
  user?: any;
  questions?: {
    id: string;
    text: string;
  }[];
  character: any;
}

const UserProfileCard:React.FC<Props> = ({
  user,
  questions,
  character
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
    </IonContent>
  </IonPage>
  )
}

export default UserProfileCard;