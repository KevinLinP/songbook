<template lang="pug">
  div
    ul
      li(v-for='item in listItems')
        button(@click.prevent="remove(item)") delete
        |
        | {{ item.text }}

    form(@submit.prevent='create')
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
      create() {
        ListItems.insert({
          text: this.text
        });
      },
      remove(item) {
        ListItems.remove(item._id)
      }
    }
  }
</script>
