'use strict';

export function range() {
    const inputRange = document.getElementById('range-input');
    const spanRange  = document.getElementById('range-value');

    function updateRange() {
        const val     = inputRange.value;
        const max     = inputRange.max;
        const percent = (val / max) * 100;
        inputRange.style.background = `linear-gradient(to right, #16D9E3 0%, #16D9E3 ${percent}%, #485563 ${percent}%, #485563 100%)`;
        spanRange.textContent = `${val}ms`;
        document.title = `Aim Training | ${val}ms`;
    }

    inputRange.addEventListener('input', updateRange);
    updateRange();
}