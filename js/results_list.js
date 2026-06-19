'use strict';
// ---------------------------- ДЗ ----------------------------

// 1. Если в локалстор ничего нет, то есть массив пустой, то на єкран вівести сообщение
//    "Результатов пока что нет", а если есть то таблицу, на основе таблицы с DOT2

// 2. Привязать создание таблицы к кнопке , которая нахождится на главной странице. При нажатии мы долны перейти на страницу
//    results.html и увидеть там таблицу результатов.



const resultTable = document.getElementById('screen-result');
const btnClearResults = document.getElementById('clearBtn');

function getResults() {
    return JSON.parse(localStorage.getItem('results')) || [];
}

function renderResults() {
    const results = getResults();

    if (results.length === 0) {
        resultTable.innerHTML = '<p class="no-results">Результатов пока что нет</p>';
        return; 
    }

    let table = `
        <table id="tableResults">
            <thead>
                <tr>
                    <th>Игра</th>
                    <th>Счёт</th>
                    <th>Время</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
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

    table += '</tbody></table>';
    resultTable.innerHTML = table; 
}

function clearResults() {
    localStorage.removeItem('results');
    renderResults(); 
}


renderResults();

btnClearResults.addEventListener('click', clearResults);

//----------------------------- ДЗ ---------------------------
// 3. доделать кнопку clearResults, что бы не было ошибок, что бы чистилась таблица не только локал стор
// 1. Добавить кнопку "Играть снова" в функцию renderResults ,
// 2. Добавить код который при надатии на кнопку "Играть снова" будет перекидывть нас на
// страницу index.html