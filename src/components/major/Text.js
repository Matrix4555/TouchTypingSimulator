import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSecond, addInputtedSymbol, addMistake, pauseTimer } from '../../redux/actions';
import { Loader } from '../minor/Loader';
import '../../styles/text.css';

export function Text() {

    const [currentText, setCurrentText] = useState('Click the \'Get new text\' button to start');
    const [timerInterval, setTimerInterval] = useState(null);
    const [gameMode, setGameMode] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [counter, setCounter] = useState(null);
    const [used, setUsed] = useState([]);

    const dispatch = useDispatch();
    const reduxState = useSelector(state => state.text);
    let mistake = false;

    function correctInput() {

        if(!timerInterval)
            setTimerInterval(setInterval(() => dispatch(addSecond()), 1000));

        mistake = false;
        const classesOfCurrentChar = characters[counter].classList;
        classesOfCurrentChar.remove('current');
        classesOfCurrentChar.remove('mistaked');
        classesOfCurrentChar.add('passed');

        const amountOfCharacters = characters.length;
        // if we have typed a last character
        if((!gameMode && counter + 1 === amountOfCharacters) || used.length + 1 === amountOfCharacters) {
            finish();
            return;
        }

        let updatedCounter = null;
        if(gameMode) {
            used.push(counter);
            do updatedCounter = getRandom(amountOfCharacters);
            while(used.includes(updatedCounter));
        } else
            updatedCounter = counter + 1;

        characters[updatedCounter].classList.add('current');
        setCounter(updatedCounter);

        dispatch(pauseTimer(false));
        dispatch(addInputtedSymbol());
    }

    function wrongInput() {
        characters[counter].classList.add('mistaked');
        mistake = true;
        dispatch(addMistake());
    }

    function showAlert() {
        const alert = document.querySelector('.alert');
        if(!alert.style.display) {
            setTimeout(() => {
                alert.style.transform = 'translate(-350px, 0)';
                setTimeout(() => alert.style.display = 'none', 500);    // .5s is the transition time
            }, 4000);
        }
        alert.style.display = 'block';
        setTimeout(() => alert.style.transform = 'translate(0, 0)', 0);
    }

    function finish() {
        killInterval();
        setUsed([]);
        const indicators = document.querySelectorAll('.indicator');
        [].slice.call(indicators).map(el => el.style.zIndex = '9999');
        window.$('#modal-result').modal('show');
    }

    function killInterval() {
        clearInterval(timerInterval);
        setTimerInterval(null);
    }

    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    function clickHandler(e) {

        // the pressed button must be just a character without long name
        if(!characters.length || e.key.length !== 1) {
            return;
        }

        // check for cyrillic
        if(e.key.match(/[а-я]/i)) {
            showAlert();
            return;
        }

        const currentCharacter = document.querySelector('.current')?.textContent;
        if(e.key === currentCharacter)
            correctInput();
        else if(!mistake)       // don't repeat if there is already a mistake
            wrongInput();
    }

    useEffect(() => {
        
        // if the text hasn't changed when the state was updated or loading is working then skip the next changes
        if(currentText === reduxState.text || reduxState.loading)
            return;

        killInterval();

        const updatedCharacters = document.querySelectorAll('.character');
        const updatedCounter = !reduxState.gameMode ? 0 : getRandom(updatedCharacters.length);
        updatedCharacters[updatedCounter].classList.add('current');

        setCurrentText(reduxState.text);
        setGameMode(reduxState.gameMode);
        setCharacters(updatedCharacters);
        setCounter(updatedCounter);

        document.querySelector('.text').focus();
    });

    // if the text repeats then it may contain an asterisk
    // (more details in textReducer)
    // we have to remove it here
    const text = reduxState.text.replace('*', '');
    
    return(
        <div className="text container bg-primary text-white rounded mt-2 mb-2 d-flex justify-content-center" tabIndex="0" onKeyDown={clickHandler}>{
            reduxState.loading ?
                <Loader classTitle={'text-spinner'}/> :
                <p className="align-self-center">{
                    text.split('').map((letter, index) => <span className='character' key={index}>{letter}</span>)
                }</p>
        }</div>
    );
}
