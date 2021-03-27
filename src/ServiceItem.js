/* eslint jsx-a11y/anchor-is-valid: 0 */
import { IonCardSubtitle, IonCard, IonCardHeader, IonPage, IonCardContent } from "@ionic/react";
import React from 'react'
import { Link } from 'react-router-dom'

const ServiceItem = ({service, children, className, noButton}) => {

  const shortText = (text, maxLength = 50) => {

    if (!text) { return ' '}
    if (text.length <= maxLength ) { return text }

    return text.substr(0, maxLength) + '...'
  }

  return (
    <IonPage>
      <IonCard>
        <img src={service.image} alt=""/>
        <IonCardHeader>
          <IonCardSubtitle>
            {service.title}
            
          </IonCardSubtitle>
        </IonCardHeader>  
        <IonCardContent>
        {shortText(service.description)}

      {shortText(service.description)}
      
        { children &&
          <div className="card-text">
            { children }
          </div>
        }
        { !noButton &&
          <div className="card-action">
             <Link 
                to={`/services/${service.id}`}
                className="button btn-align-md accent-btn raised">Learn More</Link>
          </div>
        }
      </IonCardContent>

      </IonCard>
    </IonPage>
  )
}



export default ServiceItem