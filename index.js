const express = require("express");
const path = require("path");
const app = express();
const fs=require("fs");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get("/", function(req, res){
    fs.readdir("./files", function(err, files){
        res.render("index",{files: files});
    });
});

app.get('/files/:filename',function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        res.render("show",{filename:req.params.filename,filedata:filedata});
    });
});

app.get('/edit/:filename',function(req, res){
    res.render("edit",{filename:req.params.filename});
});

app.post("/create",function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    });
    // console.log(req.body);
});

app.post("/edit",function(req, res){
   fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect("/");
   })
    // console.log(req.body);
});

app.get("/delete/:filename",function(req,res,next){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect("/")
    });
});

app.listen(3000);