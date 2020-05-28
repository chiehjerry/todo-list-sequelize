// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// 載入 User model
const db = require('../models')
const User = db.User
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' })
          }
          //用 bcrypt 來比較「使用者輸入的密碼」跟在使用者資料庫的密碼是否是同一組字串
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Email and Password incorrect' })
            }
          })
        })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      user = user.get()
      done(null, user)
    })
  })
}