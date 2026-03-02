const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

let refreshTokens=[];

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
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );

    const refreshToken=jwt.sign(
        {id:user.id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    );

    refreshTokens.push(refreshToken);

    res.json({
        success:true,
        message:"Login successful.",
        token,
        refreshToken
    });
};


// LOGIN:
// User → send credentials
// Server → gives Access + Refresh token
// Server → stores refresh token

// REFRESH:
// User → sends refresh token
// Server → verifies refresh token
// Server → gives new Access token

const refreshTokenController=(req,res)=>{
    const {token}=req.body;
    if(!token || !refreshTokens.includes(token)){
        return res.status(403).json({
            success:false,
            message:"Invalid Refresh token."
        });
    };

    try{
        const decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET);

        const newAccessToken=jwt.sign(
            {id:decoded.id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.json({
            success:true,
            accessToken:newAccessToken
        });
    } catch(err){
        next(err);
    }
};

const logout=(req,res)=>{
    const {token}=req.body;
    refreshTokens=refreshTokens.filter(t=>t!==token);
    res.json({
        success:true,
        message:"Logged out successfully."
    });
};

module.exports={
    login,
    refreshTokenController,
    logout
};




