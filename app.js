const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = require('./routes')
const errorHandler = require('./middleware/error_handler')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//tugas no 4.
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});