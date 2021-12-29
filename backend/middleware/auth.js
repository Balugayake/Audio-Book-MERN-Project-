const catchAsyncErrors =require("./catchAsyncErrors")
const ErrorHandler = require("../utils/errorhander");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser= catchAsyncErrors(async(req,res,next) =>{
    const {token} =req.cookies;
if(!token){
    return next(new ErrorHandler("please Login to access this Resource",401));
}
const decodeData = jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById(decodeData.id);

next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };