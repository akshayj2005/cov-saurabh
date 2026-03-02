const {body, validationResult}=require('express-validator');

const contactValidationRules=()=>{
    return [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").trim().isEmail().withMessage("Valid email is required"),
        body("message").trim().isLength({min:10}).withMessage("Message be atleast 10 characters long")
    ];
};

const validate=(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:errors.array()
        });
    }
    next();
};

module.exports={
    contactValidationRules,
    validate
};