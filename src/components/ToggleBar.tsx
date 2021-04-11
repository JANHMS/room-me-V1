import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { chatbubbles, home, search,person,  personOutline, peopleCircleOutline, telescopeOutline, personAddOutline} from "ionicons/icons";
import React from "react";

const ToggleCar: React.FC = () => {
  //if needed we could add a hard refresh here, but thats not recommended
  const handleClick = () => {
    window.location.reload();
  }
  return(
    
    <IonTabBar slot="bottom">
      
      <IonTabButton tab="tab1" href="/my/offers/received">
        <IonIcon icon={personAddOutline} />
        <IonLabel>Requests</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tab2" href="/my/messages/received" >
        <IonIcon icon={peopleCircleOutline}/>
        <IonLabel>U-chat</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/my/collaborations/me">
        <IonIcon icon={home} />
        <IonLabel>house chat</IonLabel>
      </IonTabButton>

      
      <IonTabButton tab="tab4" href="/my/offers/sent">
        <IonIcon icon={telescopeOutline} />
        <IonLabel>Sent</IonLabel>
      </IonTabButton>
      
      <IonTabButton tab="tab5" href="/my/dashboard">
        <IonIcon icon={search} />
        <IonLabel>House</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tab6" href="/my/users">
        <IonIcon icon={personOutline} />
        <IonLabel>User</IonLabel>
      </IonTabButton>
      

    </IonTabBar>
  )
}

export default ToggleCar;
