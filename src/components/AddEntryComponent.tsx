import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

interface Props {
  date?: string;
  setDate?: any;
  title?: string;
  setTitle?: any;
  image?: any;
  fileInputRef?: any;
  handleFileChange?: any;
  handlePictureClick?: any;
  handleSave?: any;
  description?: string;
  setDescription?: any;
  handleCategoryChange?: any;
  mediaLink?: any;
  setMediaLink?: any;
  category?: string;
  setCategory?: any;
}

const AddEntryComponent: React.FC <Props> = ({
  date,
  setDate,
  title,
  setTitle,
  image,
  fileInputRef,
  handleFileChange,
  handlePictureClick,
  handleSave,
  description,
  setDescription,
  category,
  setCategory,
  mediaLink,
  setMediaLink
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonItem>
        <IonLabel position="stacked">Room Category</IonLabel>
        <div className="control">
          <div className="select">
            <IonSelect value={category} onIonChange={(category) => setCategory(category.detail.value)}>
              <IonSelectOption value="room">room</IonSelectOption>
              <IonSelectOption value="apparment">apparment</IonSelectOption>
              <IonSelectOption value="house">house</IonSelectOption>
            </IonSelect>
          </div>
        </div>
        
      </IonItem>
        <IonItem>
          <IonLabel position="stacked">Movin Day</IonLabel>
          <IonDatetime value={date}
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture of you :)</IonLabel><br />
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img src={image} alt="" style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description of flat</IonLabel>
            <IonTextarea value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">Link Social Media</IonLabel>
            <IonInput value={mediaLink}
              onIonChange={(event) => setMediaLink(event.detail.value)}
            />
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default AddEntryComponent;