const express = require('express');
const cors = require('cors')
const app = express();
const port = 3005;
//express.static set static dir
app.use(express.static('public'))
// cors use to open get ports publicly or securely(in other ways)
app.use(cors());
//
app.get('/', (req, res) => {
    res.send('Hello express,nodemon installed');
});
app.get('/fruit', (req, res) => {
    const fruit = {
        name: ['mango', 'orange', 'banana', 'apple', 'lichi'],
        price: [10, 15, 5, 4, 2]
    }
    res.send(fruit);
})
// app.get('/users/:id',(req,res)=>{
//     console.log(req.params);
// })
const users = ['testUser1', 'testUser2', 'testUser3'];
app.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    const userName = users[userID];
    res.send({userName,userID});
})

app.listen(port, () => console.log("listening to port: ${port}"));