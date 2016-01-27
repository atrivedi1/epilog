var Sequelize = require('Sequelize');
var Promise = require('bluebird');
var stories = require('../db/dbModel').Story;
var moments = require('../db/dbModel').Moment;

module.exports = {

  add: function (story){
    return stories.build({
      title: story.title,
      description: story.description
    })
    .save()
    .then(function (results){
      console.log("successfully added a story");
      return results.dataValues;
    })
    .catch(function (error){
      console.error("you dumb: ", error);
    });
  },

  getOne: function (storyId){
    return stories.find({
        where: { id: storyId },
        include: [moments]
      })
      .then(function (result) {
        return result.dataValues;
      })
      .catch(function (error) {
        console.error('Error at getting a story: ', error);
      });
  },

  getAll: function () {
    return stories.findAll({
        include: [moments]
      })
      .then(function (results) {
        var allStories = results.map(function (storyAndMoments) {          
          return storyAndMoments.dataValues;
        });
        return allStories;
      })
      .catch(function (error) {
        console.log('Error at getting all stories: ', error);
      });
  }
  
};