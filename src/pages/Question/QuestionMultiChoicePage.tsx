import { IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import QuestionMultiChoiceComponent from "../../components/Question/QuestionMultiChoiceComponent";
import { firestore } from "../../firebase";

const QuestionMultiChoicePage = ({
  id,
  loading,
  question,
  questionData,
  answers,
  handleNextClick
}) => {

  return(
    !loading && questionData ?
    <QuestionMultiChoiceComponent
      answers={answers}
      question={question}
      handleNextClick={handleNextClick}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionMultiChoicePage;
