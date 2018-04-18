
import Firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAOp3dyLpWlg0OK2jPn8k2rES3BpRsMj00",
  authDomain: "todo-list-8f82a.firebaseapp.com",
  databaseURL: "https://todo-list-8f82a.firebaseio.com",
  projectId: "todo-list-8f82a",
  storageBucket: "todo-list-8f82a.appspot.com",
  messagingSenderId: "525575621556"
};

let app = Firebase.initializeApp(config)
const db = app.database()
export default db