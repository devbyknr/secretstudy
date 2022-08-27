//xpBWZNIcIU6tT1de mongodb
const { BBSListDB,BBSCount }  = require('./models/BBSListDB');
const SubUtils  = require('./utils/subUtils')
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const port = 7040

const mongoose = require('mongoose');
const config = require('./config/key');

mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB connected...')).catch(err => console.log(err))
const db = mongoose.connection;
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());


app.get('/api/find_all', (req, res) => {
  BBSListDB.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.post('/api/getcnt',(req,res)=>{
  BBSCount.find({}).then((data)=>{
    res.status(200).send(data);
  }).catch((err)=>{
    console.log("catch"); 
    res.status(500).send(err);
  });

});
app.post('/api/test',(req,res)=>{
  body = req.body;
  let bbsDB = new BBSListDB(body);
  console.log("bbsDB",bbsDB);

  BBSCount.find({}).then((data)=>{
    res.status(200).send(data);
  }).catch((err)=>{
    console.log("catch"); 
    res.status(500).send(err);
  });

  res.status(200).send("OK");
})

app.post('/api/write',(req,res) =>{
  // _id: { type: Number, required: true, unique: true },
  // title: { type: String, required: true },
  // date: { type: String },
  // views: { type: Number }
  var today = SubUtils.getToday();
  //console.log('today',today,typeof(today));
  console.log(req.query);

   //let body = req.query; //get
   let body = req.body;   //post

  let bbsDB = new BBSListDB(body);
  let bbsCount = 0;
  
  BBSCount.find({}).then((data)=>{
    bbsCount = data.count;
  }).catch((err)=>{
    res.status(500).send(err);
  });

  bbsCount._id = bbsCount;

  bbsDB
    .save(body)
    .then(() => {
      console.log(bbsDB);
      res.send("write success");
    })
    .catch((err) => {
      console.log(err);
      errMsg = "fail";
      if(err.toString().indexOf("duplicate")>-1){
        errMsg = "dup key err";
      }
      res.status(500).send(errMsg);
    });
  //res.send("ok");
})


app.get('/api/getCount',(req,res)=>{
  BBSListDB.countDocuments({},(err,cnt)=>{
    res.json({"count":cnt});
  });
})

app.get('/api/getTotal',(req,res)=>{
  console.log(db.BBSList);
  res.send("ok");
  //db.BBS.find({}).then(data=>res.send(data));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



