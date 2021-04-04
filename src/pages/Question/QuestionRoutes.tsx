// here I create the routes
// fetch the questions and navigate to the questions the currently selected question 
// determine the current route with useState
// move hole useEffect here 
import { IonButton } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import { firestore } from "../../firebase";
import QuestionMultiChoicePage from "./QuestionMultiChoicePage";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { toast } from "../../toast";

interface RouteParams {
  id: string;
}


const NUMBEROFQUESTIONS = 14
const QuestionRoutes = () => {
  
  const checkedList = [
    {id: 0, checked: false}, 
    {id: 1, checked: false}, 
    {id: 3, checked: false},
    {id: 4, checked: false},
    {id: 5, checked: false},
    {id: 6, checked: false},
    {id: 7, checked: false}
  ]

  const { id } = useParams<RouteParams>();

  const [checked, setChecked] = useState(false)
  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { userId } = useAuth()

  // the array is sorted by id, but id is a string hence after 1 comes 11 but we want 2 to be the next one
  var compare = function(a, b) {
    return parseInt(a.id) - parseInt(b.id);
  }
  
  useEffect(() => {
    const checkedList  = []

    firestore.collection('questions')
    .get()
    .then(async snapshot => {
      await setQuestionData(
        snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).sort(compare)
      )
      if (questionData) {
        const data = questionData[id].answers.map((answer) => checkedList.push({id: answer.id, checked: false}))
        console.log(data)
      } else return;
      setLoading(false)
      }
    )
  },[])
  
  const handleChecked = ((answerId) => {
      setChecked(!checkedList[answerId].checked)
      const foundIndex = checkedList.findIndex(x => x.id == answerId);
      checkedList[foundIndex] = {
        id: foundIndex,
        checked: checked
      };
    })
  
  // questionData is a array of objects with the questions and the answers
  
  const handleNextClick = async () => {
    
    if(parseInt(id) < NUMBEROFQUESTIONS) {
      await firestore.collection('profiles')
      .doc(userId)
      .collection('character')
      .doc(id)
      .set({question: questionData[id].question, checkedList: checkedList})
      .then(() => {
        toast("Document successfully written!")

        history.push(`/my/register/question/${parseInt(id)+1}`)
      })
    }
      else {
        history.push('/my')
      }
    }

  return (
    !loading && questionData && checkedList.length > 0 &&
    <QuestionMultiChoicePage
      question={questionData[id].question}
      answers={questionData[id].answers}
      handleNextClick={handleNextClick}
      questionData={questionData}
      loading={loading}
      checkedList={checkedList}
      handleChecked={handleChecked}
    />
  )
}

export default QuestionRoutes;
