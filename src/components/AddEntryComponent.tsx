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
import withAuthorization from '../hoc/withAuthorization';

interface Props {
  auth?: any;
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
  price?: string;
  setPrice?: any;
  location?: string;
  setLocation?: (l: string) => void
}

const AddEntryComponent: React.FC <Props> = ({
  auth,
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
  setMediaLink,
  price,
  setPrice,
  location,
  setLocation
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

      <IonSelect value={category} onIonChange={(category) => setCategory(category.detail.value)}>
        <IonSelectOption value="room">room</IonSelectOption>
        <IonSelectOption value="apparment">apparment</IonSelectOption>
        <IonSelectOption value="house">house</IonSelectOption>
      </IonSelect>
        
      </IonItem>
        <IonItem>
          <IonLabel position="stacked">Movin Day</IonLabel>
          <IonDatetime value={date}
            onIonChange={(event) => setDate(event.detail.value)}
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={title}
            onIonChange={(event) => setTitle(event.detail.value)}
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">Total Cost per month</IonLabel>
          <IonInput value={price} type="number"
            onIonChange={(event) => setPrice(event.detail.value)}
          />
        </IonItem>
        
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
          <IonItem>
            <IonLabel position="stacked">Description of flat</IonLabel>
            <IonTextarea value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">City</IonLabel>
            <IonTextarea value={location}
              onIonChange={(event) => setLocation(event.detail.value)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">Link to your Social Media</IonLabel>
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