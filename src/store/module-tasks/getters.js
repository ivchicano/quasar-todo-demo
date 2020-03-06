export function tasksTodo (state) {
    let tasks = {}
    Object.keys(state.tasks).forEach((id) => {
        let task = state.tasks[id]
        if (!task.completed) {
            tasks[id] = task;
        }
    })
    return tasks
}

export function tasksCompleted (state) {
    let tasks = {}
    Object.keys(state.tasks).forEach((id) => {
        let task = state.tasks[id]
        if (task.completed) {
            tasks[id] = task;
        }
    })
    return tasks
}

export function showAddTaskModal (state) {
    return state.showAddTaskModal;
}
