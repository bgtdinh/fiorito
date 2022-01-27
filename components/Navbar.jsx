import React from 'react';


const Navbar = () => {


  return (
    <div name="navbar" className="max-w p-5 bg-slate-600 shadow-lg flex flex-row">
        <div name="homeAndAbout" className="flex flex-1 justify-items-start">
          <div className="m-1 p-3 bg-slate-700 rounded-lg hover:bg-slate-400">
            <span className="text-white">Home</span>
          </div>
          <div className="m-1 p-3 bg-slate-700 rounded-lg hover:bg-slate-400">
            <span className="text-white">About</span>
          </div>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <span className="font-large text-white text-3xl font-bold">Thalaatha</span>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z" fill="white"/></svg>
          </div>
        </div>
    </div>
  );
}

export default Navbar;