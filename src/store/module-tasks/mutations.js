import Vue from 'vue';
import { date } from 'quasar'

export function fetchTasks (state, payload) {
    for (let task of payload) {
        let stateTask = {
            name: task.name,
            completed: task.completed
        }
        if (task.due_date) {
            let dueDate = new Date(task.due_date)
            stateTask = Object.assign(stateTask, {
                dueDate: date.formatDate(dueDate, 'YYYY/MM/DD')
            })
        }
        if (task.due_time) {
            let dueTime = new Date(task.due_time)
            stateTask = Object.assign(stateTask, {
                dueDate: date.formatDate(dueTime, 'HH:mm')
            })
        }
        Vue.set(state.tasks, task.id, stateTask)
    }
}

export function updateTask (state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
}

export function deleteTask (state, id) {
    Vue.delete(state.tasks, id)
}

export function addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
}

export function changeShowAddTaskModal (state) {
    state.showAddTaskModal = !state.showAddTaskModal
}
