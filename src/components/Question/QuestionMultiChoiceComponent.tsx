import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';

interface Props {
  answers: any[];
  handleNextClick: any;
  question: any;
}


const QuestionMultiChoiceComponent: React.FC<Props> = ({
  handleNextClick,
  question,
  answers
}) => {
  
  return (
    <IonPage>
      <IonHeader translucent>
      <IonToolbar>
        <IonTitle>About you</IonTitle>
      </IonToolbar>
    </IonHeader>
    <h1 style={{position: "relative", textAlign: 'center'}}>{question}</h1>
      <IonContent>
      <IonList  style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-100px",
          border: "5px solid black",
          width: "200px"
        }}>
        { answers.map((answer) => (
          
          <IonItem key={answer.id}>
            <IonLabel>{answer.text}</IonLabel>
            <IonCheckbox color="primary" checked slot="start"></IonCheckbox>
          </IonItem>
        ))
        }
        </IonList>      
      </IonContent>
      <IonButton onClick={handleNextClick}
        style={{
          marginBottom: "35px",
        }}>
        Next
      </IonButton>
  </IonPage>

  )
}

export default QuestionMultiChoiceComponent;