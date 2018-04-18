<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand mr-auto mr-lg-0" href="#">Todo List</router-link>
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto ml-4">     
          <li class="nav-item">
            <router-link v-if="loggedIn" to="/logout" class="nav-link">Log out</router-link>
            <router-link v-if="!loggedIn" to="/login" class="nav-link">Log in</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main role="main" class="container mt-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import auth from '@/auth'
export default {
  name: 'App',
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>

<style>
html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 56px;
}

</style>
