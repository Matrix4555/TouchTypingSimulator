import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSecond, addInputtedChar, addMistake, pauseTimer } from '../../redux/actions';
import { Text } from './Text';
import { showModal } from '../../functions';
import '../../styles/text.css';

export function TextContainer() {

    const [currentText, setCurrentText] = useState('Click the \'Get new text\' button to start');
    const [indexOfCurrentChar, setIndexOfCurrentChar] = useState(null);
    const [gameMode, setGameMode] = useState(false);
    const [timer, setTimer] = useState(null);
    const [chars, setChars] = useState([]);
    const [used, setUsed] = useState([]);

    const dispatch = useDispatch();
    const reduxState = useSelector(state => state.text);
    let pastInputHasMistake = false;

    function keydownHandler(e) {
        const k = e.key;

        if(!chars.length || k.length !== 1)
            return;

        if(k.match(/[а-я]/i)) {
            showAlert();
            return;
        }

        const currentChar = document.querySelector('.current')?.textContent;
        if(k === currentChar)
            correctInput();
        else if(!pastInputHasMistake)
            wrongInput();
    }

    function showAlert() {
        const alertStyle = document.querySelector('.alert').style;
        if(alertStyle.display !== 'block') {
            setTimeout(() => {
                alertStyle.transform = 'translate(-350px, 0)';
                setTimeout(() => alertStyle.display = 'none', 500);
            }, 4000);
        }
        alertStyle.display = 'block';
        setTimeout(() => alertStyle.transform = 'translate(0, 0)', 0);
    }
    
    function correctInput() {

        if(!timer) setTimer(setInterval(() => dispatch(addSecond()), 1000));
        pastInputHasMistake = false;
        makeCurrentCharAsPassed();

        if(isLastCharInputted()) {
            finish();
            return;
        }

        makeNextCharAsCurrent();
        dispatch(pauseTimer(false));
        dispatch(addInputtedChar());
    }

    function wrongInput() {
        chars[indexOfCurrentChar].classList.add('mistaked');
        pastInputHasMistake = true;
        dispatch(addMistake());
    }

    function makeCurrentCharAsPassed() {
        const classesOfChar = chars[indexOfCurrentChar].classList;
        classesOfChar.remove('current');
        classesOfChar.remove('mistaked');
        classesOfChar.add('passed');
    }

    function isLastCharInputted() {
        const amountOfCharacters = chars.length;
        return gameMode ?
            used.length + 1 === amountOfCharacters :
            indexOfCurrentChar + 1 === amountOfCharacters;
    }

    function finish() {
        killTimer();
        setUsed([]);
        raiseZIndexOfIndicatorsAndOpenResults();
    }

    function makeNextCharAsCurrent() {
        const updatedIndex = getIndexOfNextChar();
        chars[updatedIndex].classList.add('current');
        setIndexOfCurrentChar(updatedIndex);
    }

    function killTimer() {
        clearInterval(timer);
        setTimer(null);
    }

    function raiseZIndexOfIndicatorsAndOpenResults() {
        const indicators = document.querySelectorAll('.indicator');
        [].slice.call(indicators).map(el => el.style.zIndex = '9999');
        showModal('#results-modal');
    }

    function getIndexOfNextChar() {
        let index = null;
        if(gameMode) {
            used.push(indexOfCurrentChar);
            do index = getRandomNumber(chars.length);
            while(used.includes(index));
        } else
            index = indexOfCurrentChar + 1;
        return index;
    }

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function startOver() {
        killTimer();
        updateCharsAndSetInitialIndex();
        setUsed([]);
        setCurrentText(reduxState.text);
        setGameMode(reduxState.gameMode);
        document.querySelector('.text').focus();
    }

    function updateCharsAndSetInitialIndex() {
        const updatedChars = document.querySelectorAll('.character');
        [].slice.call(updatedChars).map(el => el.classList.remove('passed'));
        setChars(updatedChars);

        const updatedIndex = reduxState.gameMode ? getRandomNumber(updatedChars.length) : 0;
        updatedChars[updatedIndex].classList.add('current');
        setIndexOfCurrentChar(updatedIndex);
    }

    useEffect(() => {
        if(currentText !== reduxState.text && !reduxState.loading)
            startOver();
    });

    // when text is repeated it may contain an asterisk
    const text = reduxState.text.replace('*', '');
    
    return(
        <div className="text container bg-primary text-white rounded mt-2 mb-2 d-flex justify-content-center" tabIndex="0" onKeyDown={keydownHandler}>
            <Text text={reduxState.loading ? null : text} />
        </div>
    );
}
