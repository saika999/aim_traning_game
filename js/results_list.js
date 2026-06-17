// const listResults = document.getElementById('results-list');
// const btnGetResults = document.getElementById('results');

// function getResults() {
//     return JSON.parse(localStorage.getItem('results')) || [];
// }

// function renderResults() {
//     const results = getResults();
//     listResults.innerHTML = '';

//     results.forEach((result, index) => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <span class="name">${result.game}</span>
//             <span>${result.score}</span>           
//             <span>${result.game_time}</span>           
//         `;
//         li.classList.add('results__item');
//         listResults.appendChild(li);
//     });
// }

// btnGetResults.addEventListener('click', renderResults);


// ---------------------------- ДЗ ----------------------------

// 1. Если в локалстор ничего нет, то есть массив пустой, то на єкран вівести сообщение
//    "Результатов пока что нет", а если есть то таблицу, на основе таблицы с DOT2

// 2. Привязать создание таблицы к кнопке , которая нахождится на главной странице. При нажатии мы долны перейти на страницу
//    results.html и увидеть там таблицу результатов.

const resultTable = document.getElementById('screen-result');
const btnGetResults = document.getElementById('results');

function getResults() {
    return JSON.parse(localStorage.getItem('results')) || [];
}

function createButtonNewGame() {
    const btn = document.createElement('button');
    btn.textContent = 'Играть снова';
    btn.classList.add('btn', 'btn-newgame');
    btn.setAttribute('id', 'new-game');
    return btn;
}

function renderResults() {
    const results = getResults();

    if (results.length === 0) {
        resultTable.innerHTML = 'Результатов пока что нет';
    }
    let table = `
        <table>
            <thead>
                <tr>
                    <th>Игра</th>
                    <th>Счёт</th>
                    <th>Время</th>
                    <th>Дата</th>
                </tr>
            </thead>
    `;
    results.forEach((result) => {
        table += `
            <tr>
                <td>${result.game}</td>
                <td>${result.score}</td>
                <td>${result.game_time}</td>
                <td>${result.date}</td>
            </tr>
        `;
    });
    table += '</table>';
    resultTable.innerHTML = table;
}
btnGetResults.addEventListener('click', (renderResults));


// 1. Добавить кнопку "Играть снова" в функцию renderResults , 
// 2. Добавить код который при надатии на кнопку "Играть снова" будет перекидывть нас на 
// страницу index.html