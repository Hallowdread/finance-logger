import HasFormatter from "../interfaces/hasFormater.ts";

export default class ListTemplate {
    constructor(public container: HTMLUListElement){}
    // 
    // 
    render(item: HasFormatter, heading: string, position: 'start' | 'end') {
        const logDiv = document.createElement('div');
        logDiv.classList.add('log-div');
        // 
        const h4 = document.createElement('h4');
        h4.innerText = heading;
        logDiv.append(h4);
        // 
        const div = document.createElement('div');
        div.classList.add('logs');
        // 
        const p = document.createElement('p');
        p.innerText = item.format();
        div.append(p);
        // 
        const deletBtn = document.createElement('button');
        deletBtn.classList.add('delete-btn');
        deletBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        div.append(deletBtn);
        // 
        logDiv.append(div);
        // 
        if (position === 'start') {
            this.container.prepend(logDiv);
        } else {
            this.container.append(logDiv);
        };
    };
};