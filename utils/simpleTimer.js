import { log } from './log.js';

let counterValue;
let timerTimePassed;
let timerFrequency  = 10;
let timerBox        = {};

let counter = () => {
    counterValue = counterValue + timerFrequency;
    // log( ('timer: Tic ' + counterValue + ' sec.') )
};

let timerStart = () => {
    counterValue = 0;
    timerTimePassed = 0;
    log( 'timer start' );
    timerBox.timer = setInterval( counter, timerFrequency);
};

let timerStop = () => {
    timerTimePassed = counterValue;
    clearInterval(timerBox.timer);
    log( 'timer stoped' );
    log( ('time passed = ' + counterValue + ' milisec.') );
};

export { timerStart, timerStop, timerTimePassed }