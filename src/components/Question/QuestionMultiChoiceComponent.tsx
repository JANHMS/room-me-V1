import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';

interface Props {
  answers: any[];
  handleNextClick: any;
  question: any;
  checkedList: any;
  handleChecked: any;
}


const QuestionMultiChoiceComponent: React.FC<Props> = ({
  handleNextClick,
  question,
  answers,
  checkedList,
  handleChecked
}) => {
  
  return (
    <IonPage key={question.id}>
      <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>About you</IonTitle>
      </IonToolbar>
    </IonHeader>
    <h1 style={{position: "relative", textAlign: 'center'}}>{question}</h1>
      <IonContent>
      <IonList  style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          marginTop: "-20px",
          marginLeft: "-140px",
          border: "2px solid black",
          borderRadius: "10px",
          width: "280px"
        }}>
        { answers.map((answer) => (
          
          <IonItem key={answer.id} style={{height: "50px"}}>
            <IonLabel style={{fontSize: "14px"}}>{answer.text}</IonLabel>
            <IonCheckbox 
              color="primary" 
              slot="end" 
              checked={checkedList[parseInt(answer.id)].checked} 
              onIonChange={() => handleChecked(answer.id, answer.text)}>
            </IonCheckbox>
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