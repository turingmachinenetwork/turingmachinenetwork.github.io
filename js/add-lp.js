$(document).ready(function() {
    initWeb3();
    initExchangeContract();
    try {
    	loadData();
    } catch(e) {
    	reloadData();
    }
    
    initUserAction();
});

function  initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
}

let exchangeCallContract = {}; // use to load data
let exchangeSendContract = {}; // use to make transaction to bsc.
let tokenCallContract = {}; // use to make transaction to bsc.

const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
let addLPDealine = 60 * 5;
let maxAmountSwap = 0;
let tokenSelect = 0;
let typeOfInputAmt = 0;
let mintLp = 0;
let userTokenBal = {};
const BASE_TOKEN = "busd";
const BASE_TOKEN_IDX = "1";
const tokens = {
	"0": {
		"tokenName": "USDT",
		"tokenAddr": "0x55d398326f99059ff775485246999027b3197955",
		"tokenDecimal": 18,
		"exchange": 'swap_usdt_busd_venus'
	},
	"1": {
		"tokenName": "BUSD",
		"tokenAddr": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
		"tokenDecimal": 18,
		"exchange": ''
	},
	"2": {
		"tokenName": "USDC",
		"tokenAddr": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
		"tokenDecimal": 18,
		"exchange": 'swap_usdc_busd_venus'
	},
	"3": {
		"tokenName": "DAI",
		"tokenAddr": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
		"tokenDecimal": 18,
		"exchange": 'swap_dai_busd_venus'
	},
	"4": {
		"tokenName": "VAI",
		"tokenAddr": "0x4bd17003473389a42daf6a0a729f6fdb328bbbd7",
		"tokenDecimal": 18,
		"exchange": 'swap_vai_busd_venus'
	},
};


const config = {
	"exchangeContract": {
		"venus": {
			"usdtbusd": "swap_usdt_busd_venus",
			"busdusdt": "swap_usdt_busd_venus",

			"usdcbusd": "swap_usdc_busd_venus",
			"busdusdc": "swap_usdc_busd_venus",

			"daibusd": "swap_dai_busd_venus",
			"busddai": "swap_dai_busd_venus",

			"vaibusd": "swap_vai_busd_venus",
			"busdvai": "swap_vai_busd_venus"
		}
	},
	"tradeFee": {
		"venus": {
			"usdtbusd": 0.003, // 0.3 %
			"busdusdt": 0.003
		}
	},
	"contracts": {
		"swap_usdt_busd_venus": "0xd62FDB0c42288B975c247cBb0C03416514b6b121",
		"swap_usdc_busd_venus": "0x6b064E7250FD5475473831EF3F6Bc6C1E5C7F1Cc",
		"swap_dai_busd_venus": "0xC709A981eeF30cbA9e9636e9ABD8f4f769dC618c",
		"swap_vai_busd_venus": "0xe2EAE89F05583FBef95408f04f6CC12b78FdBDcb"
	},
	"tokenBySwapContract": {
		"swap_usdt_busd_venus": "0",
		"swap_usdc_busd_venus": "2",
		"swap_dai_busd_venus": "3",
		"swap_vai_busd_venus": "4",
	},
	"tokenByLpToken": {
		"usdtbusd": "0",
		"usdcbusd": "2",
		"daibusd": "3",
		"vaibusd": "4"
	}
};

