Messages = new Mongo.Collection("messages");


if (Meteor.isClient) {

  Template.body.helpers({
    messages: function() {
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .form-yo": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var name = event.target[0].value;

      // Add a message to the log
      Meteor.call("addMessage", name);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addMessage: function (name) {
    Messages.insert({
      name: name,
      createdAt: new Date()
    });
  },
  deleteMessages: function() {
    Messages.remove({})
  }
});

