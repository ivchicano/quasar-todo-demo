import Vue from 'vue'
import { uid } from 'quasar'

const state = {
    tasks: {
        'ID1': {
            name: 'Go to shop',
            completed: false,
            dueDate: '2020/02/29',
            dueTime: '00:00'
        },
        'ID2': {
            name: 'Get bananas',
            completed: false,
            dueDate: '2020/03/01',
            dueTime: '18:30'
        },
        'ID3': {
            name: 'Get apples',
            completed: false,
            dueDate: '2020/02/27',
            dueTime: '16:00'
        },
    },
    showAddTaskModal: false
}

const mutations = {
    updateTask (state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask (state, id) {
        Vue.delete(state.tasks, id)
    },
    addTask (state, payload) {
        Vue.set(state.tasks, payload.id, payload.task)
    },
    changeShowAddTaskModal (state) {
        state.showAddTaskModal = !state.showAddTaskModal
    }
}

const actions = {
    updateTask ({ commit }, payload) {
        commit('updateTask', payload)
    },
    deleteTask ({ commit }, id) {
        commit('deleteTask', id);
    },
    addTask ({ commit }, task) {
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        commit('addTask', payload)
    },
    changeShowAddTaskModal ({ commit }) {
        commit('changeShowAddTaskModal')
    }
}

const getters = {
    tasksTodo: (state) => {
        let tasks = {}
        Object.keys(state.tasks).forEach((id) => {
            let task = state.tasks[id]
            if (!task.completed) {
                tasks[id] = task;
            }
        })
        return tasks
    },
    tasksCompleted: (state) => {
        let tasks = {}
        Object.keys(state.tasks).forEach((id) => {
            let task = state.tasks[id]
            if (task.completed) {
                tasks[id] = task;
            }
        })
        return tasks
    },
    showAddTaskModal: (state) => {
        return state.showAddTaskModal;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}