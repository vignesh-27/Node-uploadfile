var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');


//Database connection
mongoose.connect('mongodb://localhost/filedb');

//Create a schema-this is like a Blue print (like data types)
var todoSchema = new mongoose.Schema({
    sampleFile: { type: String, unique: true }
});

//Model Creation
var Data = mongoose.model('Data', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});

//static get, post, delete function from temporary Object data
module.exports = function(app){

//default Options
app.use(fileUpload());

app.get('/', function(req,res){
        res.render('upload');
});


app.post('/upload', (req, res)=>{

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
                console.log(data);
                res.send("File Uploaded Successfully");
            }
        });
    });
}

});

} //module.exports function ended
