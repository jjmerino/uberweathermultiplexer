/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var localconf = require('./config/local.env')
var Alarm = require('./api/alarm/alarm.model');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
var sent = 0;
var sentS = {};
var pseudoCron = function(){

  Alarm.find(function (err, alarms) {
    // Twilio Credentials
    if(err) { return handleError(res, err); }

    for(var i = 0; i < alarms.length; i++){
      var alarm = alarms[i];
      // Twilio Credentials
      var accountSid = localconf.TWILIO_ID;
      var authToken = localconf.TWILIO_TOKEN;
      //require the Twilio module and create a REST client
      var client = require('twilio')(accountSid, authToken);
      if(sentS[alarm._id]===true){

         break;
      }
      sentS[alarm._id] = true;
      console.log(alarm);
      client.messages.create({
        to: "+19162848037",
        from: "+14422442379",
        body: "You need to take your uber man!! I wont say this again!"
      }, function(err, message) {
        console.log(message);
        sent++;
      });
      break;
    }

  });


// Check status every minute


// Alert if necesa

}
pseudoCron();
setInterval(pseudoCron,1000);

// Expose app
exports = module.exports = app;