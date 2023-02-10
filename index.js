const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:kXJPJcE5NHKy9HxK@cluster0.esiqbw1.mongodb.net";
const DB_NAME = "ocean-bancodedados-090223";


async function main(){
console.log("Conectando...");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("conectado com sucesso.");

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("<h1> Hello World!</h1> <br> - 03/02!!");
});

app.get("/oi", function (req, res) {
  res.send("<h1> Olá Mundo!</h1> <br> Agora Foi, com oi - 03/02!!");
});

const itens = ["abacaxi", "pera", "lichia", "mamão"];

//read all

app.get("/item", async function (req, res) {
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

// read by id

app.get("/item/:id", async function (req, res) {
  const id = req.params.id;
  const item = await collection.findOne({_id: new ObjectId(id) });
  res.send(item);
});

// create

app.post("/item", async function (req, res) {
  
  const item = req.body;
  await collection.insertOne(item)
    res.send(item);
});

// update

app.put("/item/:id", async function (req, res){
  const id = req.params.id;
  const body = req.body;

 // console.log(id, body);
  
 await collection.updateOne(
{_id: new ObjectId(id)},
{$set: body}

 );
 
 res.send(body);

});

//delete /item/:id

app.listen(3000);

}

main();