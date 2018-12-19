const express=require('express');
const app=express();

const PORT=process.env.PORT||3000;


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


const {Translate} = require('@google-cloud/translate');
const projectId ='language-garden';
const translate = new Translate({
  projectId: projectId,
});




app.get('/',(req,res)=>{
  res.render('../views/pages/index');

});


app.post('/login',(req,res)=>{
  var name=req.body.username;
  var pwd=req.body.password;
  console.log(pwd);
  return client.query(`SELECT username,pw from users WHERE username='${name}';`,function(err,result){
    console.log(result.rows);
    result.rows.forEach(item=>{
      if(name===item.username&& pwd===item.pw){
        res.render('../views/pages/garden',{data:name});
      }
      else{
        res.render('../views/pages/error');
      }
    });
    res.render('../views/pages/error');
  }
  );
});

app.get('/signup',dosignup);
function dosignup(req,res){
  res.render('../views/pages/signup');

}



app.post('/signup',filloutform);
function filloutform(req,res){

  var name=req.body.user;
  var pwd=req.body.pw;
  console.log(name,pwd);
  let SQL = 'INSERT INTO users (username,pw) values ($1,$2)';
  let values = [name,pwd];
  client.query(SQL, values,(err,result)=>{
    if (err) {
      console.error(err);
      res.redirect('/error');
    }

    else{
      res.render('../views/pages/index');
    }
  });

}







app.get('/logout',(req,res)=>{
  res.render('../views/pages/index');

});



var textgroup=['Thanks so much!','how are you','Good Morning!','Good afternoon!','what is your hobby?','what is going on?','can you do me a favor?','where is restroom?','do you know...?','Really awesome!','sorry i cannot..','what is your name?','what language you speak?','do you want a drink?'];
var languages=[['af','Afrikaans'],['sq','Albanian'],['ar','Arabic'],['zh-CN','Chinese Simplified'],['nl','Dutch'],['fr','French'],['de','German'],['el','Greek'],['hi','Hindi'],['it','Italian'],['ja','Japanese'],['ko','Korean'],['ms','Malay'],['pt','Portugese'],['ru','Russian'],['es','Spanish'],['tr','Turkish'],['sw','Swahili'],['sv','Swedish']];
app.get('/phrases',getphrases);
function getphrases(req,res){

  res.render('../views/pages/phrase',{textarr:textgroup,langs:languages});
}











app.get('*', (req, res) => {
  res.redirect('/error');
});
app.listen(PORT, () => {
  console.log(`listening port ${PORT}.`);
});
