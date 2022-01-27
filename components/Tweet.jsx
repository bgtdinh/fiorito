import React, {useState, useEffect } from 'react';
import Image from 'next/image';


const Tweet = ({tweet}) => {
const [userInput, setUserInput] = useState('');
const [timer, setTimer] = useState(0);
const [visible, setVisible] = useState(true);
const [clicked, setClicked] = useState(false);
const [battleId, setBattleId] = useState('');


const getUserInputTweet = (inputSplitTweet) => {
  let result = '';
    for( let i = 0; i < inputSplitTweet.length; i += 1) {
      if(inputSplitTweet[i] === battleId) {
        return result;
      }
      if(inputSplitTweet[i] !== battleId) {
        result += inputSplitTweet[i];
      }
    }
  return result;
};

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

const handleClick = () => {
  copyTextToClipboard(battleId);
  setClicked(true);
}

useEffect( () => {
  if(timer > 60) {
    setVisible(false);
  }
}, [timer]);

useEffect( () => {
  const regexBattleId = /(\d|[A-Z]){8}/;
  const tempBattleId = regexBattleId.exec(tweet.text);
  setBattleId(tempBattleId[0]);

setInterval( () => {
  setTimer( timer += 1 );
}, 1000);

}, []);

useEffect( () => {
  const splitTweet = tweet.text.split(' ');
  const tempUserInput = getUserInputTweet(splitTweet);
  // console.log(tempUserInput);
  setUserInput(tempUserInput);
}, [battleId]);







  if(visible && !clicked) {
    return (
      <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-between hover:bg-slate-400" onClick={handleClick}>
        <span className="text-white font-medium">{battleId}</span>
        <span className="text-white">{userInput}</span>
        <span className="text-white">{timer}s</span>
      </div>
    );
  }
  if(visible && clicked) {
    return (
      <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
        <span className="text-white font-medium">Copied</span>
      </div>
    );
  }
  if(!visible){
    return (
      <></>
    );
  }


}

export default Tweet;