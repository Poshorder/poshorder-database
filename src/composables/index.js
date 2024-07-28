import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js'

import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js'

import { v4 as uuidv4 } from 'uuid';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBuBXky5xQ7p--KmH3ekEpK5CBXv_f49Y',
  authDomain: 'nico-huncho.firebaseapp.com',
  databaseURL: 'https://nico-huncho-default-rtdb.firebaseio.com',
  projectId: 'nico-huncho',
  storageBucket: 'nico-huncho.appspot.com',
  messagingSenderId: '913580817725',
  appId: '1:913580817725:web:084e38fea3b67f9914d954',
  measurementId: 'G-19R8MNHCR3'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const storage = getStorage()
const db = getFirestore()



function saveNewArrivals(data, progressCallback) {
    return new Promise((resolve, reject) => {
      const itemID = uuidv4();
      const newArrivalsRef = ref(storage, `new-arrivals/item_${itemID}`);
      const uploadTask = uploadBytesResumable(newArrivalsRef, data.file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
         // console.log('Upload is ' + progress + '% done');
         if (progressCallback) {
             progressCallback(progress); // Call the progress callback with the progress value
            }
          //resolve({ progress });
        },
        (err) => {
          alert('Failed to upload file', err.message);
          console.log('Failed to upload file', err.message);
          
          // Reject with error
          reject({ error: err.message });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(`File URL: ${downloadURL}`);
            const item = {
              id: `item_${itemID}`,
              name: data.name,
              url: downloadURL,
              price: data.price,
              qt: data.qt,
              color: data.color,
              descriptions: data.descriptions
            };
             saveDataCollection(item);
            
            // Resolve with success and item details
            resolve({ success: true, item });
          } catch (err) {
            console.log('Failed to save item to collection', err.message);
            alert('Failed to save item to collection', err.message);
            
            // Reject with error
            reject({ error: err.message });
          }
        }
      );
    });
  }
  async function saveDataCollection(item) {
    try {
      const colRef = doc(db, `new-arrivals/${item.id}`);
      await setDoc(colRef, item);
      console.log('Document added!');
      alert('Document added!');
    } catch (err) {
      console.error('Error adding document:', err.message);
      alert('Error adding document:', err.message);
      throw err; // Re-throw the error to handle it in the calling function
    }
  }



  async function getArrivalsCol() {

    const data = []
    try {
        const colRef = collection(db,'new-arrivals');
        const snapshot = await getDocs(colRef);
        snapshot.forEach((doc) => {
            data.push({...doc.data()})
        })
        return data
    } catch (error) {
        console.log(error)
    }
   
  }
export { saveNewArrivals, getArrivalsCol }
