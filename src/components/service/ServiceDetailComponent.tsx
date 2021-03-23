import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonImg, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import OfferModal from "./OfferModal";

interface Props {
  service: any;
  user: any;
  auth: any;
}
const ServiceDeatilComponent:React.FC<Props> = ({
  service,
  user,
  auth
}) => {
  
return(
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{service.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonCard>
        <img src={service.image} />
       <IonCardHeader>
         <IonLabel>Owner {user.fullName}</IonLabel>
       </IonCardHeader>

     <IonCardContent>
       <p>Categoryr</p>
        {service.category}
       <p>Per Hour</p>
       <IonLabel>{service.price}</IonLabel>
       <br />
       
      <IonLabel>{service.description}</IonLabel>

      <h1>{user.fullName}</h1>
      <p>{user.avatar }</p>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  )
}

export default ServiceDeatilComponent;