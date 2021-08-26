const inputText = document.getElementById('inputText');
const addBTN = document.getElementById('addBTN');
let todoData = [];

// 1. Add item
addBTN.addEventListener('click', addTodo);

function addTodo() {
    let todo = {
        txt: inputText.value,
        id: new Date().getTime(),
        checked:'',
    };
  
    if(todo.txt != '') {
        todoData.unshift(todo);
        inputText.value = '';
    }
    updateList();
}

// 7. Press "Enter" to input
inputText.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        addTodo();
    }
});

// 2. Render
const todoList = document.getElementById('todoList')
function render(arr){
    let str = '';
    arr.forEach((i)=>{
        str += `
        <li data-id="${i.id}">
          <label class="checkbox" for="">
            <input type="checkbox" ${i.checked}/>
            <span>${i.txt}</span>
          </label>
          <a href="#" class="delete"></a>
        </li>
        `;
    });
    todoList.innerHTML = str;
}

// 3. Change Tab 
const tab =  document.getElementById('tab');
let toggleStatus ='all';
tab.addEventListener('click', changeTab);
function changeTab(e){
    toggleStatus = e.target.dataset.tab;
    let tabs = document.querySelectorAll('#tab li');
    tabs.forEach((i) => {
        i.classList.remove('active');
    });
    e.target.classList.add('active');
    updateList();
}

// 4. Delete and Shift Checked Status
todoList.addEventListener('click', deleteAndChecked);
function deleteAndChecked(e){
    let id = e.target.closest('li').dataset.id;
    if(e.target.classList.value == "delete"){
        e.preventDefault();
        todoData = todoData.filter((i) => i.id != id);
    } 
    else {
        //change checked status
        todoData.forEach((i,index) => {
            if(i.id == id){
                if(todoData[index].checked == "checked"){
                    todoData[index].checked = '';
                }
                else {
                    todoData[index].checked = 'checked';
                }
            }
        });
    } 
    updateList();
}

// 5. Update Pending List
function updateList(){
    let showData = [];
    if(toggleStatus == 'all'){
        showData = todoData;
    } else if (toggleStatus == 'pending'){
        showData = todoData.filter((i) => i.checked == '');
    } else {
        showData = todoData.filter((i) => i.checked == 'checked');
    }

    const workNum = document.getElementById('workNum');
    let todoLength = todoData.filter((i) => i.checked == '');
    workNum.textContent = todoLength.length;
    
    render(showData);
} 

//initiate
updateList();

// 6. Clear Done Tasks
const deleteDone = document.getElementById('deleteDone');
deleteDone.addEventListener('click', function (e) {
    todoData = todoData.filter((i) => i.checked != 'checked');
    updateList();
});
