const listResults = document.getElementById('results-list');
const btnGetResults = document.getElementById('results');

function getResults() {
    return JSON.parse(localStorage.getItem('results')) || [];
}

function renderResults() {
    const results = getResults();
    listResults.innerHTML = '';

    results.forEach((result, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="name">${result.game}</span>
            <span>${result.score}</span>           
            <span>${result.game_time}</span>           
        `;
        li.classList.add('results__item');
        listResults.appendChild(li);
    });
}

btnGetResults.addEventListener('click', renderResults);


// ---------------------------- ДЗ ----------------------------

// 1. Если в локалстор ничего нет, то есть массив пустой, то на єкран вівести сообщение
//    "Результатов пока что нет", а если есть то таблицу, на основе таблицы с DOT2

// 2. Привязать создание таблицы к кнопке , которая нахождится на главной странице. При нажатии мы долны перейти на страницу
//    results.html и увидеть там таблицу результатов.