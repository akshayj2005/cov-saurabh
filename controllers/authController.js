const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const users=[
    {
        id:1,
        email:"admin@cov.com",
        password:bcrypt.hashSync("123456",10),
        role:"admin"
    }
];

const login=(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(u=>u.email===email);

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password."
        });
    };

    const isMatch=bcrypt.compareSync(password,user.password);


    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password."
        });
    };

    const token=jwt.sign(
        {
        id:user.id,
        role:user.role,
        },
        "secret123",
        {expiresIn:"1h"}
    );

    res.json({
        success:true,
        message:"Login successful.",
        token
    });
};

module.exports={
    login
};