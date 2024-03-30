const modal = document.getElementById('myModal');

tasksList.addEventListener('dblclick', openModal);
window.addEventListener('click', closeModalOut)

function openModal(e){
    const taskModal = e.target.closest('li.list-group-item');

    // узнать статус задачи по id
    const taskStatus = taskModal.closest('ul').id
    let status = '';
    if (taskStatus == 'tasksList'){
        status = 'Задача в работе';
    }

    // найти по индексу с помощью id 
    const id = Number(taskModal.id);
    const index = tasks.findIndex((task) => task.id === id);

    let modalInfo = 
    `<div class="modal-content">
        
        <div class="modal-content-header">
            <span class="modal-task-number">Задача номер: ${id} (${index+1})</span>
            <span class="modal-task-text">${tasks[index].text}</span>
            <span class="modal-task-date">Создано ${tasks[index].addDate} в ${tasks[index].addTime}</span>
            <span class="modal-task-info">Статус задачи: ${status}</span>
            <span class="close-modal-btn"><img src="img/close.svg" alt="Done" width="24" height="24"></span>
        </div>
    </div>
    `;
    modal.innerHTML = modalInfo;
    modal.style.display = "block";

    closeBtn = document.getElementsByClassName('close-modal-btn')[0];
    closeBtn.addEventListener('click', closeModal)
}

function closeModal() {
    modalContent = document.getElementsByClassName('modal-content')[0];
    modal.style.display = "none";
    modalContent.remove();
}

function closeModalOut(e) {
    if (e.target == modal) {
        modalContent = document.getElementsByClassName('modal-content')[0];
        modalContent.remove();
        modal.style.display = "none";
    }
}