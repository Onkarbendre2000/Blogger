module.exports = function (app) {
    var mongoose = require('mongoose');
    const opn = require('opn')
    var bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const delay = require('delay');
const cors = require('cors');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'o.bendre93@gmail.com',
    pass: 'Arrow512'
  }
});

var mailOptions = {
  from: 'o.bendre93@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Your Account Password',
  text: 'That was easy!'
};

const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjR6T5EPnc0A5i
892p0dVoRW7vI7DBPpCW5MecSbfLa0G6TmRVIOo07nNoEg5qVQmwoSseN31OhTi5
Rxnb5Ymq2hMCdEEU2VSdg3X1tC3CEumqCk95V5LMDGfQBg6SPa5jcI1Zoe11v94D
oAtAxiSGI+NTqTycQ8CjyWTwB07pDmiKqZ1ed5oBmVpFmmr40zrHHBerlkrhWdQs
ZvQZeHr6oZdl807jqdF6mq/iuPaXrzkpL/2BNpFlWoS+vhf524C4RNPRoCVbkD3R
H+jYe4+zNzmQ/uuXNKNfcOJ+uhV5v0N249Q29Gf08aNSQ4o+eeeOgUfzQ58BikWw
lGAoSyMBAgMBAAECggEAc/aBK0csPfAiF5MdPevCRjDx7bOKaGSX6iMHxW7xsu41
Gy1rwq4CyJ8FpccVJ93HaQO+DNLaEvc45xWhPvSRxp7k21xXkIgduVTRZTSXPvuR
qmtyMDrLDlJNNIfot2JJRWR9b0g6zuL6udZjx5gx/nbkj9llK5JO8cQqBPMbzxaC
vU8ySPt5liA/hLgPriJLl7A/VZw/Gx5wyUi1yliqPsiG9hmaB0++it9/IEKqksj4
PIbltlt6v4n18e8YNIJIsxrQW13VyuFxqrWD0RlZEat0BdzKyhjRauPCEXxcwcMD
YS1CsfQmfqc8reHZdk5gKf7wc81xR2q9mSr92CeRwQKBgQDYCTNULWn0fHCaPwyv
J4/NbRTGNVpa5Je7ywKYE4hEdEZwaxeVohe/rbqEWkCckCFwh5eNdJVMp9mUkmsZ
0Hzrh8znkfCL7UjcVeOEo8w6lJoUiSn9jhVKW1UpEMkdvDd9zvT2NcxMCillSS5d
mHbc8TdNqBxtM7/viLy8I3bgSQKBgQDBfBPuQLPIlzd+AM2LB+gUCVDxGgiVwy+l
VPK7wyd4AYlZPziKtxSaZW+Zt4095lYGKFiWFK+9E2kdYlhytyWsLWspAcKAjNMn
+NQhKCIDYLBJWej6vGHicSbB9tXS2c6xy1PxQOc0uTNgRGRzRhjrB/NxYdSVUpbN
C5io1gsc+QKBgA6AN5jL35PQkoJX/xL2tdlVHBLd2+3D8Edjrg3lKb1mjJ/ZIGEj
2zI7iAyAPlwD9Kqn/004aRkXHyyw002NSAVLPT7B9gJ+b+iSP05U7E12Ug1U06O4
WMd/7+xsuwMq8hKYxKqOG+NyvyqUSe9wX3IfItYslZPi6Fw8smZyfvU5AoGAaYek
U0GlDVY05RvI//i7AxqltCsP3adM+G8hyXlCsLid0jiiPT5oFWIYAY5UkhtsdgVR
c+IqjATnQyidt0vfV06acQ5NqNGmZdnY0ZDTJGZ7IDbS1NckyF4Q1qArtcooa17M
FPziXiZZODt1Uk48TwzSIdhLG3qlV4bop8W+3/kCgYAuUZoHa0xSIhSgthMQTdkd
P5Zd3tKVuA0hTvxISoeL/FiCeSA1A3/PBlMPbgaITCx0Hd4TBK2Q61reSnXIbils
XJSvcA6aanxLxIFG4QTrRjKGvNkTayY3cm0DKDloKMAie6zrZd/8LxH5p7itTlKx
Eai7tcX6z0WSCnAWDj4NXQ==
-----END PRIVATE KEY-----`;
    var multer = require('multer')
    const upload = multer({ dest: __dirname + '/uploads/images' });
    var cookieParser = require('cookie-parser');
    var titles;
    var fs = require('fs');
    app.use(cookieParser());
    app.use(cors());
    var vis_count = 0;
   mongoose.connect('mongodb+srv://root:root@wtl-t1k6n.mongodb.net/test?retryWrites=true&w=majority')
    var log = new mongoose.Schema({
        username: String,
        password: String,
    });
    var blog = new mongoose.Schema({
        post:String,
        title:String,
        link:String,
        username:String,
        date:String,
        likes:Array,
        views:{type:Number,default:0}
    })
    var users = new mongoose.Schema({
        username:String,
        name:String,
        email:String,
        birth:String,
    })
    var feed = new mongoose.Schema({
        first_visit:String,
        ui:String,
        oe:String,
        add:String
    })
    app.post('/jwt', function (req, res) {
        const payload = {
          sub: "onkar",
          name:"onkar",
          exp: Math.floor(Date.now() / 1000) + (60 * 10000000) 
        };
      
        try {
          const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
          res.set('content-type', 'application/json');
          res.status(200);
          res.send(JSON.stringify({
            token: token
          }));
        } catch (e) {
          res.status(500);
          res.send(e.message);
        }
      });
      app.get('/sitemap',function(req,res){
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
        res.render("sitemap",{isLoggedin:isLoggedin});
      })
    app.get('/profile/:username',function(req,res){
        res.render('profile')
    })
    app.use(bodyParser.json({ limit: '50mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
    var logm = mongoose.model('Login', log);
    var blogg = mongoose.model('Blog',blog);
    var userss = mongoose.model('Users',users);
    var feedb = mongoose.model('Feedback',feed);
    app.get('/',function(req,res){
        res.redirect('/view')
    })
    app.get('/signin', function (req, res) {
        res.clearCookie('userdata');
        res.render('signin',{fail:0});
    })
    app.get('/feedback',function(req,res) {
        res.render('feedback')
    })
    app.get('/homepage', function (req, res) {
        if (req.cookies.userdata) {

            res.render('homepage', data = req.cookies.userdata);
        }
        else {
            res.redirect('/signin');
        }
    })
    app.post('/feed',function(req,res){
        
        var fv = req.body.fv;
        var ui = req.body.uf;
        var oe = req.body.oe;
        var add = req.body.add;
        feedb({first_visit:fv,ui:ui,oe:oe,add:add}).save();
            
            res.render("thank");
    })
    app.get('/register',function(req,res){
        res.clearCookie('userdata');

                userss.find({},function(err,doc){
                    res.render('signup',data = {username:doc});
                })
        })
    app.post('/forgotpass',function(req,res){
        var xx = req.body.user 
        console.log(xx);
        userss.findOne({username:xx},function(err,doc){
            logm.findOne({username:xx},function(err,docc){
                var password = docc.password
                var email = doc.email
                var text = "Thank you for reaching out to us. Here's your accounts password:" + password
                mailOptions.to = email
                mailOptions.text = text
                console.log(email)
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  }); 
            })
        })
        res.redirect('/signin');
    })
    app.post('/succ',function(req,res){
        var username = req.body.user;
        var name = req.body.name;
        var email = req.body.email;
        var birth = req.body.bd;
        var pass = req.body.pass;
        userss({username:username,name:name,email:email,birth:birth}).save();
        logm({username:username,password:pass}).save();
        res.redirect('signin');
    })
    app.get('/view',function(req,res){
        vis_count++;
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
  
       if( blogg.find({},function(err,doc){
            if(err) console.error(err);
            else{
                doc.sort(function(x, y) {
                    if (x.likes.length < y.likes.length) {
                      return 1;
                    }
                    if (x.likes.length > y.likes.length) {
                      return -1;
                    }
                    return 0;
                  });
                   res.render('view',{blog:doc,isLoggedin:isLoggedin,usser:req.cookies.userdata,count:vis_count});
            }
        })
       ){}
       else {res.end("Error");}
    })
    app.get('/forgot',function(req,res){
        logm.find({},function(err,doc){
            res.render('forgot',{users:doc});
        })
    })
    app.get('/post', function (req, res) {
        
        if (req.cookies.userdata) {
            blogg.find({},function(err,doc){
                if(err) console.error(err);
            else{
                res.render('post',data={titles:doc,user:(req.cookies.userdata.username).toString()});
            }
        })
    }
        else {
            res.redirect('/signin');
        }

    })
    app.post('/success', function(req, res) {
        var utc = new Date().toString().substring(4,15).replace(/-/g,'/');
       // console.log(utc);
       blogg({post:req.body.content,title:req.body.title,link:'blog/'+req.body.title.toLowerCase().split(' ').join('-').split('?').join('')+'/',username:req.cookies.userdata.username,date:utc}).save();
       res.redirect('/view')
    });
    app.get('/like/:title/:id',function(req,res){
        (async () => {
            blogg.findOne({link:'blog/'+req.params.title.toLowerCase().split(' ').join('-').split('?').join('')+'/'},function(err,doc){
                console.log("hello");
                 var flag = false;
                 var tt = {user:req.params.id};
                doc.likes.forEach(element => {
                   // console.log(element);
                    if(element.user===tt.user) flag = true;
                });
                if(flag) {
                    doc.likes.remove(tt);
    
                }
                else{ doc.likes.push(tt);}
                
        
                doc.save();
            });
            await delay(5000);
            res.redirect('/blog/'+req.params.title.toLowerCase().split(' ').join('-').split('?').join('')+'/');
        })();
        
        
    })
    app.get('/blog/:title',function(req,res){
        var isLog;
        var isliked = false;
        if (req.cookies.userdata){
            isLog = true;
        }
        else{
            isLog = false;
        }
        blogg.findOneAndUpdate({link:'blog/'+req.params.title+'/'},{$inc : {'views' : 1}}, function(err,doc){
        })
        blogg.find({link:'blog/'+req.params.title+'/'},function(err,doc){
            fs.writeFile('./assets/test.html', doc[0].post, function (err) {
                if (err) throw err;
              }); 
              var uuu="";
            if(isLog) {
                doc[0].likes.forEach(element => {
                 //   console.log(element);
                    if(element.user===req.cookies.userdata.username) isliked = true;
                });
                uuu = req.cookies.userdata.username
            }
            var stt = "Like"
            if(isliked) stt="Dislike"
            console.log(stt);
               res.render('success',{doc:doc[0],isLoggedin:isLog,user:uuu,isliked:isliked,con:stt});
        })
    })
    app.get('/contact',function(req,res){
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
  
        res.render('contact',{isLog:isLoggedin});
    })
    app.get('/aboutus',function(req,res){
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
        res.render('about',{isLoggedin:isLoggedin});
    })
    app.get('/profile',function(req,res) {
        if (req.cookies.userdata){
                userss.findOne({username:req.cookies.userdata.username},function(err,doc){
                    blogg.find({username:req.cookies.userdata.username},function(err,docc){
                        blogg.find({likes:{"$in":[{user:req.cookies.userdata.username}]}},function(err,doccc){
                            res.render('profile',{data:doc,blogs:docc,liked:doccc.length});
                        })
                        
                    })
                })
        }
        else{
                res.render('signin',{fail:0});
        }
    })
    app.get('/term',function(req,res){
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
        res.render('terms',{isLoggedin:isLoggedin});
    })
    app.post('/search',function(req,res){
        var s = req.body.search;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
  
        blogg.find({post:{"$regex":s,"$options":"i"}},function(err,doc){
            if(err) console.error(err);
            else{
                doc.sort(function(x, y) {
                    if (x.likes.length < y.likes.length) {
                      return 1;
                    }
                    if (x.likes.length > y.likes.length) {
                      return -1;
                    }
                    return 0;
                  });
                   res.render('view',{blog:doc,isLoggedin:isLoggedin,usser:req.cookies.userdata,count:0});
            }
        })
    })
    app.get('/liked/:username',function(req,res) {
        var isLoggedin = false;
        if (req.cookies.userdata){
            isLoggedin = true;
        }
        else{
            isLoggedin = false;
        }
  
       if( blogg.find({likes:{"$in":[{user:req.cookies.userdata.username}]}},function(err,doc){
            if(err) console.error(err);
            else{
                doc.sort(function(x, y) {
                    if (x.likes.length < y.likes.length) {
                      return 1;
                    }
                    if (x.likes.length > y.likes.length) {
                      return -1;
                    }
                    return 0;
                  });
                if(isLoggedin)
                res.render('view',{blog:doc,isLoggedin:true,usser:req.cookies.userdata,count:0});
            }
        })
       ){}
       else {res.end("Error");}
    })
    app.post('/signin', function (req, res) {
        logm.findOne({ username: req.body.user, password: req.body.pass }, function (err, doc) {
            if (doc) {
            
                if(req.body.rem==="rem")
                res.cookie('userdata', { username: req.body.user, password: req.body.pass },{maxAge: 2628000000});
                else 
                res.cookie('userdata', { username: req.body.user, password: req.body.pass });
                res.redirect('/view')
            }
            else {
                res.render('signin',{fail:1});
            }
        })
        //  
    });
}
