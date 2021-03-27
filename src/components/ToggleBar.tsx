import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { chatbubbles, home, person } from "ionicons/icons";
import React from "react";

const ToggleCar: React.FC = () => {
  return(
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/my/messages/received">
        <IonIcon icon={chatbubbles} />
        <IonLabel>Chat</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/my">
        <IonIcon icon={home} />
        <IonLabel>Find</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/my/profile">
        <IonIcon icon={person} />
        <IonLabel>Me</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default ToggleCar;