const TOKEN_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"mintable","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const EXCHANGE_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "minLP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxTokenInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "addLP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IBEP20",
				"name": "_base",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapFeeMachine",
				"name": "_feeMachineContract",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapFarmUSDTBUSDVenus",
				"name": "_farmUSDTBUSDContract",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimal",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimal",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply",
				"type": "uint256"
			}
		],
		"name": "initToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mintLP",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onAddLP",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountLP",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseOutputAmout",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenOutputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onRemoveLP",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minTokenOutput",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenOutputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onSwapBaseToTokenWithBaseInput",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxBaseInput",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenOutputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onSwapBaseToTokenWithTokenOutput",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxTokenInput",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseOutputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onSwapTokenToBaseWithBaseOutput",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minBaseOutput",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "baseOutputAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolBaseBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "poolTokenBalance",
				"type": "uint256"
			}
		],
		"name": "onSwapTokenToBaseWithTokenInput",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "rebalanceToFarmContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountLP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minBaseOutput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minTokenOutput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "removeLP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minTokenOutput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapBaseToTokenWithBaseInput",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxBaseInput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenOutputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapBaseToTokenWithTokenOutput",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxTokenInput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseOutputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapTokenToBaseWithBaseOutput",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minBaseOutput",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapTokeToBaseWithTokenInput",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "base",
		"outputs": [
			{
				"internalType": "contract IBEP20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "farmUSDTBUSDContract",
		"outputs": [
			{
				"internalType": "contract ITuringswapFarmUSDTBUSDVenus",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeMachineContract",
		"outputs": [
			{
				"internalType": "contract ITuringswapFeeMachine",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenOutputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseReserve",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenReserve",
				"type": "uint256"
			}
		],
		"name": "getBaseInputAmountFromTokenOutput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			}
		],
		"name": "getBaseOutput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseReserve",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenReserve",
				"type": "uint256"
			}
		],
		"name": "getBaseOutputAmountFromTokenInput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			}
		],
		"name": "getDataFromBaseInputToAddLp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenInputAmount",
				"type": "uint256"
			}
		],
		"name": "getDataFromTokenInputToAddLp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountLP",
				"type": "uint256"
			}
		],
		"name": "getDataToRemoveLP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getK",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseOutputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseReserve",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenReserve",
				"type": "uint256"
			}
		],
		"name": "getTokenInputAmountFromBaseOutput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			}
		],
		"name": "getTokenOutput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "baseInputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseReserve",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenReserve",
				"type": "uint256"
			}
		],
		"name": "getTokenOutputAmountFromBaseInput",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalReserve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IBEP20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRADE_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
function toBN(amount, tokenDecimal = 18) {
    amount = amount * 10 ** tokenDecimal;
    amount = Math.round(amount);
    amount = bigInt(amount).toString();
    return amount;
}

function roundDownFloat(value, decimals) {
	return Math.floor(value * decimals) / decimals;
}
function parseFloatNumber(value, decimals) {
    return parseFloat(value.toFixed(decimals));
}

function numberWithCommas(x, decimals = 3) {
    if (isNaN(x) == true) x = 0;
    x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
    x = parseFloat(x).toFixed(decimals);
    x = parseFloat(x).toString();
    x  = x.split(".");
    x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    x = x.join('.');
    return x;
}
function formatBalance (labelValue, decimals = 2) {
    return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
        : Math.abs(Number(labelValue)) >= 1.0e+9
            ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
            : Math.abs(Number(labelValue)) >= 1.0e+6
                ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
                : Math.abs(Number(labelValue)) >= 1.0e+3
                  	? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
                  	: numberWithCommas(labelValue, decimals);
}
function  getCurrentAddress() {
    if (!window) return null;
    if (!window.ethereum) return null;
    if (window.ethereum.selectedAddress == '') return null;
    return window.ethereum.selectedAddress;
}

function getWeb3ToReadData() {
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    // // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    // const MyWeb3 = new Web3('https://data-seed-prebsc-2-s2.binance.org:8545');
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}

function initExchangeContract() {
	for (let idx in config.contracts) {
		if (!exchangeCallContract[idx]) {
			const _web3 = getWeb3ToReadData();
			exchangeCallContract[idx] = new _web3.eth.Contract(EXCHANGE_ABI, config.contracts[idx]);
		}
	}
	setTimeout(function(){ 
		initExchangeContract();
	}, 3000);
}

