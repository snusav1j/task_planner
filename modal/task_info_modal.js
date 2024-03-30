const modal = document.getElementById('myModal');

tasksList.addEventListener('dblclick', openTaskModal);
window.addEventListener('click', closeModalOut)

function openTaskModal(e){
    const taskModal = e.target.closest('li.list-group-item');

    // узнать статус задачи по id
    const taskStatus = taskModal.closest('ul').id
    let status = '';
    let statusClass = '';
    if (taskStatus == 'tasksList'){
        status = 'Задача в работе';
        statusClass = 'in-process'
    }

    // найти по индексу с помощью id 
    const id = Number(taskModal.id);
    const index = tasks.findIndex((task) => task.id === id);

    let modalInfo = 
    `<div id="${id}" class="modal-content">
    
    <span class="close-modal-btn"><img src="img/close.svg" alt="Done" width="28" height="28"></span>
        <div class="modal-content-header">
            <span class="modal-task-id">Задача №${id}</span>
        </div>
        <div class="modal-task-info">
            <span class="modal-task-num">Информация о ${index+1}-ой задаче в списке:</span>
            <span class="modal-task-text">Текст задачи: ${tasks[index].text}</span>
            <span class="modal-task-date">Создано ${tasks[index].addDate} в ${tasks[index].addTime}</span>
            <span class="modal-task-status ${statusClass}">Статус задачи: ${status}</span>
        </div>
        
    </div>
    `;

    modal.innerHTML = modalInfo;
    modalContent = document.getElementsByClassName('modal-content')[0];
    
    //появление модального с классом
    modal.style.display = "block";
    modalContent.classList.add('show-modal');
    
    // кнопка закрыть модальное окно
    closeBtn = document.getElementsByClassName('close-modal-btn')[0];
    closeBtn.addEventListener('click', closeModal)
}

function closeModal() {
    modalContent = document.getElementsByClassName('modal-content')[0];
    
    modalContent.classList.remove('show-modal');
    modalContent.classList.add('hide-modal');

    setTimeout(() => {
        modal.style.display = "none";
        modalContent.remove();
    }, 400)
    
}

function closeModalOut(e) {
    if (e.target == modal) {
        modalContent = document.getElementsByClassName('modal-content')[0];

        modalContent.classList.remove('show-modal');
        modalContent.classList.add('hide-modal');
    
        setTimeout(() => {
            modal.style.display = "none";
            modalContent.remove();
        }, 400)
    }
}