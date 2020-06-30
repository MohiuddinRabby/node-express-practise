const express = require('express');
const app = express();
const port = 3005;
app.use(express.static('public'))
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
app.listen(port, () => console.log("listening to port: ${port}"));