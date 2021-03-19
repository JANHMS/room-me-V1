import { IonBackButton, IonButtons, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonTextarea } from "@ionic/react"
import React from "react"

interface Props {
  handleChange: any;
  handleSubmit: any;
}

const CreateServiceComponent: React.FC<Props> = ({
  handleChange,
  handleSubmit
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
                      <option value="mathematics">Mathematics</option>
                      <option value="programming">Programming</option>
                      <option value="painting">Painting</option>
                      <option value="singing">Singing</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>
              </IonItem>
              </div>
              <div className="field">
                <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <div className="control">
                  <input
                    onChange={handleChange}
                    name="title"
                    className="input"
                    type="text"
                    placeholder="Text input" />
                </div>
              </IonItem>
              </div>
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
                  <input
                    onChange={handleChange}
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
                  <input
                    onChange={handleChange}
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
                  <IonButton className="IonButton is-text">Cancel</IonButton>
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
