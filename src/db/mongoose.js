const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})
// ! Model Creation template
// const User = mongoose.model("User", {
//     name: {
//         type: String,
//         required: true,
//         trim : true
//     },
//     email:{
//         type: String,
//         required : true,
//         trim : true, 
//         lowercase : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error ("That's not a valid email.")
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//             if(validator.contains(value, "password", {ignoreCase: true})){
//                 throw new Error ("Password can't be password")
//             }
//         }

//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value) {
//             if(value <0 ){
//                 throw new Error ("Age must be a positive number")
//             }
//         }
//     }
// })

// const me = new User({
//     name: "Reggie                                                                   ",
//     email: "REGGIE@gmail.com",
//     password : "zJyXkVjbAjsNy697sqBKzJyXkVjbAjsNy697sqBKzJyXkVjbAjsNy697sqBKzJyXkVjbAjsNy697sqBKzJyXkVjbAjsNy697sqBKzJyXkVjbAjsNy697sqBK",
//     age: 45
// })

// me.save().then((me)=>{console.log(me)}).catch((e)=> console.log("Error!", e))

const Task = mongoose.model('Task', 
{
    description: {
        type: String,
        trim : true,
        required : true
    },
    completed: {
        type: Boolean,
        default: false,
        required : false
    }
}
)

const newTask = new Task(
    {
        description : "Clean toilet"
    }

)

newTask.save().then((newTask) => console.log(newTask)).catch((e)=>console.log("Error!" + e))