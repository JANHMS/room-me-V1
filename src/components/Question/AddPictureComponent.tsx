import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

interface Props {
  auth?: any;
  image?: any;
  fileInputRef?: any;
  handleFileChange?: any;
  handlePictureClick?: any;
  handleSave?: any;
}

const AddPictureComponent: React.FC <Props> = ({
  auth,
  image,
  fileInputRef,
  handleFileChange,
  handlePictureClick,
  handleSave,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Picture of you</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Pictures</IonLabel><br />
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img src={image} alt="" style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
          </IonItem>
          
        </IonList>
        <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default AddPictureComponent;