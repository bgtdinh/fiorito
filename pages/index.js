
import socketIoClient from 'socket.io-client';
import React from 'react';
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      columnOne: false,
      columnTwo: false,
      columnThree: false,
      columnOneFilter: 'Proto Bahamut',
      columnTwoFilter: 'Grand Order',
      columnThreeFilter:'Akasha',
    }
    this.handleAddColumnClick = this.handleAddColumnClick.bind(this);
    this.filterTweets = this.filterTweets.bind(this);
  }

  handleAddColumnClick(event) {
    this.setState({[event.target.id]: !this.state[event.target.id]})
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


  //this.state.tweets.map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data}/>).reverse()
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
              {this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnOneFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() }
            </div>
            <div id="columnOne" className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400" onClick={this.handleAddColumnClick}>
              <span id="columnOne" className="text-white text-3xl" onClick={this.handleAddColumnClick}>+</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-slate-500 justify-between">
            <div className="flex-6 overflow-hidden">
            <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
                <span className="text-white font-bold text-2xl">{this.state.columnTwoFilter}</span>
              </div>
            {this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnTwoFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() }
            </div>
            <div id="columnTwo" className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400" onClick={this.handleAddColumnClick}>
              <span id="columnTwo" onClick={this.handleAddColumnClick} className="text-white text-3xl">+</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-slate-500 justify-between ">
            <div className="flex-6 overflow-hidden">
            <div className="m-1 px-1 py-5 rounded bg-slate-800 shadow-xl flex justify-center">
                <span className="text-white font-bold text-2xl">{this.state.columnThreeFilter}</span>
              </div>
            {this.state.tweets.filter( (tweet) => tweet.data.text.includes(this.state.columnThreeFilter))
              .map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data} />).reverse() }
            </div>
            <div id="columnThree" onClick={this.handleAddColumnClick} className="m-4 p-5 bg-slate-600 flex justify-center rounded-xl hover:bg-slate-400">
              <span id="columnThree" onClick={this.handleAddColumnClick} className="text-white text-3xl">+</span>
            </div>
          </div>
        </div>
    </div>
  );

}
}


export default Home;