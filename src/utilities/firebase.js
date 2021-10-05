import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBd6mr49OL-hKtqSsrg7ZTfKnxAYE029jg",
    authDomain: "cs397scheduler.firebaseapp.com",
    databaseURL: "https://cs397scheduler-default-rtdb.firebaseio.com",
    projectId: "cs397scheduler",
    storageBucket: "cs397scheduler.appspot.com",
    messagingSenderId: "947832977782",
    appId: "1:947832977782:web:b7b771f959654017f92257"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

ref(database)
ref(database, '/')
ref(database, '/courses')

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };