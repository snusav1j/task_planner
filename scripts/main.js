const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const doneTasksList = document.querySelector('#doneTasksList');
const emptyList = document.querySelector('#emptyList');
const tasksInfo = document.querySelector('.tasks-info'); // Список дел (кол-во)

const button = document.getElementById('addButton'); // добавить задачу

// переменные с данными (список выполненных и список актуальных задач)
let tasks = [];
let doneTasks = [];

let tasksQuanity = {
    number: 0
};
let doneTasksQuanity = 0;

if (tasksQuanity.number === 0) {
    tasksInfo.innerHTML = `Список задач пуст`;
}



// вызов функции по событию
form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

doneTasksList.addEventListener('click', returnTask);

doneTasksList.addEventListener('click', deleteDoneTask);

// функции приложения 
function addTask(e) {
    e.preventDefault();

    // дата добавления задачи
    const date = new Date();
    dateDMY = `${date.getDate()}.0${date.getMonth()+1}.${date.getFullYear()}`; // дата в формате дд.мм.гггг
    dateMinutes = date.getMinutes()
    if (dateMinutes < 9) {
        dateMinutes = `0${dateMinutes}`
    }
    dateTime = `${date.getHours()}:${dateMinutes}` // время в формате hh:mm (по МСК)

    // получить значения задачи из инпута
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        addDate: dateDMY,
        addTime: dateTime
    };

    tasks.push(newTask);

    // добавить задание в разметку html
    const taskHtml = 
                    `
                    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item open-modal-btn">
                        <span class="task-name-info"><span class="add-date-time">${newTask.addTime}<br>${newTask.addDate}</span><span class="task-info-text">${newTask.text}</span></span>
                            <div class="task-item__buttons">
                                <button onclick="showToast(doneTaskMsg)" type="button" data-action="done" class="btn-action btn-done">
                                    <img src="img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button onclick="showToast(removeTaskMsg)" type="button" data-action="delete" class="btn-action btn-remove">
                                    <img src="img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>
                    `;
    
    // добавить саму разметку в html документ
    tasksList.insertAdjacentHTML('beforeend', taskHtml);

    // количество задач для их отображения
    tasksQuanity.number += 1;
    tasksInfo.innerHTML = `Количество задач: ${(tasksQuanity.number)}`;

    // очистить инпут и сделать фокус на нем
    taskInput.value = "";
    taskInput.focus();

    saveToLocalStorage();
};

function deleteTask(e){
    if (e.target.dataset.action !== 'delete') return;

    const parentElem = e.target.closest('li.list-group-item');

    // получить id задачи из массива
    const id = Number(parentElem.id);
    const index = tasks.findIndex((task) => task.id === id);

    // удалить задачу из массива
    tasks.splice(index, 1);

    // удалить элемент с задачей из html документа
    parentElem.remove();
    
    // количество задач для их отображения
    tasksQuanity.number -= 1;
    tasksInfo.innerHTML = `Количество задач: ${(tasksQuanity.number)}`;

    if (tasksQuanity.number === 0) {
        tasksInfo.innerHTML = `Список задач пуст`;
    }

    saveToLocalStorage();
};

function doneTask(e){
    // если нажата кнопка выполнено:
    if (e.target.dataset.action !== "done") return;

    const parentElem = e.target.closest('li.list-group-item');
    
    // поиск индекса в массиве по айди 
    const id = Number(parentElem.id);
    const index = tasks.findIndex((task) => task.id === id);

    //записать данные о выполненной задаче в массив
    doneTasks.push(tasks[index])

    // данные выполненной задачи
    const doneTaskText = tasks[index]

    //удалить выполненную задачу из массива задач
    tasks.splice(index, 1);

    const doneTaskHtml = 
                        `
                        <li id="${doneTaskText.id}" class="list-group-item d-flex justify-content-between task-item open-modal-btn">
                            <span class="task-name-info"><span class="add-date-time">${doneTaskText.addTime}<br>${doneTaskText.addDate}</span><span class="task-info-text">${doneTaskText.text}</span></span>
                            <div class="task-item__buttons">
                                <button onclick="showToast(returnDoneTaskMsg)" type="button" data-action="return" class="btn-action btn-return">
                                    <img src="img/return.svg" alt="Done" width="18" height="18">
                                </button>
                                <button onclick="showToast(removeDoneTaskMsg)" type="button" data-action="delete" class="btn-action btn-remove">
                                    <img src="img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                        </li>
                        `;
    // добавить html код с информацией о выполненной задаче в соотв. список                   
    doneTasksList.insertAdjacentHTML('beforeend', doneTaskHtml);

     // удалить элемент с задачей из html документа
    parentElem.remove();

    // количество задач для их отображения
    tasksQuanity.number -= 1;
    doneTasksQuanity.number += 1;
    tasksInfo.innerHTML = `Количество задач: ${(tasksQuanity.number)}`;

    if (tasksQuanity.number === 0) {
        tasksInfo.innerHTML = `Список задач пуст`;
    }

    saveToLocalStorage();
};

function returnTask(e){
    // если нажата кнопка вернуть задачу в работу:
    if (e.target.dataset.action !== "return") return;

    const parentElem = e.target.closest('ul#doneTasksList > li.list-group-item');
    const buttonElem = e.target.closest('.task-item__buttons > .btn-return');
    

   
    // console.log(buttonElem)

    // поиск индекса в массиве по айди в списке выполненных задач
    const id = Number(parentElem.id);
    const buttonRemoveElem = document.getElementById(`${id}`);
    const a = buttonRemoveElem.querySelector('.task-item__buttons > .btn-remove').setAttribute('onclick', 'showToast(removeTaskMsg)')
    const index = doneTasks.findIndex((task) => task.id === id);

    // вернуть данные в массив задач
    tasks.push(doneTasks[index])

    // удалить выполненную задачу из массива задач
    doneTasks.splice(index, 1);

    // добавление кнопки для возможности возврата задач
    buttonElem.outerHTML = 
                            `
                            <button onclick="showToast(doneTaskMsg)" type="button" data-action="done" class="btn-action btn-done">
                                <img src="img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            `;
    
    tasksList.append(parentElem);

    // количество задач для их отображения
    tasksQuanity.number += 1;
    doneTasksQuanity.number -= 1;
    tasksInfo.innerHTML = `Количество задач: ${(tasksQuanity.number)}`;

    saveToLocalStorage();
};

function deleteDoneTask(e) {
    if (e.target.dataset.action !== 'delete') return;

    const parentElem = e.target.closest('ul#doneTasksList > li.list-group-item');

    // поиск индекса в массиве по айди в списке выполненных задач
    const id = Number(parentElem.id);
    const index = doneTasks.findIndex((task) => task.id === id);

    // удалить выполненную задачу из массива задач
    doneTasks.splice(index, 1);
    
     // удалить элемент с задачей из html документа
    parentElem.remove();

    doneTasksQuanity.number -= 1;

    saveToLocalStorage();
};

// сохранение в local storage

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    localStorage.setItem('tasksQuanity', JSON.stringify(tasksQuanity));
    localStorage.setItem('doneTasksQuanity', JSON.stringify(doneTasksQuanity));  
}


handleClick = function() {
	let alreadySet = button.classList.contains('added');
	
	if (taskInput.value !== "") {
		button.classList.add('added');
		setTimeout(function(){ button.classList.remove('added'); }, 1400);
	}
}