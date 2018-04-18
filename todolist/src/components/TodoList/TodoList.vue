<template>
  <div>
    <form action="#" @submit.prevent="addTask()">
      <div class="form-group">
        <label for="title">Titre de la tâche</label>
        <input class="form-control" type="text" name="title" id="title" v-model="newTodo.name" required> 
      </div>
      <div class="form-group">
        <label for="inputState">Catégorie</label>
        <select id="inputState" class="form-control" v-model="newTodo.category">
          <option selected value="Privé">Privé</option>
          <option value="Pro">Pro</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
    <div class="alert alert-secondary mt-4" role="alert">
      {{ remaining }} tâche(s) à faire
    </div>
    <div class="list-group mt-4">
      <transition-group name="list" tag="div" class="card-deck">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="task in tasks" v-bind:key="task['.key']" >
          <div class="card mb-4 " :class="{'disabled': task.completed, 'completed': task.completed}">
            <div class="card-header">
              {{ task.category }}
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ task.title }}<span v-if="task.completed"> - Fait</span></h5>
              <p class="card-text">{{task.date}}</p>
              <div class="wrapper-actions">
                <label class="custom-control material-checkbox">
                  <input type="checkbox" class="material-control-input" v-model="task.completed">
                  <span class="material-control-indicator"></span>
                  <span class="material-control-description">Complete</span>
                </label>
                <button class="btn btn-danger" @click="removeTask(task)" >Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import db from '@/firebase'
import utils from '@/utils'
let taskRef = db.ref('todos')

export default {
  firebase: {
    tasks: taskRef.orderByChild('order')
  },
  data () {
    return {
      newTodo : {
        name: '',
        category : 'Privé',
        completed : false,
        date: '',      
        order: ''
      }
    }
  }, 
  methods: {
    addTask () {
      taskRef.push({
        title : this.newTodo.name,
        category : this.newTodo.category,
        completed : false,
        date: new Date().getDate() + ' ' + utils.getMonthByDate(new Date()),
        order : (this.tasks.length + 1) * -1
      })
      this.newTodo.name = ''
    },
    removeTask: function (task) {
      taskRef.child(task['.key']).remove()
    }

  },
  computed : {
    remaining: function () {
      return this.tasks.filter(task => !task.completed).length
    }
  }
}
</script>
<style>
.wrapper-actions{
  display:flex;
  align-items:center;
}
.wrapper-actions label{
  margin-right:1rem;
}
.card{
  transition:opacity .5s;
}
.card.completed{
  opacity:.5;
  transition:opacity .5s;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.custom-control.material-checkbox {
  color: #333;
}
.custom-control.material-checkbox .material-control-input {
  display: none;
}
.custom-control.material-checkbox .material-control-input:checked ~ .material-control-indicator {
  border-color: #26a69a;
  -webkit-transform: rotateZ(45deg) translate(1px, -5px);
          transform: rotateZ(45deg) translate(1px, -5px);
  width: 10px;
  border-top: 0px solid #fff;
  border-left: 0px solid #fff;
}
.custom-control.material-checkbox .material-control-indicator {
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 0;
  width: 16px;
  height: 16px;
  border: 2px solid #aaa;
  transition: .3s;
}
</style>


