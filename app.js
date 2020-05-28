// Loading express
const express = require('express')
const app = express()
// Loading express-handlebars
const exphbs = require('express-handlebars')
// Loading bodyParser
const bodyParser = require('body-parser')
// Loading methodOverride
const methodOverride = require('method-override')


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

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})

