const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express();
const port = 3005;
//express.static set static dir
app.use(express.static('public'))
// cors use to open get ports publicly or securely(in other ways)
app.use(cors());
//parse application json
app.use(bodyParser.json())
const dbName = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

const users = ['testUser1', 'testUser2', 'testUser3'];
//database connection 
//
app.get('/', (req, res) => {
    res.send('Hello express,nodemon installed');
});
//all porduct api
app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("shop").collection("devices");
        // perform actions on the collection object
        console.log('mongo connected')
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log('error', err);
            } else {
                res.send(documents);
                console.log('data inserted')
            }
        });
        client.close();
    });
});
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product)
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("shop").collection("devices");
        // perform actions on the collection object
        console.log('mongo connected')
        collection.insert(product, (err, result) => {
            if (err) {
                console.log('error', err);
            } else {
                res.send(result.ops[0]);
                console.log('data inserted')
            }
        });
        client.close();
    });
})
//find product
app.get('/product/:key', (req, res) => {
    const key = req.params.key;
    //
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("shop").collection("devices");
        // perform actions on the collection object
        console.log('mongo connected')
        collection.find({ key }).toArray((err, documents) => {
            if (err) {
                console.log('error', err);
            } else {
                res.send(documents[0]);
                console.log('data inserted')
            }
        });
        client.close();
    });

})
//product details
app.post('/getProductsByKey', (req, res) => {
    const key = req.params.key;
    const productKeys = req.body;
    console.log(productKeys)
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("shop").collection("devices");
        // perform actions on the collection object
        console.log('mongo connected')
        collection.find({ key: { $in: productKeys } }).toArray((err, documents) => {
            if (err) {
                console.log('error', err);
            } else {
                res.send(documents);
            }
        });
        client.close();
    });

})
//order place
app.post('/placeOrder', (req, res) => {
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    console.log('order sended',orderDetails)
    //
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("shop").collection("orders");
        collection.insertOne(orderDetails, (err, result) => {
            if (err) {
                console.log('error', err);
            } else {
                res.send(result.ops[0])
            }
        });
        client.close();
    });

})
//delete
//update
//post
app.listen(port, () => console.log(`listening to port: ${port}`));