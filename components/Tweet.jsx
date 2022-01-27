import React, {useState, useEffect } from 'react';
import Image from 'next/image';


const Tweet = ({tweet}) => {
// const [userInput, setUserInput] = useState('');
const [timer, setTimer] = useState(0);
const [visible, setVisible] = useState(true);
const regexBattleId = /(\d|[A-Z]){8}/;
const battleId = regexBattleId.exec(tweet.text);

useEffect( () => {
  if(timer > 60) {
    setVisible(false);
  }
}, [timer]);

useEffect( () => {

setInterval( () => {
  setTimer( timer += 1 );
}, 1000);

}, []);

// const getUserInputTweet = (inputSplitTweet) => {
//   let result = '';
//     for( let i = 0; i < inputSplitTweet.length; i += 1) {
//       if(inputSplitTweet[i] === battleId[0]) {
//         return;
//       }
//       if(inputSplitTweet[i] !== battleId[0]) {
//         result += inputSplitTweet[i];
//       }
//     }
//   return result;
// };

// useEffect( () => {
//   const splitTweet = tweet.text.split(' ');
//   const tempUserInput = getUserInputTweet(splitTweet);
//   console.log(tempUserInput);
//   setUserInput(tempUserInput);
// }, []);
  if(visible) {
    return (
      <div className="m-1 p-1 rounded bg-slate-800 shadow-xl flex justify-between">
        <span className="text-white font-medium">{battleId[0]}</span>
        <span className="text-white">{timer}s</span>
      </div>
    );
  } else {
    return (
      <></>
    );
  }


}

export default Tweet;