import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton, IonText } from '@ionic/react';
import React, { useState } from "react";
import ToggleBar from "../components/ToggleBar";
import HeaderImage from '../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import HeaderBar from "./HeaderBar";
import ServiceItem from './service/ServiceItem';


interface Props {
  logout: any;
  loadingLogout: boolean;
  entries: any;
  formatDate: any;
  user: any;
  services: any[];
}
const DashboardComponent: React.FC<Props> = ({
  logout,
  loadingLogout,
  entries,
  formatDate,
  user,
  services
}) => {
  
return (
  <IonPage>
    <HeaderBar 
      logout={logout}
    />
    <IonContent className="icon-padding">
      <IonLoading message="Logging out..." duration={0} isOpen={loadingLogout}/>
      <IonText 
        style={{fontSize: "10px", color: "darkblue", postion: "absolue", marginLeft: "2%" }}
        > Hi {user.fullName} here are Room-Me possibilities for you in {user.citylocation}. 
      </IonText>

      <IonList>
          {services.map((entry) =>
            <IonItem button key={entry.id}
              routerLink={`/my/services/${entry.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={entry.image} />
              </IonThumbnail>
              <IonLabel>
                <h2>{entry.title}</h2>
                <h3>{formatDate(entry.date)}</h3>

              </IonLabel>
            </IonItem>
          )}

        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>

    </IonContent>
    <ToggleBar />

  </IonPage>
  
  )
}

export default DashboardComponent;