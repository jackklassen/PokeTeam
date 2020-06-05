const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.use(express.static(__dirname + '/')) // this points static files ie js and css to the html

app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
)