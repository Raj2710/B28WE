const bcrypt = require('bcryptjs');


const hashing = async(value)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        //console.log(salt);
        const hash = await bcrypt.hash(value,salt);
        return hash
    } catch (error) {
            return error
    }
}

const hashCompare = async(value,hash)=>{
    try {
        return await bcrypt.compare(value,hash);
    } catch (error) {
        return error
    }
}

const role = async(req,res,next)=>{
    switch(req.body.role){
        case 1: console.log('Admin');
                next();
                break;
        case 2: console.log('Student');
                next();
                break;
        default: res.send({
            statusCode:400,
            message:"Invalid Role. 1- Admin and 2 - Student"
        })
    }
}
const sample = async(req,res,next)=>{
    console.log("Sample Middleware");
    next()
}

module.exports={hashing,hashCompare,role,sample}