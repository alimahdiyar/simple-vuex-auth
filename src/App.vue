<template>
  <div>
    <div v-if="loading" class="ui active inverted dimmer">
        Loading...
    </div>

    <div v-else-if="isAuthenticated">
      Logged in
      <button @click="doLogout()">logout</button>
    </div>

    <form v-else>
      <input type="text"
            name="username"
            v-model="credentials.username"
            placeholder="username" />
            <br />

      <input type="password"
            @keyup.enter="doLogin()"
            name="password"
            v-model="credentials.password"
            placeholder="password" />
            <br />

      <button @click="doLogin()">login</button>
    </form>
    
 </div>
</template>

<script>
export default {
  computed:{
      isAuthenticated(){
          return this.$store.getters.isAuthenticated;
      }
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    doLogin() {
      this.loading = true;
      
      this.$store.dispatch('login', this.credentials)
          .then(() => {
            alert("logged in successfully");
          })
          .catch(error => {
            alert("something went wrong. check your input and connection");
            console.log(error)
          })
          .finally(() => {
            this.loading = false;
          });

    },
    doLogout() {
      this.$store.dispatch('logout');
    }
  },
};
</script>

<style scoped>
</style>
