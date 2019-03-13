var express= require('express');
var cors=require('cors');
var mongoose=require('mongoose');
var bodyparser=require('body-parser')
var cors=require('cors')

var app=express();

mongoose.connect('mongodb://localhost:27017/paging',{useNewUrlParser:true})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(cors());


//schema//
const userschema=mongoose.Schema({
    name :String
})

var useers=module.exports= mongoose.model('user',userschema)


app.post('/save',(req,res)=>{
 console.log('working')
 var usr=new useers({
     name:req.body.name
 })
 usr.save((err,data)=>{
     if(err) {res.json({success:false})}
     res.json({success:true})
 });
})

app.get('/getname/:page',(req,res)=>{
    var size=10;
    var query={};
    let start=size*req.params.page-size;
    let end=start+size;
    
    useers.find({},{},query,function(err,data){
      if(err) res.json({success:false})
      else{
          res.json({
              totalItems:data.length,
              users:data.slice(start,end)
            });
      }
    })
})

const port=process.env.PORT || 3000;
app.listen(port,console.log(port));