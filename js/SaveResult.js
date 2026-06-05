'use strict';

export function saveResult(score) {
    let results = [];
    try {
        const raw = localStorage.getItem('results');
        if (raw) results = JSON.parse(raw);
    } catch (e) {
        results = [];
    }
    results.push({
        game: results.length + 1,
        score: score,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('results', JSON.stringify(results));
}

export function getResults() {
    try {
        const raw = localStorage.getItem('results');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

export function clearResults() {
    localStorage.removeItem('results');
}