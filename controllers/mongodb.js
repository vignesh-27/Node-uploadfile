var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var Data = require('../models/mongo');

var urlencodedParser = bodyParser.urlencoded({extended:false});

//static get, post, delete function from temporary Object data
module.exports = function(app){

//default Options
app.use(fileUpload());

app.get('/contact', function(req,res){
        res.render('contact');
});

app.post('/contact', (req, res)=>{

    if(req.files){ //condition for value Getting or Not

    var file = req.files.sampleFile;
    var filename = file.name;
    var url = "./uploads/"+filename;
    var item = {sampleFile:filename};
    
    file.mv(url, (err)=>{  //function for file moving to the destination
        
        if(err) throw err;
        var newData = Data(item).save(function(err, data){  //function for storing value in Database
            if(err){
                res.send("Updation Failed Same file already exists");
            }else{
                res.send("File Uploaded Successfully");
            }
        });
    });
}

});

} //module.exports function ended