function reloadData() {
	setTimeout(function(){ 
		loadData();
	}, 3000);
}
function loadData() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return reloadData();
		}
		$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);
		getUserBalance();
		if (typeOfInputAmt == 1) {
			getBaseTokenInputFromTokenInput();
		} else if (typeOfInputAmt == 2) {
			getTokenInputFromBaseTokenInput();
		}
		// // load liquidity info
		getLiquidityInfo()
			.then(_data => {
				let _total  = _data.total;
				let _amountByToken = _data.tokens;
				for (let idx in _amountByToken) {
					$(`.token-info-${idx}`).html(`${formatBalance(_amountByToken[idx], 2)} (${numberWithCommas(_amountByToken[idx] * 100 / _total, 2)}%)`);
				} 
				reloadData();
			});
	} catch(e) {
		reloadData();
	}
}
function getPair(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	return `${from}${to}`;
}
function getTokenInputFromBaseTokenInput() {
	try {
		let lpPool = $('select[name=lp_pool]').val();
		let _token = tokens[tokenSelect];
		let _baseToken = tokens[BASE_TOKEN_IDX];
		if (!_token || !_baseToken) {
			return false;
		}
		let callContract = exchangeCallContract[config.exchangeContract[lpPool][getPair(_token.tokenName, _baseToken.tokenName)]];
		if (!callContract) {
			return false();
		}
		let slippage = getSlippage();
		if (isNaN(slippage) == true) {
			return false;
		}
		let baseTokenInput = parseFloat($('input[name=base_token_input]').val());
		if (isNaN(baseTokenInput) == true || baseTokenInput == 0) {
			return false;
		}
		callContract
			.methods
			.getDataFromBaseInputToAddLp(toBN(baseTokenInput, _baseToken.tokenDecimal))
			.call()
			.then(_result => {
				mintLp = parseInt(_result[0]) / 1e18;
				let tokenInput = parseInt(_result[1]) / 10 ** _token.tokenDecimal;
				tokenInput += tokenInput * slippage;  
				// show to currency
				$('input[name=token_input]').val(tokenInput);
				$('.mint-lp').html(numberWithCommas(mintLp, 6));
			});
	} catch(e) {
		console.log("getTokenInputFromBaseTokenInput", e);
	}
}
function getBaseTokenInputFromTokenInput() {
	try {
		let lpPool = $('select[name=lp_pool]').val();
		let _token = tokens[tokenSelect];
		let _baseToken = tokens[BASE_TOKEN_IDX];
		if (!_token || !_baseToken) {
			return false;
		}
		let callContract = exchangeCallContract[config.exchangeContract[lpPool][getPair(_token.tokenName, _baseToken.tokenName)]];
		if (!callContract) {
			return false();
		}
		let slippage = getSlippage();
		if (isNaN(slippage) == true) {
			return false;
		}
		let tokenInput = parseFloat($('input[name=token_input]').val());
		if (isNaN(tokenInput) == true || tokenInput == 0) {
			return false;
		}
		tokenInput -= tokenInput * slippage;  
		callContract
			.methods
			.getDataFromTokenInputToAddLp(toBN(tokenInput, _baseToken.tokenDecimal))
			.call()
			.then(_result => {
				mintLp = parseInt(_result[0]) / 1e18;
				let baseTokenInput = parseInt(_result[1]) / 10 ** _token.tokenDecimal;
				// show to currency
				$('input[name=base_token_input]').val(baseTokenInput);
				$('.mint-lp').html(numberWithCommas(mintLp, 6));
			});
	} catch(e) {
		console.log("getTokenInputFromBaseTokenInput", e);
	}
}
function getUserBalance() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return false;
		}
		let lpPool = $('select[name=lp_pool]').val();
		let _token = tokens[tokenSelect];
		let _baseToken = tokens[BASE_TOKEN_IDX];
		if (!_token || !_baseToken) {
			return false;
		}
		let _tokenContract = tokenCallContract[_token.tokenAddr];
		let _baseTokenContract = tokenCallContract[_baseToken.tokenAddr];
		const _web3 = getWeb3ToReadData();
		if (!_tokenContract && _token.tokenAddr && _token.tokenAddr != '') {
			_tokenContract = new _web3.eth.Contract(TOKEN_ABI, _token.tokenAddr);
			tokenCallContract[_token.tokenAddr] = _tokenContract;
		}

		if (!_baseTokenContract) {
			_baseTokenContract = new _web3.eth.Contract(TOKEN_ABI, _baseToken.tokenAddr);
			tokenCallContract[_baseToken.tokenAddr] = _baseTokenContract;
		}
		if (_tokenContract) {
			return _getTokenBal();
		}
		return _getBaseTokenBal();
		function _getTokenBal() {
			_tokenContract
				.methods
				.balanceOf(userAddr)
				.call()
				.then(_uTokenBal => {
					userTokenBal[tokenSelect] = parseInt(_uTokenBal) / 10 ** _token.tokenDecimal;
					_getBaseTokenBal();
				});
		}
		function _getBaseTokenBal() {
			_baseTokenContract
				.methods
				.balanceOf(userAddr)
				.call()
				.then(_uBaseTokenBal => {
					userTokenBal[BASE_TOKEN_IDX] = parseInt(_uBaseTokenBal) / 10 ** _baseToken.tokenDecimal;
					setUserBalance();
				});
		}
	} catch(e) {
		console.log("getUserBalance", e);
	}
}
function setUserBalance() {
	let _tokenBal = userTokenBal[tokenSelect] ? userTokenBal[tokenSelect] : 0;
	$('.token_bal').html(numberWithCommas(_tokenBal, 2));
	$('.base_token_bal').html(numberWithCommas(userTokenBal[BASE_TOKEN_IDX], 2));
}
function getLiquidityInfo() {
	return new Promise((resovel, reject) => {
		let promises = [];
		let indexList = [];
		for (let idx in config.contracts) {
			if (exchangeCallContract[idx]) {
				indexList.push(idx);
				promises.push(exchangeCallContract[idx].methods.getTotalReserve().call());
			}
		}
		Promise
			.all(promises)
			.then(_result => {
				let data = {};
				for (let idx = 0; idx < promises.length; idx++) {
					let swapContract = indexList[idx];
					let token = tokens[config.tokenBySwapContract[swapContract]];
					data[BASE_TOKEN_IDX] = data[BASE_TOKEN_IDX] ? data[BASE_TOKEN_IDX] : 0;
					data[config.tokenBySwapContract[swapContract]] = data[config.tokenBySwapContract[swapContract]] ? data[config.tokenBySwapContract[swapContract]] : 0;

					data[BASE_TOKEN_IDX] += parseInt(_result[idx][0]) / 1e18;
					data[config.tokenBySwapContract[swapContract]] += parseInt(_result[idx][1]) / 10 ** token.tokenDecimal;
				}
				let newData = {
					total: 0,
					tokens: {}
				};
				for (let tokenIdx in data) {
					newData.total += data[tokenIdx];
					newData.tokens[tokenIdx] = data[tokenIdx];
				}
				return resovel(newData);
			})
			.catch(e => reject(e));
	});
}

