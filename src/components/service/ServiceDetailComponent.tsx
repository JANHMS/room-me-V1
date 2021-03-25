import { IonAlert, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { add, chatbox } from "ionicons/icons";
import React from "react";
import OfferModal from "./OfferModal";

interface Props {
  service: any;
  user: any;
  auth: any;
  offer: boolean;
  handleOfferClick: any;
}

const ServiceDeatilComponent:React.FC<Props> = ({
  service,
  user,
  auth,
  offer,
  handleOfferClick
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
        <img 
          style={{
            width:"20em", height:"20em", 
            display: "block",
             marginLeft: "auto", 
             marginRight: "auto"
           }}
          src={service.image} />
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
      <img style={{width:"10em", height:"10em"}} src={user.avatar }/>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleOfferClick}>
            <IonIcon icon={chatbox} />
          </IonFabButton>
        </IonFab>
        
      {
        auth.user.uid === service.userId && 
        <IonAlert
          isOpen={offer}
          cssClass='my-custom-class'
          header={'Alert'}
          subHeader={'Subtitle'}
          message={'This your own post.'}
          buttons={['OK']}
        />
      }
      
      </IonCardContent>
      { auth.isAuth && auth.user.uid !== service.userId && offer &&
        <OfferModal 
          auth={auth}
          service={service}
          user={user}/>
      }
    </IonCard>
  </IonContent>

  </IonPage>
  )
}

export default ServiceDeatilComponent;