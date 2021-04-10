import { IonAlert, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSlide, IonSlides, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { add, chatbox } from "ionicons/icons";
import React from "react";
import { formatDate } from "../../date";
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
// creating an array to map over
const serviceImages = [service.image, service.image1, service.image2, service.image3, service.image4]
return(
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{service.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>

      <IonCard style={{top: "-10px"}}>
        <IonText style={{marginLeft: "30px"}}>Swipe for more pictures - Scroll for details</IonText>
        <IonSlides>
          {serviceImages.map((image, idx) => (
            <IonSlide key={idx} className="img-container">
              <img
                style={{width:"25em", height:"15em"}}
                src={image}
              />
            </IonSlide>
          ))}
        </IonSlides>
       <IonCardHeader>
         Published by {user.fullName}
       </IonCardHeader>

     <IonCardContent>
      <IonItem>
       <div style={{fontSize: "14px", color: "darkblue" }}>Type of housing</div>
         <IonLabel style={{position: "absolute", right:"20px" }}>{service.category}</IonLabel>
     </IonItem>
     <br/>
     <IonItem>
      <div style={{fontSize: "14px", color: "darkblue" }}>Movin Date </div>
         <IonLabel style={{position: "absolute", right:"20px" }}>{formatDate(service.date)}</IonLabel>
    </IonItem>
      <br/>
      <IonItem>
       <div style={{fontSize: "14px", color: "darkblue" }}>Rent per Month in EUR: </div>
          <IonLabel style={{position: "absolute", right:"20px" }}>{service.price}</IonLabel>
     </IonItem>
     
     <br/>
     <IonItem>
      <div style={{fontSize: "14px", color: "darkblue" }}>City </div>
         <IonLabel style={{position: "absolute", right:"20px" }}>{service.citylocation}</IonLabel>
    </IonItem>
      <br/>
      <h2>Shoot a chat request to {user.fullName}</h2>
      <br/>
      <img style={{width:"8em", height:"6em", borderRadius: "50%"}} src={user.image}/>
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
    <IonCard>
      <IonCardHeader>
        <IonLabel>Further details </IonLabel>
      </IonCardHeader>
      <IonCardContent>
         <IonItem>
          <div style={{fontSize: "14px", color: "darkblue" }}>Type of housing</div>
            <IonLabel style={{position: "absolute", right:"20px" }}>{service.category}</IonLabel>
        </IonItem>
       <br/>
        <div style={{fontSize: "14px", color: "darkblue" }}>Description</div>
          <IonLabel style={{position: "absolute", right:"20px" }}>{service.category}</IonLabel>
          <IonText>{service.description}</IonText>

     <br/>
     </IonCardContent>
  </IonCard>

  </IonContent>

  </IonPage>
  )
}

export default ServiceDeatilComponent;