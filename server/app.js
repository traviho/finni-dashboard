const express = require('express')
const { MongoClient } = require("mongodb");
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
          const patients = database.collection('patients');
          const query = { };
          const data = await patients.findOne(query);
          console.log("hi");
          res.send(data)
        } catch {
          console.log(console.dir)
        }
      }
      run()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
