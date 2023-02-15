const Expense = require('../models/expenses');
const User = require('../models/users')
const UserServices = require('../services/userservices')
const S3Service = require('../services/S3services')
const AWS = require('aws-sdk');
const { rejects } = require('assert');


const downloadexpense = async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req); // here expenses are array
    console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    //res.status(200).json({fileURL,success: true})
    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Service.uploadToS3(stringifiedExpenses, filename);
    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ fileURL: "", success: false, error: err });
  }
};




const addexpense = (req, res) => {
    const { expenseAmount, description, category } = req.body;
    //expenseAmount
    console.log(expenseAmount)
    if(expenseAmount == undefined || expenseAmount.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    
    Expense.create({expenseAmount,description,category,userId:req.user.id}).then(expense => {
      const totalExpense = Number(req.user.totalExpenses) + Number(expenseAmount)
      console.log(totalExpense)
      User.update({
        totalExpenses:totalExpense
      },{
        where:{id:req.user.id}
      }).then(async()=>{
        res.status(200).json({expense:expense})
      }).catch(async(err) => {
        return res.status(500).json({success:false,error:err})
      })
    }).catch(async(err) => {
      return res.status(500).json({success:false,error:err})
    })
}

const getexpenses = (req, res)=> {
  try {
      const uId = req.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit) : 2;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      console.log(page);
      console.log("AQSAM", req.user.id);
      Expense.findAndCountAll({ where: { userId: uId } })
      .then((data) => {
      var pages = Math.ceil(data.count / limit);
      req.user
        .getExpenses({ offset: (page - 1) * limit, limit: limit })
        .then((expense) => {
          console.log(expense, "expense created");
          res.json({ expense, pages: pages });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
    }
   
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    Expense.destroy({where: { id: expenseid, userId: req.user.id }}).then((noofrows) => {
        if(noofrows === 0){
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    })
}

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    downloadexpense
}