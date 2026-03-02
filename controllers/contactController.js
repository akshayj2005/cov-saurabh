let msgs=[];

const createContact=(req,res)=>{
    const {name,email,message}=req.body;

const newMsg={
  id:Date.now(),
  name,
  email,
  message,
  createdAt:new Date().toISOString()
};

msgs.push(newMsg);

res.status(200).json({
  success:true,
  message:"Message received successfully.",
  data:newMsg
});
};

const getContacts=(req,res)=>{
    res.json(msgs);
};



const deleteContact=(req,res)=>{
    const {id}=req.params;

    const index=msgs.findIndex(msg=>msg.id===parseInt(id));

    if(index===-1){
        return res.status(404).json({
            success:false,
            message:"Message not found."
        })
    }

    const deletedMsg=msgs.splice(index,1);

    res.json({
        success:true,
        message:"Message deleted successfully.",
        data:deletedMsg[0]
    });
};

module.exports={
    createContact,
    getContacts,
    deleteContact
};