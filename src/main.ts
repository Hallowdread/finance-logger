import Invoice from './classes/invoice.ts';
import ListTemplate from './classes/list-template.ts';
import Payment from './classes/payment.ts';
import HasFormatter from './interfaces/hasFormater.ts';
import './style.css';

//* Global Variables
const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

//* List Template Instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

//* Event Listener 
document.addEventListener('DOMContentLoaded', getLogs);
form.addEventListener('submit', logForm);
ul.addEventListener('click', deleteLog);


//* Functions
function logForm(e: Event) {
    e.preventDefault();
    // 
   if (toFrom.value, details.value === '') {
        alert('Fill the inputs');
   } else { 
        let logs: {
            type: string,
            toFrom: string,
            details: string,
            amount: number
        };
        // 
        logs = {
            type: type.value,
            toFrom: toFrom.value,
            details: details.value,
            amount: amount.valueAsNumber
        };
        // 
        let doc:HasFormatter;
        // 
        if (logs.type === 'invoice') {
            doc = new Invoice(logs.toFrom, logs.details, logs.amount);
        } else {
            doc = new Payment(logs.toFrom, logs.details, logs.amount);
        };
        // 
        list.render(doc, logs.type, 'end');
        // 
        saveLogs(logs); 
        // 
        clear();
   }
};

function clear(){
    toFrom.value = "";
    details.value = "";
    amount.valueAsNumber = 0;
};

//* Save To Local Storage
function saveLogs(log: {type: string, toFrom: string, details: string, amount: number}) {
    let logs:{type: string, toFrom: string, details: string, amount: number}[] = [];
    // 
    if (localStorage.getItem('logs') === null) {
        logs = [];
    } else {
        logs = JSON.parse(localStorage.getItem('logs') || "[]");
    };
    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));
};

//* Render Items From Local Storage
function getLogs() {
    // * To check if something is saved in the local storage already
    let logs: {type: string, toFrom: string, details: string, amount: number}[] = [];
    // 
    if (localStorage.getItem('logs') == null) {
        logs = []; 
    } else {
        logs = JSON.parse(localStorage.getItem('logs') || "");
    };

    // 
    logs.forEach(log => {
        let doc:HasFormatter;
        // 
        if (log.type === 'invoice') {
            doc = new Invoice(log.toFrom, log.details, log.amount);
        } else {
            doc = new Payment(log.toFrom, log.details, log.amount);
        };
        // 
        list.render(doc, log.type, 'end');
    });
};

//* Delete Function
function deleteLog(e: Event) {
    const item: any = e.target;
    //* To delete the log
    if (item.classList[0] === 'delete-btn') {
        const childrenLog = item.parentElement;
        // 
        const parentLog = childrenLog.parentElement;
        //* Delete Animation
        parentLog.classList.add('drop');
        removeLocalLog(parentLog)
        parentLog.addEventListener('transitionend', () => {
            parentLog.remove();
        });
    };
};

//* Remove Item From Local Storage
function removeLocalLog(index:any) {
    // * To check if something is saved in the local storage already
    let logs: {type: string, toFrom: string, details: string, amount: number}[] = [];
    // 
    if (localStorage.getItem('logs') == null) {
        logs = []; 
    } else {
        logs = JSON.parse(localStorage.getItem('logs') || "");
    };
    //* To remove the specific log from the local storage
    const logIndex = index.children[0].innerText;
    logs.splice(logs.indexOf(logIndex), 1);
    localStorage.setItem('logs', JSON.stringify(logs));
    
};