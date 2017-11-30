import { Appointments } from '../imports/api/employees.js';
import { chai, expect  } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

var Phony = Package['csauer:accounts-phony'].Phony;

if (Meteor.isClient) {
describe('Employees', function () {
  beforeEach(function () {
    Meteor.loginWithPhony(Phony.user);
  });

  it('add an employee', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    const promise = new Promise((resolve, reject) => {
      Meteor.call('employees.insert', 'name', 'email', 'monStart', 'monEnd', 'tueStart', 'tueEnd', 'wedStart', 'wedEnd', 'thuStart', 'thuEnd',
    		'friStart', 'friEnd', 'satStart', 'satEnd', 'sunStart', 'sunEnd', function(error, result) {
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
  it('find a specific employeeby appointment ID', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('employees.find', 'gfSRnK7e', function(error, result) {
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
  it('find all employees', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('employees.findAll', function(error, result) {
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
  it('remove a specific employee by employeeID', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('employees.remove', 'gfSRnK7e', function(error, result) {
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
