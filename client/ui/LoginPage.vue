<template lang="pug">
div
  div(v-if='loggedIn')
    .mb-5
      .h3 Currently logged in
    div
      button.btn.btn-secondary.pull-right(@click='logout') logout
  div(v-else)
    .mb-3
      .h3 Login
    form.form(@submit='login')
      .input-group
        input(type='text' v-model='email' readonly=true)

      .input-group
        input(type='password' v-model='password' placeholder='password')

      button(type="submit" class="btn btn-primary") login
</template>

<script>
  const component = {
    data: function() {
      return {
        email: 'kevin.lin.p@gmail.com',
        password: ''
      };
    },
    meteor: {
      loggedIn: function() {
        return !!Meteor.userId();
      }
    },
    methods: {
      login: function(event) {
        event.preventDefault();

        Meteor.loginWithPassword(this.email, this.password, function(error) {
          console.log(error);
        })
      },
      logout: function() {
        Meteor.logout();
      }
    }
  };

  export default component;
</script>
