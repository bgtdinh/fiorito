import React, {useState, useEffect } from 'react';


const RaidSelection = ({showModal, handleChangeColumnFilter}) => {


  const handleClick = (event) => {

    handleChangeColumnFilter(event.target.id);
  }


  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
        <span className="font-large text-white text-3xl font-bold">
          Pick your Raid
        </span>
        </div>
        <div>
        <button className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={showModal} >X</button>
        </div>
      </div>
    <div className="grid-cols-3">
      <button id="Proto Bahamut" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Proto Bahamut</button>
      <button id="Grand Order" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Grand Order</button>
      <button id="Akasha" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Akasha</button>
      <button id="Ultimate Bahamut" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Ultimate Bahamut</button>
      <button id="Grimnir" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Grimnir</button>
      <button id="Shiva" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Shiva</button>
      <button id="Europa" className="m-5 p-5 bg-slate-400 rounded-xl hover:bg-slate-600" onClick={handleClick}>Europa</button>
    </div>
    </div>
  );
}


export default RaidSelection;