
import socketIoClient from 'socket.io-client';
import React from 'react';
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    }
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
    <div>
        <Navbar/>
        <div name="tweet list containers" className="flex flex-row h-screen">
          <div className="flex-1 bg-slate-900">
            {this.state.tweets.map( (tweet) => <Tweet key={tweet.data.id} tweet={tweet.data}/>).reverse()}
          </div>
          <div className="flex-1 bg-slate-900 text-white">2</div>
          <div className="flex-1 bg-slate-900 text-white">3</div>
          <div className="flex-1 bg-slate-900 text-white">4</div>
        </div>
    </div>
  );

}
}


export default Home;