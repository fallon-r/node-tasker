const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
// ! Model Creation template
const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required : true,
        trim : true, 
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("That's not a valid email.")
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if(value <0 ){
                throw new Error ("Age must be a positive number")
            }
        }
    }
})

const me = new User({
    name: "Reggie                                                                   ",
    email: "REGGIE@gmail.com",
})

me.save().then((me)=>{console.log(me)}).catch((e)=> console.log("Error!", e))

// const Task = mongoose.model('Task', 
// {
//     task: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// }
// )

// const newTask = new Task(
//     {
//         task : "Clean toilet",
//         completed : false
//     }

// )

// newTask.save().then((newTask) => console.log(newTask)).catch((e)=>console.log("Error!" + e))