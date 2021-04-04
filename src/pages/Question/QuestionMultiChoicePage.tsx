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
  checkedList,
  handleChecked
}) => {

  return(
    !loading && questionData && checkedList ?
    <QuestionMultiChoiceComponent
      answers={answers}
      question={question}
      handleNextClick={handleNextClick}
      checkedList={checkedList}
      handleChecked={handleChecked}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionMultiChoicePage;
