const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer


const notifyBtnBTC = document.getElementById('notifyBtnBTC')
const notifyBtnETH = document.getElementById('notifyBtnETH')
const notifyBtnXRP = document.getElementById('notifyBtnXRP')

//var price = document.querySelector('h1')
var priceBTC = document.getElementById('priceBTC')
var priceETH = document.getElementById('priceETH')
var priceXRP = document.getElementById('priceETH')

var targetPriceBTC = document.getElementById('targetPriceBTC')
var targetPriceValBTC;
var targetPriceETH = document.getElementById('targetPriceETH')
var targetPriceValETH;
var targetPriceXRP = document.getElementById('targetPriceXRP')
var targetPriceValXRP;




const BTCnotification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}


function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
      .then(res => {
          const cryptos = res.data.BTC.USD
          priceBTC.innerHTML = '$'+cryptos.toLocaleString('en')
          // check for BTC
          // Add this:
          //check BTC price
        if (targetPriceBTC.innerHTML != '' && targetPriceValBTC < res.data.BTC.USD) {
            const myNotificationBTC = new window.Notification(BTCnotification.title, BTCnotification)

            myNotificationBTC.onclick = () => {
                console.log('clicked')
                BTCnotification.close()
            }
        }


      })
}

function getETH() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD')

    .then(res => {
        const cryptos = res.data.ETH.USD
        priceETH.innerHTML = '$'+cryptos.toLocaleString('en')

        //check for eTH
        if (targetPriceETHinnerHTML != '' && targetPriceValETH < res.data.ETH.USD) {
            const myNotificationETH = new window.Notification(notification.title, ETHnotification)

            myNotificationETH.onclick = () => {
                console.log('clicked')
                ETHnotification.close()
            }
        }

    })
}

function getXRP() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP&tsyms=USD')

    .then(res => {
        const cryptos = res.data.XRP.USD
        priceXRP.innerHTML = '$'+cryptos.toLocaleString('en')

        //check for eTH
        if (targetPriceXRP.innerHTML != '' && targetPriceValXRP < res.data.XRP.USD) {
            const myNotificationXRP = new window.Notification(notification.title, ETHnotification)

            myNotificationXRP.onclick = () => {
                console.log('clicked')
                ETHnotification.close()
            }
        }

    })
}

getETH()
setInterval(getETH, 10000);

getBTC()
setInterval(getBTC, 10000);

getXRP()
setInterval(getXRP, 10000);

notifyBtnBTC.addEventListener('click', function (event) {
  //we build out the window here--we find add
  const modalPath = path.join('file://', __dirname, 'add.html')
  // define width of new window
  let win = new BrowserWindow({ frame:false, transparent: true, alwaysOnTop: true, width: 600, height: 400 })
  //this si cleanup
  win.on('close', function () { win = null })
  //pass in modal path
  win.loadURL(modalPath)
  //show it
  win.show()
})

ipc.on('targetPriceValBTC', function (event, arg) {
  //convert the arg to a number
    targetPriceValBTC = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceValBTC.toLocaleString('en')
})
