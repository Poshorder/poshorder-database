const admin = require("firebase-admin");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 3000

const serviceAccount = require("./serviceAccount/nico-huncho-firebase-adminsdk-hrjih-f8009f5b6d.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nico-huncho-default-rtdb.firebaseio.com"
});



const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())

const db = admin.firestore()
const colRef = db.collection('products/');


app.get('/api/products/', async (req, res) => {
  const data = [];
  try {
    const snapshot = await colRef.get();
    snapshot.forEach((doc) => {
      data.push({ ...doc.data()});
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data');
  }
});

//Get single item 
app.post('/api/item/',async (req,res) => {

  const itemId = req.body.id
  console.log(itemId)

  try {
    const itemRef = db.doc(`products/${itemId}`);
    const snapshot = await itemRef.get()

    if (snapshot.exists) {
      console.log(snapshot.data())
      return res.json(snapshot.data())
    }else{
      console.log('Item not found!')
      return res.status(404).json('doc not found!');
    }
  } catch (error) {
    console.log(error)
  }

});








app.listen(port,() => {
    console.log(`App listenning on Port: ${port}`)

});