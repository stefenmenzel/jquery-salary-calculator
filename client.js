$(document).ready(doJQuery);
let employeeArray = [];

function doJQuery(){
    addEventListener();
}

function addEventListener(){
    $('.submitButton').on('click', addEmployee);
    $('.tableBody').on('click', '.deleteButton', function(){
        checkButton(this);
    });
}

function addEmployee(){
    let employee = collectInput();
    if(employee){
        appendEmployeeToTable(employee);
        updateMonthly();
        clearAllFields();
    }
}

function collectInput() {
    if(checkAllInputs()){
        let newEmployee = {
            firstName: $('#inputFirstname').val(),
            lastName: $('#inputLastName').val(),
            id: $('#inputId').val(),
            jobTitle: $('#jobTitleInput').val(),
            salary: $('#salaryInput').val(),
            index: employeeArray.length
        }
        employeeArray.push(newEmployee);
        return newEmployee;
    }
    return undefined;
}

function checkAllInputs(){
    console.log('in check all inputs');
    let firstName = $('#inputFirstname').val();
    let lastName = $('#inputLastName').val();
    let id = $('#inputId').val();
    let jobTitle = $('#jobTitleInput').val();
    let salary = $('#salaryInput').val();

    console.log('the value of firstname is: ', firstName);

    if(firstName === '' || lastName === '' || id === '' ||
        jobTitle === '' || salary === ''){
            return false;
        }
    return true;
}

function appendEmployeeToTable(employee){
    let appendString = $(`<tr><td>${employee.firstName}</td>
        <td>${employee.lastName}</td><td>${employee.id}</td>
        <td>${employee.jobTitle}</td><td>${employee.salary}</td><td><button class='deleteButton' id='${employee.index}'>delete</button></td></tr>`);
    $('.tableBody').append(appendString);
}

function updateMonthly(){
    let totalMonthly = 0;
    for(element of employeeArray){
        totalMonthly += (element.salary/12);
    }
    $('.totalMonthly').text(`Total Monthly: $${totalMonthly}`);
}

function clearAllFields(){
    $('#inputFirstname').val('');
    $('#inputLastName').val('');
    $('#inputId').val('');
    $('#jobTitleInput').val('');
    $('#salaryInput').val('');
}

function checkButton(element){
    console.log('a button was clicked');
    console.log('element: ' + element);
    console.log('element id: ' + typeof(element));
    console.log(`this test: ${$(element).attr('id')}`);
    $('.tableBody').empty();
    employeeArray.splice($(element).attr('id'),1);
    for(let i = 0; i < employeeArray.length; i++){
        employeeArray[i].index = i;
        appendEmployeeToTable(employeeArray[i]);
    }
    updateMonthly();
}