import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { chatbubbles, home, person } from "ionicons/icons";
import React from "react";

const ToggleCar: React.FC = () => {
  return(
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/chat">
        <IonIcon icon={chatbubbles} />
        <IonLabel>Chat</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/my/entries">
        <IonIcon icon={home} />
        <IonLabel>Find</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/addentry">
        <IonIcon icon={person} />
        <IonLabel>Me</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}

export default ToggleCar;
