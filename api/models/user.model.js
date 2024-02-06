import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    googlePhotoUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0IllfER3ypzjX30V4Dff_7&ust=1706701423914000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKi117OEhYQDFQAAAAAdAAAAABAE",
    },

    isAdmin:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User