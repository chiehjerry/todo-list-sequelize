// Loading express
const express = require('express')
const app = express()
// Loading express-handlebars
const exphbs = require('express-handlebars')
// Loading bodyParser
const bodyParser = require('body-parser')
// Loading methodOverride
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
// Loading model
const db = require('./models')
const Todo = db.Todo
const User = db.User




// Set port = 3000
const port = 3000

// In 'app.engine' , add a 'hbs' template engine and set a {extname: '.hbs'} to set filename extension , and then the .handlebars can be .hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// In 'app.set', the 'hbs' component be loaded to app.js to start! 
app.set('view engine', 'hbs')

// Using bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// Using methodOverride
app.use(methodOverride('_method'))

app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))
// 使用 Passport - 要在「使用路由器」前面
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// 設定路由
app.get('/', (req, res) => {
  res.send('Hello world!')
})
app.use('/users', require('./routes/user'))


app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})

