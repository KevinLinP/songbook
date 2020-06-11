import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');

Tasks.schema = new SimpleSchema({
  text: {type: String},
  checked: {type: Boolean, defaultValue: false},
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  }
});
Tasks.attachSchema(Tasks.schema);

Tasks.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc, fields, modifier) {
    return true;
  },
  remove(userId, doc) {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish('tasks', function () {
    return Tasks.find();
  });
}