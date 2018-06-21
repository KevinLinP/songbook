import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const ListItems = new Mongo.Collection('listitems');

ListItems.schema = new SimpleSchema({
  text: {type: String},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});

ListItems.methods = {
  insert: new ValidatedMethod({
    name: 'listitems.insert',
    validate: ListItems.schema.validator({clean: true}),
    run({ text }) {
      ListItems.insert({
        text
      });
    }
  })
};

if (Meteor.isServer) {
  Meteor.publish('listitems', function () {
    return ListItems.find({});
  });
}
