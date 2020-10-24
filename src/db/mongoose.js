const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
// ! Model Creation template
// const User = mongoose.model("User", {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: "Harry",
//     age: "hello"
// })

// me.save().then((me)=>{console.log(me)}).catch((e)=> console.log("Error!", e))

const Task = mongoose.model('Task', 
{
    task: {
        type: String
    },
    completed: {
        type: Boolean
    }
}
)

const newTask = new Task(
    {
        task : "Clean toilet",
        completed : false
    }

)

newTask.save().then((newTask) => console.log(newTask)).catch((e)=>console.log("Error!" + e))