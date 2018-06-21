import { Meteor } from 'meteor/meteor';
import { ListItems } from './list-items.js';

export const insert = new ValidatedMethod({
  name: 'listitems.insert',
  validate: ListItems.schema.validator(),
  run({ text }) {
    ListItems.insert(list);
  }
});
