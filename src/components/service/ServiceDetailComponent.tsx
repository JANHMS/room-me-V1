import { IonContent, IonPage } from "@ionic/react";
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
    <IonContent>
    <figure className="image is-4by3">
       <img src={service.image} alt="Description" />
    </figure>
    

      <p className="title is-4">{user.fullName}</p>
      <p className="subtitle is-6">Owner</p>

      
      <p className="title is-4">${service.price}</p>
      <p className="subtitle is-6">Per Hour</p>

      <h1 className="title service-title is-2">
          {service.title}
      </h1>
      
      <div className="tag is-large service-category">
        {service.category}
      </div>
      <h2 className="subtitle is-4">
          {service.description}
      </h2>
      <br />
      
            <h1>{user.fullName}</h1>
            <p>{user.avatar }</p>
      <div className="has-text-centered">
      </div>
          
    </IonContent>
  </IonPage>
  )
}

export default ServiceDeatilComponent;