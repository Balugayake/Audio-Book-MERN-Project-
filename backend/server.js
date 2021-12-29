const app =require("./app");
const cloudinary = require("cloudinary");
const connectDatabase=require("./config/database");


//handling Uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting the Server due to Uncaught Exception`);
    process.exit(1)
});

// config

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//connect database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://loaclhost:${process.env.PORT}`)
});



//unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting the Server due to Unhandled Promises`);

    server.close(() =>{
        process.exit(1);
    });
});

