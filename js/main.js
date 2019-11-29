// Enter JavaScript for the exercise here...

const descriptionInp = document.querySelector('[type="text"]')
const typeDropDown = document.querySelector('[name="type"]')
const amountInp = document.querySelector('[type="number"]')
const submitButton = document.querySelector('[type="submit"]')
const table = document.querySelector('.transactions')
const error = document.querySelector('.error')
let credits = document.querySelector('.credits')
let debits = document.querySelector('.debits')

let debitCnt = 0.00;
let creditCnt = 0.00;

// 2 Minute Timeout
let timeoutID;

function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);

    startTimer();
}
setup();

function startTimer() {
    // wait 2 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 120000);
}

function resetTimer() {
    window.clearTimeout(timeoutID);

    goActive();
}

function goInactive() {
    if (confirm('this page will reload as you are inactive')) {
        resetTimer()
    }
}

function goActive() {
    startTimer();
}


// Submit Event
submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    //validation
    if (amountInp.value <= 0 || typeDropDown.value === '') {

        const msg = document.createTextNode('Fill in form');
        error.appendChild(msg)

        setTimeout(() => {
            error.removeChild(msg)
        }, 2000);


    } else {
        //add to table
        table.lastElementChild.appendChild(addTableItem(descriptionInp.value, typeDropDown.value, amountInp.value))

        if (typeDropDown.value === 'debit') {
            debitCnt += parseFloat(amountInp.value)
            debits.textContent = `$${debitCnt}`
        } else {
            creditCnt += parseFloat(amountInp.value)
            credits.textContent = `$${creditCnt}`
        }

        //reset values
        descriptionInp.value = ''
        typeDropDown.value = ''
        amountInp.value = ''
    }


})

// add table item
const addTableItem = (desc, type, amount) => {
    // create table Row
    const tr = document.createElement('tr')
    tr.classList.add(type)

    //create desctiption
    const descTd = document.createElement('td')
    const description = document.createTextNode(desc)
    descTd.appendChild(description)

    //Create type
    const typeTd = document.createElement('td')
    const typeStr = document.createTextNode(type)
    typeTd.appendChild(typeStr)

    //Create Amount
    const amountTd = document.createElement('td')
    const amountStr = document.createTextNode(`$${amount}`)
    amountTd.appendChild(amountStr)
    amountTd.classList.add('amount')

    //add Delete button
    const tools = document.createElement('td')
    const icon = document.createElement('i')
    icon.classList.add('delete', 'fa', 'fa-trash-o')
    tools.classList.add('tools')
    tools.appendChild(icon)

    //append all to Row
    tr.appendChild(descTd)
    tr.appendChild(typeTd)
    tr.appendChild(amountTd)
    tr.appendChild(tools)

    return tr
}

// Delete Event
table.addEventListener('click', function (e) {
    const str = e.target.parentElement.previousSibling.textContent;
    const res = str.slice(1, 20)
    if (e.target.nodeName === 'I') {
        if (confirm('Are you sure you want to delete this item?')) {
            if (e.target.parentElement.parentElement.classList.value === 'debit') {
                debitCnt -= parseFloat(res)
                debits.textContent = `$${debitCnt}`
            } else {
                creditCnt -= parseFloat(res)
                credits.textContent = `$${creditCnt}`
            }
            e.target.parentElement.parentElement.remove();
        }
    }
})