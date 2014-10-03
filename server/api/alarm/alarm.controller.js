'use strict';

var _ = require('lodash');
var Alarm = require('./alarm.model');

// Get list of alarms
exports.index = function(req, res) {
  Alarm.find(function (err, alarms) {
    if(err) { return handleError(res, err); }
    return res.json(200, alarms);
  });
};

// Get a single alarm
exports.show = function(req, res) {
  Alarm.findById(req.params.id, function (err, alarm) {
    if(err) { return handleError(res, err); }
    if(!alarm) { return res.send(404); }
    return res.json(alarm);
  });
};

// Creates a new alarm in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Alarm.create(req.body, function(err, alarm) {
    if(err) { return handleError(res, err); }
    return res.json(201, alarm);
  });
};

// Updates an existing alarm in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Alarm.findById(req.params.id, function (err, alarm) {
    if (err) { return handleError(err); }
    if(!alarm) { return res.send(404); }
    var updated = _.merge(alarm, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, alarm);
    });
  });
};

// Deletes a alarm from the DB.
exports.destroy = function(req, res) {
  Alarm.findById(req.params.id, function (err, alarm) {
    if(err) { return handleError(res, err); }
    if(!alarm) { return res.send(404); }
    alarm.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}