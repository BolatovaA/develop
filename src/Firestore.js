  import * as firebase from 'firebase';

  const config = {
      apiKey: "AIzaSyBZe2U5714XbonSJ1_t9gk1u2apDwJzWXg",
      authDomain: "bucket-52f86.firebaseapp.com",
      databaseURL: "https://bucket-52f86.firebaseio.com",
      projectId: "bucket-52f86",
      storageBucket: "bucket-52f86.appspot.com",
      messagingSenderId: "694659286122",
      appId: "1:694659286122:web:f7cc40104c14f7f7737613"
  };

  firebase.initializeApp(config);
  
  export default firebase;