import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCqdBIXXGrXS9GK8xaQrcYIdhIGlGtRKH8',
    authDomain: 'voxipo-app.firebaseapp.com',
    databaseURL: 'https://voxipo-app.firebaseio.com',
    projectId: 'voxipo-app',
    storageBucket: 'voxipo-app.appspot.com',
    messagingSenderId: '12345-insert-yourse',
    appId: '1:661634438218:android:3fde2183f94299315482b3',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
