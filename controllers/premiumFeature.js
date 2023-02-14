// const Expense = require("../models/expenses");
// const Leaderboard = require("../models/users");



// exports.leaderboard=async (req, res)=>{

// let a= await Leaderboard.findAll({order:[['totalExpenses','DESC']]})
// console.log(a);
// res.json(a);

// }

const e  = require('express')
const Expense = require("../models/expenses");
const User = require("../models/users");


const getUserLeaderBoard = async (req,res) => {
    try {
        const leaderboardofusers = await User.findAll({
            order:[['totalExpenses', 'DESC']]
        })
        res.status(200).json(leaderboardofusers)
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}