function getSlippage() {
	let slippage = $('input[type=radio][name=slippage]:checked').val();
	if (slippage != '-') {
		return parseFloat(slippage);
	}
	let customSlippage = $('input[type=text][name=custom_slippage_input]').val();
	return parseFloat(customSlippage) / 100;
}

function _showPopup(id) {
	$(`#${id}`).show();
}
function _hidePopup(id, time = 10000) {
	setTimeout(() => {
		$(`#${id}`).hide();
	}, time);
}
function setTokenSelect(tokenIdx) {
	let token = tokens[tokenIdx];
	if (!token) {
		return false;
	}
	$('.token_name').html(token.tokenName);
	$('.token_logo').attr("src", token.logo);
	getUserBalance();
}
function initUserAction() {
	_onChangeLpToken();
	_onChangeTokenInput();
	_onChangeBaseTokenInput();
	_setMaxTokenInput();
	_setMaxBaseTokenInput();
	_approveTokenLimit();
	_approveBaseLimit();
	_addLp();
	function _onChangeTokenInput() {
		$('input[name=token_input]').on("input", (e) => {
			e.preventDefault();
			typeOfInputAmt = 1;
			getBaseTokenInputFromTokenInput();
		});
	}
	function _onChangeBaseTokenInput() {
		$('input[name=base_token_input]').on("input", (e) => {
			e.preventDefault();
			typeOfInputAmt = 2;
			getTokenInputFromBaseTokenInput();
		});
	}
	function _onChangeLpToken() {
		$('select[name=lp_token]').on("change", (e) => {
			e.preventDefault();
			let lpToken = e.target.value;
			tokenSelect = config.tokenByLpToken[lpToken];
			setTokenSelect(tokenSelect);
		});
	}
	function _setMaxTokenInput() {
		$('.max-token-input').click((e) => {
			e.preventDefault();
			let tokenBal = userTokenBal[tokenSelect];
			$('input[name=token_input]').val(tokenBal);
			typeOfInputAmt = 1;
			getBaseTokenInputFromTokenInput();
		});
	}
	function _setMaxBaseTokenInput() {
		$('.max-base-token-input').click((e) => {
			e.preventDefault();
			let baseBal = userTokenBal[BASE_TOKEN_IDX];
			$('input[name=base_token_input]').val(baseBal);
			typeOfInputAmt = 2;
			getTokenInputFromBaseTokenInput();
		});
	}
	function _approveTokenLimit() {
		$("#btn-approve-token").click((e) => {
			e.preventDefault();
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			let lpPool = $('select[name=lp_pool]').val();
			let _token = tokens[tokenSelect];
			let _baseToken = tokens[BASE_TOKEN_IDX];
			if (
				!_token || 
				!_baseToken
				) {
				return false;
			}
			if (
				verifyToken(_token.tokenAddr) == false || 
				verifyToken(_baseToken.tokenAddr) == false
				) {
				return false;
			}
			let _contractAddr = config.contracts[config.exchangeContract[lpPool][getPair(_token.tokenName, _baseToken.tokenName)]];
			if (typeof web3 == 'undifined') {
				return false;
			}
			if (!_contractAddr) {
				return false;
			}
			let _tokenContract = new web3.eth.Contract(TOKEN_ABI, _token.tokenAddr);
			let pendingApprovel = false;
			_tokenContract
				.methods
				.approve(_contractAddr, ALLOW_LIMIT_AMT)
				.send({ from: getCurrentAddress() })
				.on('transactionHash', function(hash) {
	                _showPopup('confirm-popup');
	            })
	            .on('confirmation', function(confirmationNumber, receipt){
	                if (receipt.status && pendingApprovel == false) {
	                    pendingApprovel = true;
	                    _hidePopup('confirm-popup', 0);
						_showPopup('success-confirm-popup');
						_hidePopup('success-confirm-popup', 0);
	                } 
	            });
		});
	}
	function _approveBaseLimit() {
		$("#btn-approve-base").click((e) => {
			e.preventDefault();
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			let lpPool = $('select[name=lp_pool]').val();
			let _token = tokens[tokenSelect];
			let _baseToken = tokens[BASE_TOKEN_IDX];
			if (
				!_token || 
				!_baseToken
				) {
				return false;
			}
			if (
				verifyToken(_token.tokenAddr) == false || 
				verifyToken(_baseToken.tokenAddr) == false
				) {
				return false;
			}
			let _contractAddr = config.contracts[config.exchangeContract[lpPool][getPair(_token.tokenName, _baseToken.tokenName)]];
			if (typeof web3 == 'undifined') {
				return false;
			}
			if (!_contractAddr) {
				return false;
			}
			let _baseTokenContract = new web3.eth.Contract(TOKEN_ABI, _baseToken.tokenAddr);
			let pendingApprovel = false;
			_baseTokenContract
				.methods
				.approve(_contractAddr, ALLOW_LIMIT_AMT)
				.send({ from: getCurrentAddress() })
				.on('transactionHash', function(hash) {
	                _showPopup('confirm-popup');
	            })
	            .on('confirmation', function(confirmationNumber, receipt){
	                if (receipt.status && pendingApprovel == false) {
	                    pendingApprovel = true;
	                    _hidePopup('confirm-popup', 0);
						_showPopup('success-confirm-popup');
						_hidePopup('success-confirm-popup', 0);
	                } 
	            });
		});
	}
	function _addLp() {
		$('#add-lp').click((e) => {
			e.preventDefault();
			let slippage = getSlippage();
			if (isNaN(slippage) == true) {
				return false;
			}
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			let lpPool = $('select[name=lp_pool]').val();
			let _token = tokens[tokenSelect];
			let _baseToken = tokens[BASE_TOKEN_IDX];
			if (
				!_token || 
				!_baseToken
				) {
				return false;
			}
			if (
				verifyToken(_token.tokenAddr) == false || 
				verifyToken(_baseToken.tokenAddr) == false
				) {
				return false;
			}
			let _contractAddr = config.contracts[config.exchangeContract[lpPool][getPair(_token.tokenName, _baseToken.tokenName)]];
			if (typeof web3 == 'undifined') {
				return false;
			}
			if (!_contractAddr) {
				return false;
			}
			let tokenInput = parseFloat($('input[name=token_input]').val());
			if (isNaN(tokenInput) == true || tokenInput == 0) {
				return false;
			}
			let baseTokenInput = parseFloat($('input[name=base_token_input]').val());
			if (isNaN(baseTokenInput) == true || baseTokenInput == 0) {
				return false;
			}
			let _tokenContract = new web3.eth.Contract(TOKEN_ABI, _token.tokenAddr);
			let _baseTokenContract = new web3.eth.Contract(TOKEN_ABI, _baseToken.tokenAddr);
			let _contract = new web3.eth.Contract(EXCHANGE_ABI, _contractAddr);
			// need verify approvel first
			_tokenContract
				.methods
				.allowance(userAddr, _contractAddr)
				.call()
				.then(amountAllow => {
					amountAllow = parseInt(amountAllow) / 10 ** _token.tokenDecimal;
					if (amountAllow < tokenInput) {
						return _approveToken();
					}
					return _verifyApproveBase();
				})
				.catch(e => {
					console.log(e);
				});
			function _verifyApproveBase() {
				_baseTokenContract
					.methods
					.allowance(userAddr, _contractAddr)
					.call()
					.then(amountAllow => {
						amountAllow = parseInt(amountAllow) / 10 ** _baseToken.tokenDecimal;
						if (amountAllow < baseTokenInput) {
							return _approveBase();
						}
						return _deposit();
					})
					.catch(e => {
						console.log(e);
					});
			}
			function _approveToken() {
				let pendingApprovel = false;
				_tokenContract
					.methods
					.approve(_contractAddr, ALLOW_LIMIT_AMT)
					.send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status && pendingApprovel == false) {
	                    	pendingApprovel = true;
	                    	_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 0);
	                        return _verifyApproveBase();
	                    } 
	                });	
			}
			function _approveBase() {
				let pendingApprovel = false;
				_baseTokenContract
					.methods
					.approve(_contractAddr, ALLOW_LIMIT_AMT)
					.send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status && pendingApprovel == false) {
	                    	pendingApprovel = true;
	                    	_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 0);
	                        return _deposit();
	                    } 
	                });
					
			}
			function _deposit() {
				let now = parseInt(Date.now() / 1000);
				let deadline = now + addLPDealine;
				let _transactionHistory = {};
				let minLP = mintLp - mintLp * slippage;
				_contract
					.methods
					.addLP(toBN(minLP, 18), toBN(baseTokenInput, _baseToken.tokenDecimal), toBN(tokenInput, _token.tokenDecimal), deadline)
					.send({ from: userAddr })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[name=token_input]').val("");
							$('input[name=base_token_input]').val("");
							$('.mint-lp').html(0);
							typeOfInputAmt = 0;
							mintLp = 0;
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
			}	
		});
	}
}	
function verifyToken(tokenAddr) {
	if (tokenAddr && tokenAddr != '') {
		return true;
	}
	return false;
}