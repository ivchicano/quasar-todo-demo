<template>
  <q-page
    padding
    class="q-pa-md"
  >
    <no-tasks v-if="Object.keys(tasksTodo).length <= 0" />
    <tasks-todo
      v-else
      :tasksTodo="tasksTodo"
    />
    <tasks-completed
      v-if="Object.keys(tasksCompleted).length > 0"
      :tasksCompleted="tasksCompleted"
    />
    <div class="
      absolute-bottom
      text-center
      q-mb-lg">
      <q-btn
        @click="changeShowAddTaskModal()"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog
      :value="showAddTaskModal"
      @hide="changeShowAddTaskModal()"
      ref="showAddTaskDialog"
    >
      <add-task @close="$refs.showAddTaskDialog.hide()" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { fetchTasks } from '../store/module-tasks/mutations'
export default {
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted', 'showAddTaskModal'])
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks', 'changeShowAddTaskModal'])
  },
  components: {
    'add-task': require('components/Modals/AddTask.vue').default,
    'tasks-todo': require('components/Tasks/TaskTodo.vue').default,
    'tasks-completed': require('components/Tasks/TaskCompleted.vue').default,
    'no-tasks': require('components/Tasks/NoTasks.vue').default
  },
  created () {
    this.fetchTasks();
  }
}
</script>