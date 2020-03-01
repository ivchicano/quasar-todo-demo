<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon
        name="check"
        color="primary"
      />
    </template>
    No tasks to do today!
    <template v-slot:action>
      <q-btn
        @click="changeShowAddTaskModal()"
        flat
        color="primary"
        label="Add Task"
      />
    </template>
  </q-banner>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('tasks', ['changeShowAddTaskModal'])
  },
}
</script>
