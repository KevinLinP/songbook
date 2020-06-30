import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

export const Songs = new Mongo.Collection('songs');

// Tasks.schema = new SimpleSchema({
//   text: {type: String},
//   checked: {type: Boolean, defaultValue: false},
//   createdAt: {
//     type: Date,
//     autoValue: function () {
//       if (this.isInsert) {
//         return new Date();
//       } else {
//         this.unset();
//       }
//     }
//   }
// });
// Tasks.attachSchema(Tasks.schema);

// Tasks.allow({
//   insert(userId, doc) {
//     return true;
//   },
//   update(userId, doc, fields, modifier) {
//     return true;
//   },
//   remove(userId, doc) {
//     return true;
//   }
// });

if (Meteor.isServer) {
  Songs._ensureIndex({updatedAt: -1})
  Meteor.publish('songs', function (afterUpdatedAt) {
    return Songs.find({updatedAt: {$gt: afterUpdatedAt}}, {sort: {updatedAt: -1}})
  })

  Meteor.methods({
    songsCountBeforeOrAt(updatedAt) {
      // TODO: could sanitize
      return Songs.find({updatedAt: {$lte: updatedAt}}).count()
    },
  })
}