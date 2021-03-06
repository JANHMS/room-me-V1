import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'
import HeaderImage from '../HeaderImage'

interface Props {
  service: any;
  children?: any;
}

const ServiceItem: React.FC<Props> = ({
  service,
  children
}) => {

  const shortText = (text, maxLength = 50) => {

    if (!text) { return ' '}
    if (text.length <= maxLength ) { return text }

    return text.substr(0, maxLength) + '...'
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/dashboard"/>
          </IonButtons>
          <IonTitle>Service</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="card-icon">
           <p> {service.title} </p>
        </div>
        
        <div className="card-icon">
           <img src={service.image} alt=""/>
        </div>

        <div className="card-text">
           <p>{shortText(service.description)}</p>
        </div>
        
        { children &&
          <div className="card-text">
            { children }
          </div>
        }

        <div className="card-action">
           <Link 
              to={`/services/${service.id}`}
              className="button btn-align-md accent-btn raised">
              Learn More
            </Link>
        </div>
      
    </IonContent>
  </IonPage>
  )
}

export default ServiceItem