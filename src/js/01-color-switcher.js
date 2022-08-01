
const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
};

let intervalId = null;
let isActive = false;

refs.start.addEventListener('click', startChangeBgClr);
refs.stop.addEventListener('click', stopChangeBgClr);
refs.star.setAttribute('disabled', 'false'); 

function startChangeBgClr (){
    if (isActive){
        return;
    };
    isActive = true;
    refs.start.setAttribute('disabled', 'true');
    refs.stop.removeAttribute('disabled');
    intervalId = setInterval(() => {
        let randomColor = getRandomHexColor();
    document.body.setAttribute('style', `background-color: ${randomColor}`);
    }, 1000);
    
};

function stopChangeBgClr (){
    clearInterval(intervalId);
    refs.start.removeAttribute('disabled');
    refs.stop.setAttribute('disabled', 'true');
    isActive = false;
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }