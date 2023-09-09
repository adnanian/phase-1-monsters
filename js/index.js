const URL_PREFIX = 'http://localhost:3000/monsters';
const MONSTER_LIMIT = 50;
const NAME_INDEX = 0;
const AGE_INDEX = 1;
const DESC_INDEX = 2;
let page = 1;

/*At the end of the list of monsters, show a button. When clicked, the button should 
load the next 50 monsters and show them.*/
function changePage(pageArrow) {
    switch (pageArrow) {
        case "<=":
            if (page > 0) {
                page--;
            }
            break;
        case "=>":
            page++;
            break;
        default:
            break;
    }
    displayMonsters(page);
}

/* When the page loads, show the first 50 monsters. Each monster's name, age, and 
description should be shown. */
function displayMonsters(pageNumber) {
    return fetch(`${URL_PREFIX}/?_limit=${MONSTER_LIMIT}&_page=${pageNumber}`)
        .then((response) => response.json())
        .then((data) => {
            const monsterContainer = document.getElementById('monster-container');
            if (data.length === 0) {
                page--;
                return;
            }
            monsterContainer.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                const monsterDiv = document.createElement('div');
                monsterDiv.innerHTML =
                    `<h2>${data[i].name}</h2>
                    <h3>Age: ${data[i].age}</h3>
                    <p>Bio: ${data[i].description}</p>
                    `;
                monsterContainer.appendChild(monsterDiv);
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {

    /* When you click the "Create" button, the monster should be added to the list 
    and saved in the API. */
    const createMonster = (name, age, description) => {
        return fetch(URL_PREFIX, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "age": age,
                "description": description
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    /* Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API. */
    const createMonsterForm = () => {
        const form = document.createElement('form');
        let inputNames = ["name", "age", "description"];
        const inputs = [];
        for (let i = 0; i < inputNames.length; i++) {
            inputs.push(document.createElement('input'));
            inputs[i].type = 'text';
            inputs[i].id = `${inputNames[i]}-input`;
            inputs[i].name = inputNames[i];
            inputs[i].placeholder = `${inputNames[i]}...`;

            form.appendChild(inputs[i]);
        }
        const button = document.createElement('button');
        button.textContent = 'Create';
        button.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(inputs[NAME_INDEX].value);
            console.log(inputs[AGE_INDEX].value);
            console.log(inputs[DESC_INDEX].value);
            const promise = createMonster(inputs[NAME_INDEX].value, inputs[AGE_INDEX].value, inputs[DESC_INDEX].value);
            console.log(promise);
        });
        form.appendChild(button);
        document.getElementById('create-monster').appendChild(form);
    }

    createMonsterForm();
    //document.querySelector('body').style.backgroundColor = '#444';
    displayMonsters(page);
    document.getElementById('back').addEventListener('click', (event) => changePage(event.target.textContent));
    document.getElementById('forward').addEventListener('click', (event) => changePage(event.target.textContent));
});