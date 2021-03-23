import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonTextarea, IonInput, IonDatetime } from "@ionic/react"
import React from "react"

interface Props {
  handleChange: any;
  handleSubmit: any;
  auth: any;
}

const CreateServiceComponent: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  auth
}) => {
  
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Create Service</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div className="create-page">
        <div className="container">
          <div className="form-container">
            <h1 className="title">Create Service</h1>
            <form>
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Category</IonLabel>
                <div className="control">
                  <div className="select">
                    <select name="category" onChange={handleChange}>
                      <option value="room">room</option>
                      <option value="apparment">apparment</option>
                      <option value="house">house</option>
                    </select>
                  </div>
                </div>
              </IonItem>
              </div>
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <div className="control">
                  <IonInput
                    onIonChange={handleChange}
                    name="title"
                    className="input"
                    type="text"
                    placeholder="Text input" />
                </div>
              </IonItem>
              
              </div>
              {/* <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonDatetime value={date}
                  onIonChange={(event) => setDate(event.detail.value)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Picture</IonLabel><br />
                <input type="file" accept="image/*" hidden ref={fileInputRef}
                  onChange={handleChange}
                />
                <img src={image} alt="" style={{ cursor: 'pointer' }}
                  onClick={handlePictureClick}
                />
              </IonItem> */}

              
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <div className="control">
                  <IonTextarea
                    onIonChange={handleChange}
                    name="description"
                    className="textarea"
                    placeholder="Textarea">
                  </IonTextarea>
                </div>
              </IonItem>
              </div>
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Image Url</IonLabel>
                <div className="control">
                  <IonInput
                    onIonChange={handleChange}
                    name="image"
                    className="input"
                    type="text"
                    placeholder="Text input" />
                </div>
                </IonItem>
              </div>
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Price per Hour</IonLabel>
                <div className="control">
                  <IonInput
                    onIonChange={handleChange}
                    name="price"
                    className="input"
                    type="number"
                    placeholder="Text input" />
                </div>
                </IonItem>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <IonButton
                    onClick={handleSubmit}
                    className="IonButton is-link">Create</IonButton>
                </div>
                <div className="control">
                  <IonButton routerDirection='back' className="IonButton is-text">Cancel</IonButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
  )
}

export default CreateServiceComponent;
