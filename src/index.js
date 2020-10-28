const express = require("express");
require("./db/mongoose");
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter)
app.use(taskRouter)

const jwt = require("jsonwebtoken")

// const func = async ()=>{
//   const token = jwt.sign({_id:"abc123"}, 'imthesecret', {expiresIn: '7 days'})
//   console.log(token)

//   const data = jwt.verify(token, 'imthesecret')
//   console.log(data)
// }

// func()


app.listen(port, () => {
  console.log(`server's up on port ${port}`);
});