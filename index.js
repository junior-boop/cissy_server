const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const PRODUCT = require('./routes/products')
const IMAGES = require('./routes/images')
const STORE = require('./routes/store');
const TUTORIEL = require('./routes/tutoriels');
const COIFFEUSE = require('./routes/coiffeuses');

app.use(cors())

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/assets', express.static('public'));
app.use('/images', express.static('images'));

app.use('/image', IMAGES)
app.use('/products', PRODUCT)
app.use('/store', STORE)
app.use('/tutoriels', TUTORIEL)
app.use('/coiffeuses', COIFFEUSE)


app.get('/', async (req, res) => {
  
  res.json({
    ville : "yaounde",
    pays : 'Cameroun'
  })
});


app.listen(8080, () => {
  console.log('Listening');
});
