<template lang="pug">
  div
    ul
      li(v-for='item in listItems') {{ item.text }}

    form(@submit='createListItem')
      input.mr-3(type='text' v-model='text')
      button(type="submit") create
</template>

<script>
  import { Mongo } from 'meteor/mongo';
  import { ListItems } from '/imports/api/list-items.js';

  export default {
    data: function() {
      return {
        text: ''
      }
    },
    meteor: {
      $subscribe: {
        'listitems': []
      },
      listItems () {
        return ListItems.find({});
      }
    },
    methods: {
      createListItem: function(evt) {
        evt.preventDefault();
        Meteor.call('listitems.insert', {
          text: this.text
        });
      }
    }
  }
</script>
