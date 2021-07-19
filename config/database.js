const mongoose=require('mongoose')
const config=require('config')
const db=config.get('mongoURI')
mongoose.Promise=global.Promise

mongoose.connect(db,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>{
        console.log('connected to db')
    })
    .catch(()=>{
        console.log('error connecting to db')
    })
module.exports={mongoose}