import { IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import QuestionMultiChoiceComponent from "../../components/Question/QuestionMultiChoiceComponent";
import { firestore } from "../../firebase";

const QuestionMultiChoicePage = ({
  loading,
  question,
  questionData,
  answers,
  handleNextClick,
  checked,
  handleChecked
}) => {

  return(
    !loading && questionData ?
    <QuestionMultiChoiceComponent
      answers={answers}
      question={question}
      handleNextClick={handleNextClick}
      checked={checked}
      handleChecked={handleChecked}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionMultiChoicePage;
