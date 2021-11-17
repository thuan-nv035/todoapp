// getting all required elements
const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = () => {
    let userData = inputBox.value // getting user entered value
    if(userData.trim() != 0) {  // if user value aren't only spaces
        addBtn.classList.add("active") // active the add button
    }else {
        addBtn.classList.remove("active") // unactive the add button
    }
}

showTasks()


// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value
    let getLocalStorage = localStorage.getItem("New Todo")
    if(getLocalStorage == null) {
        listArr = []
    }else {
        listArr = JSON.parse(getLocalStorage)
    }
    listArr.push(userData)
    localStorage.setItem("New Todo", JSON.stringify(listArr))
    showTasks()
}


// function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo")
    if(getLocalStorage == null) {
        listArr = []
    }else {
        listArr = JSON.parse(getLocalStorage)
    }
    const pendingNumb = document.querySelector(".pendingNumb")
    pendingNumb.textContent = listArr.length
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active")
    }else {
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = ''
    listArr.forEach((element, index ) => {
        newLiTag += ` <li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML =  newLiTag
    inputBox.value = ""
}

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo")
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index, 1)
    // after remove the li again update
    localStorage.setItem("New Todo", JSON.stringify(listArr))
    showTasks()
}

// delete all

deleteAllBtn.onclick = () => {
    listArr= []
    localStorage.setItem("New Todo", JSON.stringify(listArr))
    showTasks()
}