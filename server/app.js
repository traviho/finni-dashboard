const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

app.get('/data', (req, res) => {
    async function run() {
        try {
          const database = client.db('patient_db');
          const patients = database.collection('patients2');
          const query = { };
          const data = await patients.find(query).toArray();
          console.log("hi");
          res.send(data)
        } catch (error) {
          console.log(error)
        }
      }
      run()
});

app.get('/patient', (req, res) => {
  async function run() {
      try {
        const id = req.query.id
        const database = client.db('patient_db');
        const patients = database.collection('patients2');
        const query = { _id: new ObjectId(id) };
        const data = await patients.findOne(query);
        console.log("retrieving profile");
        res.send(data)
      } catch (error) {
        console.log(error)
      }
    }
    run()
});

app.post('/updateClient', (req, res) => {
  console.log(req.body.profile)
  async function run() {
    try {
      const profile = req.body.profile;
      const database = client.db('patient_db');
      const patients = database.collection('patients2');
      const id = profile._id;
      delete profile._id;
      const filter = { _id: new ObjectId(id) };
      var patient = await patients.findOne(filter)
      const updateDoc = {
        $set: {
          ...profile
        },
      };
      console.log("updating...");
      const result = await patients.updateOne(filter, updateDoc);
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }
  run()
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
