var fs = require('fs');
var path = require('path');
var tempStorage = '/../temp_storage';
var Promise = require('bluebird');
var momentModel = require('./momentModel');

module.exports =  {

  addMoment: function (req, res){
    //Define Variables
    //momentData --> location within request object, where header information lives
    var momentData = JSON.parse(req.headers.momentdata);
    //uniqueMomentIdentifier --> creates unique identifier for each moment based on data provided (NOTE: this is temporary);
    var uniqueMomentIdentifier = momentData.caption.split(" ").join("")+momentData.storyid;
    //filePath --> temp location in file tree where we will dump images
    var filePath = path.join(__dirname, tempStorage + "/" + uniqueMomentIdentifier + ".jpeg");

    //check to see if file path exists...
    fs.stat(filePath, function (err, file){
      //if filepath already exists, end response 
      if(file && file.isFile()){
        res.end('image already exists');
      }
      //otherwise...
      else {
        //define moment object that contains info related to moment
        var moment = {
          url: filePath,
          caption: momentData.caption,
          storyid: momentData.storyid
        }
        //open up fileStream on filePath 
        var writeStream = fs.createWriteStream(
          filePath,
          {flags: 'ax', encoding: 'base64'}
        );

        //add each of the incoming data chunks from the client to the filepath specified above
        req.on('data', function (chunk){
            writeStream.write(chunk);
          });
        //once the data has been received, call the add method in the momentModel to input the moment data into the database
        req.on('end', function (){
          momentModel.add(moment)
            .then(function (results){
              res.status(201).json(results);
            })
            .catch(function (error){
              res.status(404).json();
            });
        });
      }
    });
  },

  getAllMoments: function (req, res) {
    var storyId = req.params.storyId;
    momentModel.getAll(storyId)
      .then(function (results) {
        res.status(200).json(results);
      })
      .catch(function (error) {
        res.status(404).json();
      });
  }
};