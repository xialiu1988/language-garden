const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;
const superagent=require('superagent');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
require('dotenv').config();
app.set('view engine','ejs');

const pg = require('pg');
const dbaddress = process.env.DATABASE_URL;
const client = new pg.Client(dbaddress);
client.connect();
client.on('error', err => console.log(err));


app.get('/',(req,res)=>{
  res.render('../views/pages/index');

});


app.post('/login',(req,res)=>{
  var name=req.body.username;
  var pwd=req.body.password;

  if(pwd==='123'){
    res.render('../views/pages/garden',{data:name});
  }
  else{
    res.render('../views/pages/error');
  }}
);

app.get('/logout',(req,res)=>{
  res.render('../views/pages/index');

});




app.get('/phrases',getPhrase);
function getPhrase(req,res){




}








app.get('*', (req, res) => {
  res.redirect('/error');
});
app.listen(PORT, () => {
  console.log(`listening port ${PORT}.`);
});
