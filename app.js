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

// 設定路由
// 首頁
app.get('/', (req, res) => {
  res.send('hello world')
})
// 認證系統的路由
// 登入頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
  res.send('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
  res.send('register')
})
// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})


app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})

