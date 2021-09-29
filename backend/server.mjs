
/***********************new Project */

import express from 'express';
import data from './data.js'
import config from './config.mjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.mjs';
import productRoute from './routes/productRoute.mjs';
// const nunjucks = require('nunjucks');
// const Nexmo = require('nexmo');
//import exphbs from 'express-handlebars';
// import User from './models/userModel'

// var messagebird = require('messagebird')('ITIALH4kobiCgdKUL8FvgbbbQ')
// dotenv.config({path:'/config.env'})
 dotenv.config();

 const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, { useNewUrlParser: true, 
  useUnifiedTopology: true, useCreateIndex:true 
})
.then(() => {
  console.log("Successfully connected to database");
})
.catch(error => console.log(error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.get('/', (req, res) => { res.send('Hello from Express!')})
// const nexmo = new Nexmo({
//   apikey: "5e97ad40",
//   apiScret: "kHcGkYT28gF0X22G"
// })

// app.get('/', (req, res) => {
//     res.render('getOtp.html', { message: 'hello'})
// })

// app.post('/verify', (req, res) => {
//   nexmo.verify.request({
//     number: "2347065491448",
//     brand: "EMS"
//   }, (err, result) => {
//     if (result.status != 0) {
//       res.render('/getOtp.html', {message: result.error_text})
//     } else {
//       res.render('/check.html', { requestId: result.request_id})
//     }
//   });
// })

// app.post('/check', (req, res) => {
//   nexmo.verify.check({
//     request_id: req.body.requestId,
//     code: req.body.code
//   }, (err, result) => {
//     if (result.status != 0) {
//       res.render('/getOtp.html', {message: result.error_text});
//     } else {
//       res.render('/')
//     }
//   });
// })
// app.engine('handlebars', exphbs({defaultLayout: 'verify'}));
// app.set('view engine', 'handlebars');

// // app.get('/signin', async (req, res) => {
// //   const signinUser = await User.findOne({
// //       email: req.body.email,
// //       password: req.body.password
// //   })
// // })
// app.post('/signin', async (req, res) => {
//   const signinUser = await User.findOne({
//       email: req.body.email,
//       password: req.body.password
//   })
//   if(signinUser){
//     var number = signinUser.phone
//     messagebird.verify.create(number, {
//       template: "Your verification code is %token"
//     }, function(err, response) {
//       if(err){
//         console.log(err)
//       }else{
//         res.render('/verify', {
//           id: response.id
//         })
//       }
//     })
//   }
// })

// app.post('/verify', function(req, res) {
//   var token = req.body.token

//   messagebird.verify.verify(token, (err, response) => {
//     if(err){
//       res.render('/verify', {
//         error: err.errors[0].description
//       })
//     }else{
//       res.render('/')
//     }
//   })
// })
app.listen(process.env.PORT || 5000, () => console.log("Server started"))
