import './App.css';
import {Header} from '../Components/Shared/Header/Header';
import {Backdrop} from '../Components/Util/Backdrop/Backdrop';
import {Modal} from '../Components/Util/Modal/Modal';
import { useEffect, useState } from 'react';
import {Button} from '../Components/Util/Button/Button';
import { Letter } from './Letter/Letter';
import { Loader } from './Util/Loader/Loader';
import man1 from '../Images/man1.png';
import man2 from '../Images/man2.png';
import man3 from '../Images/man3.png';
import man4 from '../Images/man4.png';
import man5 from '../Images/man5.png';
import man6 from '../Images/man6.png';
import man7 from '../Images/man7.png';


function App() {

  const [newGame, setNewGame] = useState(true);
  const [state, setState] = useState({word: [], loaded: false, guessedWord: [], guessedLetters: [], attempts: 0, over: false, won: false});
  const [letter, setLetter] = useState();
  const [enteredLetter, setEnteredLetter] = useState('');
  let list;

  const startGame = () => {
    setLetter('');
    setNewGame(false);
    const tempState = {
      word: [], loaded: false, guessedWord: '', guessedLetters: [], over: false, won: false
    };
    setState(tempState);
    getWord();
  }

  const enterLetter = (event) => {
    if(event.code === 'Enter') {
      setEnteredLetter(letter)
    }
  }

  const enterLetterMobile = (event) => {
      setEnteredLetter(letter)
  }

  useEffect(() => {
    let found = false;
    if(letter && letter.length === 1) {
      const tempState = {...state}
      tempState.guessedLetters.push(letter)
      for(let i = 0; i < tempState.guessedWord.length; i++) {
        if(tempState.word[i] === enteredLetter) {
          tempState.guessedWord[i] = enteredLetter;
          found = true;
        }
      }

    if(!found) {
      let count = tempState.attempts;
      count++;
      tempState.attempts = count++;
      tempState.over = count >= 7;
    } else {
      tempState.won = tempState.word.join('') === tempState.guessedWord.join('');
    }

    setLetter('')
    setState(tempState);
    setEnteredLetter('')
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredLetter])

  const getWord = () => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
      .then(result => result.json())
      .then(
        (result) => {
         const tempState = {...state};
         tempState.word = result[0].toLowerCase().split('');
         tempState.loaded = true;
         tempState.guessedWord = result[0].split('').map((item) => '-');
         tempState.guessedLetters = [];
         tempState.attempts = 0;
         tempState.over = false;
         tempState.won = false;
         setState(tempState);
        }, 
        (error) => {
          console.log(error)
        }
      )
  }

  if(state.word && state.word.length > 0) {
    list = state.guessedWord.map((item, index) => {
      return <Letter key={index.toString() + item}>{item}</Letter>
    });
  }


  return (
    <div className="App">
      {state.over ? <div><Backdrop></Backdrop>
      <Modal>
        <h4>You lost!!</h4>
        <img src={man7} alt='man7'/>
        <p>Word: {state.word}</p>
        <Button click={startGame}>Play again</Button>
      </Modal></div> : null}

      {state.won ? <div><Backdrop></Backdrop>
      <Modal>
        <h4>You Guessed!!</h4>
        <Button click={startGame}>Play again</Button>
      </Modal></div> : null}
      <Header>
        <Button click={startGame}>New Game</Button>
      </Header>
      { newGame !== true ?
        state.loaded === false ? <div className='loader-container'><Loader /></div> : 
        <div className='game'>
          <div>
            <input className='letter-field' placeholder='A' value={letter} onKeyUp={(e) => enterLetter(e)} onChange={(e) => setLetter(e.target.value)}></input>
            <div className='mobile-button'><Button click={() => enterLetterMobile(letter)}>Try</Button></div>
            <p className='letter-counter'>{state.guessedLetters.join('-')}</p>
          </div>
          <div className='word-container'>{list}</div>
          <div>
            {state.attempts === 1 ? <img src={man1} alt='man1' /> : null}
            {state.attempts === 2 ? <img src={man2} alt='man2' /> : null}
            {state.attempts === 3 ? <img src={man3} alt='man3' /> : null}
            {state.attempts === 4 ? <img src={man4} alt='man4' /> : null}
            {state.attempts === 5 ? <img src={man5} alt='man5' /> : null}
            {state.attempts === 6 ? <img src={man6} alt='man6' /> : null}
            {state.attempts >= 7 ? <img src={man7} alt='man7' /> : null}
          </div>  
        </div>
        : <div className='newButton'><Button click={startGame}>New Game</Button></div> 
      }
    </div>
  );
}

export default App;
