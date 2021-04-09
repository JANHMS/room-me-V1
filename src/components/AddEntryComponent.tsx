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
  
  image1?: any;
  fileInputRef1?: any;
  handleFileChange1?: any;
  handlePictureClick1?: any;
  
  image?: any;
  fileInputRef?: any;
  handleFileChange?: any;
  handlePictureClick?: any;
  
  image2?: any;
  fileInputRef2?: any;
  handleFileChange2?: any;
  handlePictureClick2?: any;
  
  image3?: any;
  fileInputRef3?: any;
  handleFileChange3?: any;
  handlePictureClick3?: any;
  
  image4?: any;
  fileInputRef4?: any;
  handleFileChange4?: any;
  handlePictureClick4?: any;
  
  handleSave?: any;
  description?: string;
  setDescription?: any;
  handleCategoryChange?: any;
  mediaLink?: any;
  setMediaLink?: any;
  category?: string;
  setCategory?: any;
  price: string;
  setPrice: any;
}

const AddEntryComponent: React.FC <Props> = ({
  auth,
  date,
  setDate,
  title,
  setTitle,
  fileInputRef,
  handleFileChange,
  handlePictureClick,
  image,
  
  fileInputRef1,
  handleFileChange1,
  handlePictureClick1,
  image1,
  
  fileInputRef2,
  handleFileChange2,
  handlePictureClick2,
  image2,
  
  fileInputRef3,
  handleFileChange3,
  handlePictureClick3,
  image3,
  
  fileInputRef4,
  handleFileChange4,
  handlePictureClick4,
  image4,
  
  handleSave,
  description,
  setDescription,
  category,
  setCategory,
  mediaLink,
  setMediaLink,
  price,
  setPrice
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
          <IonLabel position="stacked">Cost per month</IonLabel>
          <IonInput value={price} type="number"
            onIonChange={(event) => setPrice(event.detail.value)}
          />
        </IonItem>
        
        <IonList>
        
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
            <IonItem>
              
              <IonLabel position="stacked">Add some pictures</IonLabel><br />
              <input type="file" accept="image/*" hidden ref={fileInputRef}
                onChange={handleFileChange}
              />
              <img src={image} alt="" style={{ cursor: 'pointer' }}
                onClick={handlePictureClick}
              />
            <br/>
              <input type="file" accept="image/*" hidden ref={fileInputRef1}
                onChange={handleFileChange1}
              />
              <img src={image1} alt="" style={{ cursor: 'pointer' }}
                onClick={handlePictureClick1}
              />
            <br/>
              <input type="file" accept="image/*" hidden ref={fileInputRef2}
                onChange={handleFileChange2}
              />
              <img src={image2} alt="" style={{ cursor: 'pointer' }}
                onClick={handlePictureClick2}
              />
            <br/>
              <input type="file" accept="image/*" hidden ref={fileInputRef3}
                onChange={handleFileChange3}
              />
              <img src={image3} alt="" style={{ cursor: 'pointer' }}
                onClick={handlePictureClick3}
              />
            <br/>
              <input type="file" accept="image/*" hidden ref={fileInputRef4}
                onChange={handleFileChange4}
              />
              <img src={image4} alt="" style={{ cursor: 'pointer' }}
                onClick={handlePictureClick4}
              />
              
            </IonItem>    
          </IonList>
        <IonButton expand="block" onClick={handleSave}>Save</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default AddEntryComponent;