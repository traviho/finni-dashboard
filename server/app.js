const express = require('express')
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors')

const app = express()
app.use(cors())
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

app.post('/updateClient', (req, res) => {
  async function run() {
    try {
      const database = client.db('patient_db');
      const patients = database.collection('patients2');
      const filter = { _id: new ObjectId("656279c0436f7e100df53385") };
      var patient = await patients.findOne(filter)
      patient["Phone Number"] = "1-307-577-5888"
      const updateDoc = {
        $set: {
          "Phone Number": Math.floor(Math.random() * 88888888888) + 11111111111
        },
      };
      console.log("update");
      console.log(patient)
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
