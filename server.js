require('./models/db')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('express-handlebars')
const logger = require('morgan')
const port = process.env.PORT || 8080;
const usersController = require('./controller/getUsersController')
const { path } = require('./server');

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// routing 
app.use('/', usersController)

// static folder
app.use(express.static('views'));
// handlebars
app.engine('handlebars', hbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars');
  



// listen to the port
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});





module.exports = app