import { uid } from "quasar";
import { axiosInstance } from "../../boot/axios"
import { date } from 'quasar'

export function fetchTasks ({ commit }) {
    axiosInstance.get("/todo").then(response => {
        commit('fetchTasks', response.data)
    }).catch(error => {
        handleError(error)
    })
}

export function updateTask ({ commit }, payload) {
    let axiosPayload = {
    }
    if (payload.updates.name) {
        axiosPayload = Object.assign(axiosPayload, { name: payload.updates.name })
    }
    if (payload.updates.completed) {
        axiosPayload = Object.assign(axiosPayload, { completed: payload.updates.completed })
    }
    if (payload.updates.dueDate) {
        axiosPayload = Object.assign(axiosPayload, { due_date: date.formatDate(payload.updates.dueDate, 'YYYY-MM-DD') })
    }
    if (payload.updates.dueTime) {
        axiosPayload = Object.assign(axiosPayload, { due_time: payload.updates.dueTime })
    }
    console.log(axiosPayload)
    axiosInstance.patch("/todo?id=eq." + payload.id, axiosPayload).then(response => {
        commit('updateTask', payload)
    }).catch(error => {
        handleError(error)
    })
}

export function deleteTask ({ commit }, id) {
    axiosInstance.delete("/todo?id=eq." + id).then(response => {
        commit('deleteTask', id);
    }).catch(error => {
        handleError(error)
    })
}

export function addTask ({ commit }, task) {
    let taskId = uid()
    let axiosPayload = {
        id: taskId,
        name: task.name,
        completed: task.completed,
        due_date: date.formatDate(task.dueDate, 'YYYY-MM-DD'),
        due_time: task.dueTime
    }
    axiosInstance.post("/todo", axiosPayload).then(response => {
        let mutationPayload = {
            id: taskId,
            task: task
        }
        commit('addTask', mutationPayload)
    }).catch(error => {
        handleError(error)
    })
}

export function changeShowAddTaskModal ({ commit }) {
    commit('changeShowAddTaskModal')
}

function handleError (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}