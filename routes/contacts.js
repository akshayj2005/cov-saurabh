const express = require("express");
const router = express.Router();
const fs=require("fs");
const path=require("path");


router.post("/", (req, res) => {
  console.log(req.body);

  const newMsg={
    ...req.body,
    createdAt:new Date().toISOString()
  };

  const filePath=path.join(__dirname,"../data/contact.json");

  const existing=JSON.parse(fs.readFileSync(filePath,"utf-8"));
  existing.push(newMsg);

  fs.writeFileSync(filePath,JSON.stringify(existing,null,2));

  res.status(201).json({
    success:true,
    message:"contact msg saved."
  });
//   res.json({
//     success:true,
//     message:"Form data received",
//     data:req.body
//   })
});

module.exports=router;