let users = [];

const getUsersData = () => {
    setTimeout(() => {
        users = JSON.parse(localStorage.getItem("users"));        
        render(users);
        
    }, 3000)
}

const setUsers = (usersList) => {
    users = usersList;
    localStorage.setItem("users", JSON.stringify(users));
    render(users);
}

const showPreloader = () => {
    document.getElementsByClassName('col-12')[0].innerHTML = "";
    let preloader = createElement("div", "", "bounceball");
    document.getElementsByClassName('col-12')[0].appendChild(preloader);
}

const createElement = (tag, content, className) => {
    const element = document.createElement(tag);
    element.innerText = content;
    if(className) element.className = className;
    return element;
}

const appendArray = (htmlEl, arrayEls) => {
    arrayEls.map(el => htmlEl.appendChild(el))
    return htmlEl;
}

const render = (users) => {
    document.getElementsByClassName('col-12')[0].innerHTML = "";
    const innerTablesRows = users.map((el, i) => {
        const index = createElement('th',i + 1);
        const name = createElement('td',el.name);
        const gender = createElement('td',el.gender);
        const salary = createElement('td',el.salary);
        const actionButton = createElement('td',"");

        
        const deleteButton = createElement("button", "Delete", "btn btn-danger");
        deleteButton.addEventListener("click", e => {
            setUsers(users.filter((el, index) => index != i));
        });
        actionButton.appendChild(deleteButton);
        
        return appendArray(
            document.createElement('tr'),
            [index,name,gender,salary,actionButton]
        );
    });


    const tbody = document.createElement('tbody')
    innerTablesRows.map(el => tbody.appendChild(el));


    const tr = appendArray(document.createElement('tr'),[
        createElement('th','#'),
        createElement('th','Name'),
        createElement('th','Gender'),
        createElement('th','Salary'),
        createElement('th','Action'),
    ]);

    const thead = appendArray(document.createElement('thead'),[tr]);

    const table = appendArray(document.createElement('table'),[
        thead,tbody
    ]);
    table.className = "table";
    document.getElementsByClassName('col-12')[0].appendChild(table);
}

document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let nameInput = document.forms["userForm"]["nameInput"].value;
    let genderInput = document.forms["userForm"]["genderSelect"].value;
    let salaryInput = document.forms["userForm"]["salaryInput"].value;
    setUsers([{name: nameInput, gender: genderInput, salary: salaryInput}, ...users]);
});

showPreloader();
getUsersData();