import { Appointments } from '../imports/api/appointments.js';
import { chai, expect  } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

var Phony = Package['csauer:accounts-phony'].Phony;

if (Meteor.isClient) {
describe('Appointments', function () {

  beforeEach(function () {
    if (Meteor.isClient) {
      Meteor.loginWithPhony(Phony.user);
    }
  });

  it('create an appointment', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    const promise = new Promise((resolve, reject) => {
      Meteor.call('appointments.insert', 'Thursday, November 2, 2017', 'Thursday, November 2, 2017', '15', '123456', 'Test Employee', '7891011', 'reason', function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return promise.then(function (result) {

    });
  })
  it('cancel appointment', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('appointments.cancel', 'gfSRnK7e', function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return promise.then(function (result) {

    });
  })
  it('find by appointment ID', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('appointments.find', 'gfSRnK7e', function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return promise.then(function (result) {

    });
  })
  it('return all appointments', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('appointments.findAll', function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return promise.then(function (result) {

    });
  })
  it('find user specific appointments', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('appointments.findUserAppointments', function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return promise.then(function (result) {

    });
  })
})
}
