import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { chatbubbles, home, person, personAddOutline} from "ionicons/icons";
import React from "react";

const ToggleCar: React.FC = () => {
  //if needed we could add a hard refresh here, but thats not recommended
  const handleClick = () => {
    window.location.reload();
  }
  return(
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/my/messages/received" >
        <IonIcon icon={personAddOutline}/>
        <IonLabel>requests</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/my/collaborations/me">
        <IonIcon icon={chatbubbles} />
        <IonLabel>Chats</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/my">
        <IonIcon icon={home} />
        <IonLabel>Find</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab4" href="/my/profile">
        <IonIcon icon={person} />
        <IonLabel>Me</IonLabel>
      </IonTabButton>

    </IonTabBar>
  )
}

export default ToggleCar;
