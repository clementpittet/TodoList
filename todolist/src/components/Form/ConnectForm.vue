<template>
  <form class="form-signin text-center " autocomplete="off" @submit.prevent="login" >
    <p v-if="$route.query.redirect" class="error">
      You need to login first.
    </p>
    <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
    <label for="inputEmail" class="sr-only">Email:</label>
    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="pass" type="password"  id="inputPassword" class="form-control" placeholder="Password" required>      
    <button class="btn btn-lg btn-primary btn-block" type="submit">Connexion</button>
    
    <div v-if="error" class="error mt-2">Email ou Password erroné</div>
  </form>
</template>

<script>
  import auth from '@/auth'
  export default {
    data () {
      return {
        email: '',
        pass: '',
        error: false
      }
    },
    methods: {
      login () {
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
        })
      }
    }
  }
</script>

<style scope>
.error{
  color:#dc3545;
}
.form-signin {
  width: 100%;
  max-width:600px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>