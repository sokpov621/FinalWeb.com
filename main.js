function getCookie(name)
{
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) 
        {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) 
            {
                return decodeURIComponent(cookieValue);
            }
            return null;
        } 
}
function setCookie(name, value, days) 
{
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}
// Load employees from cookies
function loadEmployees () 
{
    const employeesCookie = getCookie('employees');
    return employeesCookie ? JSON.parse(employeesCookie): [];
}
// Save employees to cookies
function saveEmployees() 
{
    setCookie('employees', JSON.stringify(employees), 30);
}
    

// Initialize variables
const form = document.getElementById('employee-form');
const nameInput = document.getElementById('employee-name'); 
const positionInput = document.getElementById('employee-position'); 
const hiredateInput = document.getElementById('employee-hiredate'); 
const employeeList = document.getElementById('employee-list'); 
const editingIndexInput = document.getElementById('editing-index'); 
const submitBtn = document.getElementById('submit-btn');

let employees = loadEmployees();

// Function to render employees -
function renderEmployees() {
    employeeList.innerHTML = ''; // Clear the current list
    employees.forEach((employee, index) => {
        employeeList.innerHTML += `
            <tr>
                <td>${(index + 1).toString().padStart(3, '0')}</td>
                <td>${employee.name}</td>
                <td>${employee.position}</td> 
                <td>${employee.hiredate}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="editEmployee(${index})">Edit</button> 
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add or update an employee 
form.addEventListener('submit', (e) => 
{
    e.preventDefault();
    const name = nameInput.value.trim();
    const position = positionInput.value.trim(); 
    const hiredate = hiredateInput.value.trim(); 
    const editingIndex = editingIndexInput.value;
    if (name && position && hiredate) 
    {
        const newEmployee= { name, position, hiredate };
        if (editingIndex) {
        // Update existing employee
        employees [editingIndex] = newEmployee; 
        submitBtn.textContent = 'Add Employee';
        editingIndexInput.value= ' ';
        } 
        else
        {
            // Add new employee 
            employees.push(newEmployee);
        }
    
        // Clear the form 
        nameInput.value = ' ';
        positionInput.value = ' ';
        hiredateInput.value = ' ';
        saveEmployees();
        renderEmployees();
    }
}); 

// Delete an employee
window.deleteEmployee = (index) => 
{
    if (confirm('Are you sure you want to delete this employee?')) 
    {
        employees.splice(index, 1);
        saveEmployees();
        renderEmployees();
    }
};


// Edit an employee
window.editEmployee = (index) => 
{
    const employee = employees [index];
    nameInput.value = employee.name;
    positionInput.value = employee.position; 
    hiredateInput.value = employee.hiredate; 
    editingIndexInput.value = index;
    submitBtn.textContent = 'Update Employee';
};


// Initial render

renderEmployees();

// create function show and hide form 
// function showpopup()
// {
//     var overlay =document.getElementById('container');
//     button=document.getElementById('show-btn');
//     if (overlay.classList.toggle('show' ))
//     {
//         button.textContent = "Close"; 
//         button.classList.add('btn-danger');
//         button.classList.remove( 'btn-primary');
//     }else
//     {   
//         button.textContent = "Show";
//         button.classList.add('btn-primary'); 
//         button.classList.remove('btn-danger');
//     }
// }
function showpopup() {
    const overlay = document.getElementById('container');
    const button = document.getElementById('show-btn');
    if (!overlay || !button) return; // Check if elements exist

    if (overlay.classList.contains('show')) {
        overlay.classList.remove('show');
        button.textContent = "Show";
        button.classList.add('btn-primary');
        button.classList.remove('btn-danger');
    } else {
        overlay.classList.add('show');
        button.textContent = "Close";
        button.classList.add('btn-danger');
        button.classList.remove('btn-primary');
    }
}



