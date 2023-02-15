const path = require("path");
const fs = require('fs')
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

const sequelize = require("./utils/database");
const User = require("./models/users");
const Expense = require("./models/expenses");
const Order = require("./models/orders");
const Forgotpassword = require("./models/forgotpassword");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumFeatureRoutes = require("./routes/premiumFeature");
const resetPasswordRoutes = require("./routes/resetpassword");


const app = express();
const dotenv = require("dotenv");
const { Stream } = require("stream");

// get config vars
dotenv.config();

//const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flag : 'a'})
//{stream:accessLogStream}
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'))
app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumFeatureRoutes);
app.use("/password", resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {console.log('server running on port 3000')});
  })
  .catch((err) => console.log(err));