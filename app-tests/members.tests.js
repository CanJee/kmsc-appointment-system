<<<<<<< HEAD
if (Meteor.isServer) {
=======
if (Meteor.isClient) {
>>>>>>> develop
describe('Members', function () {
  it('create a member', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('members.insert', 'name', 'email', 'password', 'role', function(error, result) {
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
  it('modify members properties', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('members.update', 'name', 'email', 'password', 'role', function(error, result) {
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
  it('remove a member by memberID', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('members.remove', 'gfSRnK7e', function(error, result) {
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
  it('find a specific member by memberID', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('members.find', 'gfSRnK7e', function(error, result) {
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
  it('find all registered members', function () {
    const promise = new Promise((resolve, reject) => {
      Meteor.call('members.findAll', function(error, result) {
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
