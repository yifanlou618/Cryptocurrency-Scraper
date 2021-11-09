import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source1: [],
      source2: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/price-feed")
    .then(res => res.json())
    .then(res => { 
      this.setState((prevState) => { return { source1 : res.source1, source2 : res.source2 } })
    })
  }

  render() {
    let bitcoinBuy;
    let ethereumBuy;
    let bitcoinSell;
    let ethereumSell;
    var bitcoin1 = this.state.source1[0]
    var bitcoin2 = this.state.source2[0]
    var eth1 = this.state.source1[1]
    var eth2 = this.state.source2[1]
    if (bitcoin1 != null && bitcoin2 != null && eth1 != null && eth2 != null) {
      bitcoinBuy = (Number(bitcoin1["price"].replace(/[^0-9.-]+/g, "")) < Number.parseFloat(bitcoin2["price"], 10)) ? "coinmarketcap.com" : "tradingview.com"
      ethereumBuy = (Number(eth1["price"].replace(/[^0-9.-]+/g, "")) < Number.parseFloat(eth2["price"], 10)) ? "coinmarketcap.com" : "tradingview.com"
      bitcoinSell = (bitcoinBuy == "tradingview.com") ? "coinmarketcap.com" : "tradingview.com"
      ethereumSell = (ethereumBuy == "tradingview.com") ? "coinmarketcap.com" : "tradingview.com"
    }
    

    return (
      <div className="App">
        <p className="App-intro">From "coinmarketcap.com"{
          this.state.source1.map(prices => 
            <div>
            {prices.name},
            {prices.price}
            </div>
          )
        }</p>
        <p className="App-intro">From "tradingview.com"{
          this.state.source2.map(prices =>
            <div>
              {prices.name},
              ${prices.price}
            </div>
          )
        }</p>
        <p className="App-intro">
          I recommend buying Bitcoin trade on "{bitcoinBuy}"
        </p>
        <p className="App-intro">
          I recommend selling Bitcoin trade on "{bitcoinSell}"
        </p>
        <p className="App-intro">
          I recommend buying Ethereum trade on "{ethereumBuy}"
        </p>
        <p className="App-intro">
          I recommend selling Ethereum trade on "{ethereumSell}"
        </p>
        <p className="App-intro">
          <a href="https://coinmarketcap.com/">coinmarketcap.com</a>
        </p>
        <p className="App-intro">
          <a href="https://www.tradingview.com/markets/cryptocurrencies/prices-all/">tradingview.com</a>
        </p>
      </div>
    );
  }
}

export default App;
