import Invoice from './classes/invoice.ts';
import ListTemplate from './classes/list-template.ts';
import Payment from './classes/payment.ts';
import HasFormatter from './interfaces/hasFormater.ts';
import './style.css';

//? Global Variables
const form = document.querySelector('.new-item-form') as HTMLFormElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

//? List Template Instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

//? Event Listener 
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    // 
    let values:[string, string, number];
    values = [toFrom.value, details.value, amount.valueAsNumber];
    // 
    let doc:HasFormatter;
    // 
    if (type.value === 'invoice') {
        doc = new Invoice(...values);
    } else {
        doc = new Payment(...values);
    };
    // 
    list.render(doc, type.value, 'end');
});
