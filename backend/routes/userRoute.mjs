import express from 'express';
import User from '../models/userModel.mjs';
import { getToken } from '../utl.mjs';
import Cookie from 'js-cookie';
import axios from 'axios';
 import { Auth } from 'two-step-auth';
// const { Auth } = require("two-step-auth");
// const Nexmo = require('nexmo');

const router = express.Router();

// const nexmo = new Nexmo({
//     apikey: "5e97ad40",
//     apiScret: "kHcGkYT28gF0X22G"
//   })

//   const Vonage = require('@vonage/server-sdk');
// const vonage = new Vonage({
//   apiKey: "5e97ad40",
//   apiSecret: "kHcGkYT28gF0X22G"
// });

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .catch((err) => console.log(err));
    if(signinUser){
        
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        phone: signinUser.phone,
        isAdmin: signinUser.isAdmin,
        token: getToken(User),
        //  otp:result.OTP
      });
// const emailId =  signinUser.email
// async function login(emailId) {
// // // const res = await Auth(emailId);
// // // You can follow this approach,
// // // but the second approach is suggested,
// // // as the mails will be treated as important
//  const response = await Auth(emailId, "EMS")
//  .then((result) => {
//   res.send({
//     _id: signinUser.id,
//     name: signinUser.name,
//     email: signinUser.email,
//     phone: signinUser.phone,
//     isAdmin: signinUser.isAdmin,
//     token: getToken(User),
//      otp:result.OTP
//   });
//   console.log(result);
// console.log(result.mail);
// console.log(result.OTP);
// console.log(result.success);
// }).catch((err) => console.log(err));
// }
// login(emailId)

    }else {
        res.status(401).send({msg:'Invalid Email or Password.'})
    }
 })

 router.post('/forgetpassword', async (req, res) => {
  const userEmail = await User.findOne({
      email: req.body.email,
  })
  .catch((err) => console.log(err));
  if(userEmail){    
const emailId =  userEmail.email
async function login(emailId) {
const response = await Auth(emailId, "EMS")
.then((result) => {
res.send({
  email: userEmail.email,
   otp:result.OTP
});
}).catch((err) => console.log(err));
}
login(emailId)

  }else {
      res.status(401).send({msg:'Invalid Email or Password.'})
  }
})


router.post('/getOtp', async(req, res) => {
  vonage.verify.request({
    number: "2347065491448",
    brand: "Vonage"
  }, (err, result) => {
    if (err) {
      res.status(401).send({msg:'server Error'})
      console.error(err);
    } else {
      const requestId = result.request_id;
      res.status(200).send(requestId)
      console.log(requestId);
    }
  });
})

router.post('/otp', (req, res) => {

    const verifyOtp = (requestId, code) => {
      vonage.verify.check({
        requestId,
        code
      }, (err, result) => {
        if (err) {
          res.status(401).send({msg:'Invalide Activation Code'})
          console.error(err);
        } else {
          res.send(result)
        }
        console.log(result);
      });
      console.log(requestId)
     }

     
    const { code, requestId } = req.body;
    if (!code) return res.status(400).send({ message: "Otp is required" });
    if (!requestId) return res.status(400).send({ message: "Invalid request" });

   verifyOtp(requestId, code, async(result) => {
     if(result){
       res.send({message:'success'});
     }else{ 
      return res.status(400).send({ message: `Error verifying OTP` });
     }
   })
  })

router.post('/register', async (req, res) => {
    const checkUser = await User.findOne({
        email: req.body.email
    }).catch((err) => console.log(err));
    if(checkUser){
       res.status(409).send("User Already Exist, Please Login")
        console.log("eamail exist")
    }else{
    const user = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        phone: req.body.phone
    });
    const newUser = await user.save()
    .catch((err) => console.log(err));
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({msg:'Invalid User Data.'})
    }
}
})

router.get("/createadmin", async (req, res) => {
    try{
        const user = new User({
            name: 'Sammy',
            email: 'tsammyy@gmail.com',
            password: '12345',
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
})

export default router;