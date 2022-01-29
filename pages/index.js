
import socketIoClient from 'socket.io-client';
import React from 'react';
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';
import RaidSelection from '../components/RaidSelection';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      currentColumnClicked: 0,
      columnOneFilter: '',
      columnTwoFilter: '',
      columnThreeFilter:'',
      showModal: false,
    }
    this.handleAddColumnClick = this.handleAddColumnClick.bind(this);
    this.filterTweets = this.filterTweets.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleChangeColumnFilter = this.handleChangeColumnFilter.bind(this);
  }

  showModal() {
    this.setState({showModal: !this.state.showModal});
  }

  handleChangeColumnFilter (filterValue) {
    const map = {
      1:'columnOneFilter',
      2:'columnTwoFilter',
      3: 'columnThreeFilter',
    }
    const columnName = map[this.state.currentColumnClicked];

    this.setState({[columnName]: filterValue});
  }

  handleAddColumnClick(event) {
    this.setState({currentColumnClicked: parseInt(event.target.id)});
    this.showModal();
  }

  filterTweets(filter, columnTweets) {
    const filteredTweets = this.state.tweets.filter( (tweet) => {
      return tweet.data.text.includes(filter);
    });
    const mappedFilteredTweets = filteredTweets.map( (tweet) => {
      <Tweet key={tweet.data.id} tweet={tweet.data}/>}).reverse();
    this.setState({[columnTweets]: mappedFilteredTweets});
  }

  componentDidMount() {
    console.log('loaded');
    const socket = socketIoClient(process.env.serverHost);
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('tweet', (tweet) => {
      // console.log(tweet);
      var copyOfTweets = [...this.state.tweets];
      copyOfTweets.push(tweet);
      this.setState({tweets: copyOfTweets});
    });
  }


render() {
  return (
    <div className="h-screen">
        <Navbar/>
        <div name="tweet list containers" className="flex flex-row h-full">
          <div className="flex-1 flex flex-col bg-slate-500 justify-between">
            <div className="flex-6 overflow-hidden">
              <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
                <span className="text-white font-bold text-2xl">{this.state.columnOneFilter}</span>
              </div>
              {this.state.columnOneFilter !== '' ? this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnOneFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() : <></>}
            </div>
            <div id="1" className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400" onClick={this.handleAddColumnClick}>
              <span id="1" className="text-white text-3xl" onClick={this.handleAddColumnClick}>+</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-slate-500 justify-between">
            <div className="flex-6 overflow-hidden">
            <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
                <span className="text-white font-bold text-2xl">{this.state.columnTwoFilter}</span>
              </div>
            {this.state.columnTwoFilter !== '' ? this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnTwoFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() : <></>}
            </div>
            <div id="2" className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400" onClick={this.handleAddColumnClick}>
              <span id="2" onClick={this.handleAddColumnClick} className="text-white text-3xl">+</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-slate-500 justify-between ">
            <div className="flex-6 overflow-hidden">
            <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
                <span className="text-white font-bold text-2xl">{this.state.columnThreeFilter}</span>
              </div>
            {this.state.columnThreeFilter !== '' ? this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnThreeFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() : <></>}
            </div>
            <div id="3" onClick={this.handleAddColumnClick} className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400">
              <span id="3" onClick={this.handleAddColumnClick} className="text-white text-3xl">+</span>
            </div>
          </div>
        </div>
        {this.state.showModal ?
          <div name="modal background" className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
            <div name="modal content" className="m-5 p-5 bg-slate-500 rounded-xl">
              <RaidSelection handleChangeColumnFilter={this.handleChangeColumnFilter} showModal={this.showModal}/>
            </div>
          </div>
          :
          <>
          </>
        }
    </div>
  );

}
}


export default Home;