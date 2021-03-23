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
       <p>Type of housing</p>
        {service.category}
       <p>Rent per Month in EUR</p>
       <IonLabel>{service.price}</IonLabel>
       <br/>
       
      <IonLabel>{service.description}</IonLabel>
      
      <h4>Published by user</h4>
      <h2>{user.fullName}</h2>
      <img style={{width:"6em", height:"6em"}} src={user.avatar }/>
    
      

        </IonCardContent>

      </IonCard>
    </IonContent>
  </IonPage>
  )
}

export default ServiceDeatilComponent;