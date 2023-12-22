const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        trim: true,
    },
    password:{
        type:String,
        require:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
      avatarImage: {
        type: String,
        default: "",
    },
})

module.exports = mongoose.model("User",UserSchema);