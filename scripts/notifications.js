// получить блок с уведомдегиями для добавления элементов с уведомлениями
let toastBox = document.getElementById('toastBox');

// удаление уведомления по клику
toastBox.addEventListener('click', removeToastOnClick)

// контент элементов с уведомлениями
let doneTaskMsg = '<div><img src="./img/tick.svg" alt="Done" width="18" height="18"><span style="margin-left: 10px">Задача выполнена!</span></div>';
let removeTaskMsg = '<div><img src="./img/cross.svg" alt="Done" width="18" height="18"><span style="margin-left: 10px">Задача удалена!</span></div>';
let removeDoneTaskMsg = '<div><img src="./img/cross.svg" alt="Done" width="18" height="18"><span style="margin-left: 10px">Выполненная задача удалена!</span></div>';
let returnDoneTaskMsg = '<div><img src="./img/return.svg" alt="Done" width="18" height="18"><span style="margin-left: 10px">Задача возвращена в работу!</span></div>';

function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;

    toastBox.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add('hide-toast');
    }, 2000);
    setTimeout(()=>{
        toast.remove();
    }, 2500);
};

function removeToastOnClick(e) {
    if (e.target != toastBox){
        e.target.classList.add('hide-toast');
        setTimeout(()=>{
            e.target.remove();
        }, 500);
    }
}

