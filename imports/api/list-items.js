import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ListItems = new Mongo.Collection('listitems');

ListItems.schema = new SimpleSchema({
  text: {type: String},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});
ListItems.attachSchema(ListItems.schema);

ListItems.allow({
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

//Meteor.methods({
  //'listitems.insert'({ text }) {
    //ListItems.insert({text}, (error, result) => {
    //});
  //}

  //'listitems.remove'(id) {
    //ListItems.remove(id)
  //}
//});

if (Meteor.isServer) {
  Meteor.publish('listitems', function () {
    return ListItems.find({});
  });
}
