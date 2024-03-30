if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
if (localStorage.getItem('doneTasks')) {
    doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
}
if (localStorage.getItem('tasksQuanity')) {
    tasksQuanity = JSON.parse(localStorage.getItem('tasksQuanity'));
}
if (localStorage.getItem('doneTasksQuanity')) {
    doneTasksQuanity = JSON.parse(localStorage.getItem('doneTasksQuanity'));
}

tasks.forEach(function (task) {
    const taskHtml = 
                    `
                    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item open-modal-btn">
                        <span class="task-name-info"><span class="add-date-time">${task.addTime}<br>${task.addDate}</span><span class="task-info-text">${task.text}</span></span>
                            <div class="task-item__buttons">
                                <button onclick="showToast(doneTaskMsg)" type="button" data-action="done" class="btn-action btn-done">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button onclick="showToast(removeTaskMsg)" type="button" data-action="delete" class="btn-action btn-remove">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>
                    `;
    
    // добавить разметку в html документ
    tasksList.insertAdjacentHTML('beforeend', taskHtml);

    
});

doneTasks.forEach(function (doneTasks) {
    const doneTaskHtml = 
    `
    <li id="${doneTasks.id}" class="list-group-item d-flex justify-content-between task-item open-modal-btn">
        <span class="task-name-info"><span class="add-date-time">${doneTasks.addTime}<br>${doneTasks.addDate}</span><span class="task-info-text">${doneTasks.text}</span></span>
        <div class="task-item__buttons">
            <button onclick="showToast(returnDoneTaskMsg)" type="button" data-action="return" class="btn-action btn-return">
                <img src="./img/return.svg" alt="Done" width="18" height="18">
            </button>
            <button onclick="showToast(removeDoneTaskMsg)" type="button" data-action="delete" class="btn-action btn-remove">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>
    `;
    // добавить html код с информацией о выполненной задаче в соотв. список                   
    doneTasksList.insertAdjacentHTML('beforeend', doneTaskHtml);
});

Object.values(tasksQuanity).forEach(function (quanity) {
    tasksInfo.innerHTML = `Количество задач: ${(quanity)}`;
    if (quanity === 0) {
        tasksInfo.innerHTML = `Список задач пуст`;
    }
});

