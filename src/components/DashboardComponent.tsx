import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import React, { useState } from "react";
import ToggleBar from "../components/ToggleBar";
import HeaderImage from '../components/HeaderImage';
import { add as addIcon } from 'ionicons/icons';


interface Props {
  logout: any;
  loadingLogout: boolean;
  entries: any;
  formatDate: any;
}
const DashboardComponent: React.FC<Props> = ({
  logout,
  loadingLogout,
  entries,
  formatDate,
}) => {
  
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <HeaderImage/>
        <IonButton onClick={logout} style={{
          position: "absolute",
          top: "10px",
          right: "10px"
        }}>Logout</IonButton>
      </IonToolbar>
    </IonHeader>
    <h2>Dashboard</h2>
    <IonContent className="icon-padding">
      <IonLoading message="Logging out..." duration={0} isOpen={loadingLogout}/>
      <IonList>
          {entries.map((entry: { id: React.Key | null | undefined; pictureUrl: any; date: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) =>
            <IonItem button key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={entry.pictureUrl} />
              </IonThumbnail>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      <IonFooter><p><ToggleBar/></p></IonFooter>
    </IonContent>
  </IonPage>
  )
}

export default DashboardComponent;