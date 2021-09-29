export function setClickAndKeydownHandlersForText() {
    const body = document.querySelector('body');
    ['click', 'keydown'].forEach(handler => body.addEventListener(handler, () => {
        const text = document.querySelector('.text');
        noModalIsActive() ?
            text.focus() :
            text.blur();
    }));
}

function noModalIsActive() {
    
    const isDisplayBlock = idOfElement => document.querySelector(idOfElement).style.display === 'block';

    const inputModalIsActive =      isDisplayBlock('#input-modal');
    const resultsModalIsActive =    isDisplayBlock('#results-modal');
    const dangerModalIsActive =     isDisplayBlock('#danger-modal');

    return !inputModalIsActive && !resultsModalIsActive && !dangerModalIsActive;
}

export function showModal(idOfModal) {
    const modal = document.querySelector(idOfModal);
    modal.style.display = 'block';
    setTimeout(() => modal.style.opacity = 1, 0);
    modal.classList.add('show');
}

export function hideModal(idOfModal) {
    const modal = document.querySelector(idOfModal);
    modal.style.display = 'none';
    modal.style.opacity = 0;
    modal.classList.remove('show');
}

export function getUpdatedAccuracy(chars, mistakes) {
    let accuracy = (chars - (mistakes + 1)) / chars * 100;
    accuracy = accuracy.toFixed(2);
    return accuracy;
}

export function getUpdatedSpeed(inputtedChars, passedSeconds) {
    let speed = inputtedChars * 60 / (passedSeconds + 1);
    speed = speed.toFixed(0);
    return speed;
}

export function blockBtnAndDispatchGetText(dispatch) {
    const btn = document.querySelector('.btn-get_text');
    btn.setAttribute('disabled', '');
    dispatch
        .then(() => btn.removeAttribute('disabled'))
        .catch(() => showModal('#danger-modal'));
}
