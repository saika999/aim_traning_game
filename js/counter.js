'use strict';

export function startCountdown(seconds, onTick, onDone) {
    let current = seconds;
    const interval = setInterval(() => {
        onTick(current);
        current--;
        if (current < 0) {
            clearInterval(interval);
            onDone();
        }
    }, 1000);
    return interval;
}