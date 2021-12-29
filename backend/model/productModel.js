const mongoose =require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Product Name"],
        trim:true
        
    },
    //s add if any error occure
    description:{
        type:String,
        required:[true,"please Enter Product Descriptipn"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product Price"],
        maxLength:[8,"Price Cannot Exceed 8 Characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
      }
     ] ,
    category:{
        type:String,
        required:[true,"please Enter product category"]
    },
    Stock:{
        type:String,
        required:[true,"please Enter product Stock"],
        maxLength:[4,"Stock cannot Exceed 4 chatacter"],
        default:1

    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                require:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      Audio:{
            type:String,
           required:true
      },
    createAt:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model("Product",productSchema);