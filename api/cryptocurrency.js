var axios = require('axios');
var cheerio = require('cheerio');
var { children } = require('cheerio/lib/api/traversing');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');


async function getPriceFeed() {
    try {
        var coinmarketcap = []
        var coinmarketcapurl = 'https://coinmarketcap.com/'
        var { data } = await axios({
            method: "GET",
            url: coinmarketcapurl,
        })
        var $ = cheerio.load(data)
        var elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        var keys = [
            'rank',
            'name',
            'price',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'circulatingSupply'
        ]
        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            var coinObj = {}
            if (parentIdx < 2) {
                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text()
                    if (keyIdx === 1 || keyIdx === 6) {
                        tdValue = $('p:first-child', $(childElem).html()).text()
                    }
                    if (tdValue) {
                        coinObj[keys[keyIdx]] = tdValue
                        keyIdx++
                    }
                })
                coinmarketcap.push(coinObj)
            }
        })

        var tradingview = []
        var tradingviewurl = 'https://www.tradingview.com/markets/cryptocurrencies/prices-all/'
        var { data } = await axios({
            method: "GET",
            url: tradingviewurl,
        })
        var $ = cheerio.load(data)
        var elemSelector = '#js-screener-container > div.tv-screener__content-pane > table > tbody > tr'
        var keys = [
            'name',
            'marketCap',
            'FDMarketCap',
            'price',
            'available',
            'volume',
            'traded',
            'change'
        ]
        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            var coinObj = {}
            if (parentIdx < 2) {
                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text()
                    if (keyIdx === 0) {
                        tdValue = $('a:first-child', $(childElem).html()).text()
                    }
                    if (tdValue) {
                        coinObj[keys[keyIdx]] = tdValue
                        keyIdx++
                    }
                })
                tradingview.push(coinObj)
            }
        })
        return [coinmarketcap, tradingview]
    } catch (err) {
        console.error(err)
    }
}

const app = express()
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/api/price-feed");
    }, 100);
});
app.use(connectLiveReload());

app.get('/api/price-feed', async (req, res) => {
    try {  
        const priceFeed = await getPriceFeed()
        return res.status(200).json({
            source1: priceFeed[0],
            source2: priceFeed[1]
        })
    } catch (err) {
        return res.status(500).json({
            err: err.toString(),
        })
    }
})

app.listen(9000, () => {
    console.log("Running on port 9000")
})

