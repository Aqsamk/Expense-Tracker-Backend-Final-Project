/*const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv');
//const { use } = require('../routes/user');

dotenv.config();

const authenticate = (req,res,next) => {

    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'secretkey',process.env.TOKEN_SECRET);
        console.log('userId >>>>',user.userId)
        User.findByPk(user.userId).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;//important line
            next();
        }).catch(err => {throw new Error(err)})

    }catch(err) {
        console.log(err)
        return res.status(401).json({success:false})
    }

}

module.exports = {authenticate};



const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

exports.authorization=async(req, res, next)=>{
    try {
        const jwtToken=JSON.parse(req.header('Authorization')) 
        
        console.log(jwtToken,`jwttoken>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
        const userId=jwt.verify(jwtToken,process.env.TOKEN_SECRET)
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>`,userId);
       const userExists=await User.findByPk(userId);
       console.log(userExists);
       if (userExists) {
           req.user=userExists
           next();
       }else{
           res.json({success:false,message:`user does not exist`});
       }
        
        //  User.findByPk(1).then((user)=>{
        //      console.log(user);
        //      req.user=user;
        //      next()
        //  }).catch((error)=>{throw new Error(error)})
    } catch (error) {
        return res.status(401).json({success: false,message:`jwtTokenerror`});
    }
  
}
*/

const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const user = jwt.verify(token, "secretkey");
    console.log("userID>>>", user.userId);
    User.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (err) {
    console.log("token error");
    console.log(err);
    return res.status(401).json({ success: false });
  }
};
module.exports = {
  authenticate,
};