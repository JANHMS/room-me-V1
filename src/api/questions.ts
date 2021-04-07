import { firestore } from "../firebase"

// the array is sorted by id, but id is a string hence after 1 comes 11 but we want 2 to be the next one
var compare = function(a, b) {
  return parseInt(a.id) - parseInt(b.id);
}

export const fetchQuestions = (setQuestionData) => (
  firestore.collection('questions')
  .get()
  .then(async snapshot => {
    await setQuestionData(
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).sort(compare)
    )}
  )
)