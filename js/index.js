const MONSTER_LIMIT = 50;

function displayFirst50Monsters() {
    return fetch(`http://localhost:3000/monsters/?_limit=${MONSTER_LIMIT}&_page=1`)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                const monsterDiv = document.createElement('div');
                monsterDiv.innerHTML = 
                    `<h2>${data[i].name}</h2>
                    <h3>Age: ${data[i].age}</h3>
                    <p>Bio: ${data[i].description}</p>
                    `;
                document.getElementById('monster-container').appendChild(monsterDiv);
            }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').style.backgroundColor = '#444';
    displayFirst50Monsters();
});