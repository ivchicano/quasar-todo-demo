<template>
  <q-card>
    <modal-header>Edit task</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section>

        <modal-task-name
          ref="taskModalName"
          :name.sync="taskToSubmit.name"
        />

        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />

        <modal-due-time
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>
      <modal-buttons />
    </form>
  </q-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'id'],
  data () {
    return {
      taskToSubmit: {
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitForm () {
      this.$refs.taskModalName.$refs.name.validate()
      if (!this.$refs.taskModalName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask () {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      this.$emit('close')
    }
  },
  components: {
    'modal-header': require('components/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name': require('components/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date': require('components/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time': require('components/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons': require('components/Modals/Shared/ModalButtons.vue').default
  },
  mounted () {
    this.taskToSubmit = Object.assign({}, this.task);
  }
}
</script>