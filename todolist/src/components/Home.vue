<template>
  <div class="component home">
    <TodoList></TodoList>
  </div>
</template>

<script>
import auth from '@/auth'
import TodoList from '@/components/TodoList/TodoList'

export default {
  name: 'Home',
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  components: {
    TodoList
  }
}
</script>

<style>
</style>
