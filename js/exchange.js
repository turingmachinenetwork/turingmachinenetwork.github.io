$(document).ready(function() {
    initWeb3();
    initExchangeContract();
    initTradeMachineContract();
    try {
    	loadExchangeData();
    } catch(e) {
    	reloadExchangeData();
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
const TRADE_MACHINE_ADDR = '0x262AAc4c53EEAdb2a365A5bD48A2F17ED79d0d7D';
let tradeMachineContractCall = null;
let exchangeDealine = 60 * 5;
let maxAmountSwap = 0;
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
	"tokenEnableTrade": {
		"usdt": true,
		"busd": true,
		"usdc": true,
		"dai": true,
		"vai": true
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
		"swap_vai_busd_venus": "4"
	}
};

const TOKEN_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
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
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
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
				"name": "_addr",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
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
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
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
	}
];
const EXCHANGE_ABI = [
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
				"internalType": "contract ITuringTimeLock",
				"name": "_turingTimeLockContract",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapFeeMachine",
				"name": "_feeMachineContract",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapFarmVenus",
				"name": "_farmContract",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapWhitelist",
				"name": "_whitelistContract",
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
	},
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
		"inputs": [],
		"name": "farmContract",
		"outputs": [
			{
				"internalType": "contract ITuringswapFarmVenus",
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
		"inputs": [],
		"name": "setFarmContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setFeeMachineContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setTradeFee",
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
		"name": "swapTokenToBaseWithTokenInput",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "turingTimeLockContract",
		"outputs": [
			{
				"internalType": "contract ITuringTimeLock",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "whitelistContract",
		"outputs": [
			{
				"internalType": "contract ITuringswapWhitelist",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const TRADE_MACHINE_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pair",
				"type": "address"
			}
		],
		"name": "addPair",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IBEP20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapTradePair",
				"name": "pair",
				"type": "address"
			}
		],
		"name": "approveWithPair",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "token1InputAmount",
				"type": "uint256"
			},
			{
				"internalType": "contract ITuringswapTradePair",
				"name": "token1Pair",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapTradePair",
				"name": "token2Pair",
				"type": "address"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pairs",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_pair",
				"type": "address"
			}
		],
		"name": "removePair",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "token1InputAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minToken2Output",
				"type": "uint256"
			},
			{
				"internalType": "contract ITuringswapTradePair",
				"name": "token1Pair",
				"type": "address"
			},
			{
				"internalType": "contract ITuringswapTradePair",
				"name": "token2Pair",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "swapTokenToTokenWithTokenInput",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
function toBN(amount, tokenDecimal = 18) {
    amount = amount * 10 ** tokenDecimal;
    amount = Math.round(amount);
    amount = bigInt(amount).toString();
    return amount;
}
function isSwapTokenToBase(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	if (from == to) {
		return false;
	}
	if (to == BASE_TOKEN) {
		return true;
	}
	return false;
}

function isSwapBaseToToken(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	if (from == to) {
		return false;
	}
	if (from == BASE_TOKEN) {
		return true;
	}
	return false;
}

function isSwapTokenToToken(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	if (from == to) {
		return false;
	}
	if (from != BASE_TOKEN && to != BASE_TOKEN) {
		return true;
	}
	return false;
}

function getFunctionToGetOutputAmount(from, to) {
	if (isSwapTokenToToken(from, to) == true) {
		return 'getTokenOutput';
	}
	if (isSwapTokenToBase(from, to) == true) {
		return 'getBaseOutput';
	}
	if (isSwapBaseToToken(from, to) == true) {
		return 'getTokenOutput';
	}
	return '';
}

function getFunctionToSwapWithInputAmount(from, to) {
	if (isSwapTokenToBase(from, to) == true) {
		return 'swapTokenToBaseWithTokenInput';
	}
	if (isSwapBaseToToken(from, to) == true) {
		return 'swapBaseToTokenWithBaseInput';
	}
	return '';
}
function roundDownFloat(value, decimals) {
	return Math.floor(value * decimals) / decimals;
}
function parseFloatNumber(value, decimals) {
    return parseFloat(value.toFixed(decimals));
}
function isPairEnable(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	if (
		config.tokenEnableTrade[from] == true &&
		config.tokenEnableTrade[to] == true 
		) {
		return true;
	}
	return false;
}

function getPair(from, to) {
	from = from.toLowerCase().trim();
	to = to.toLowerCase().trim();
	return `${from}${to}`;
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

function initTradeMachineContract() {
	if (!tradeMachineContractCall) {
		const _web3 = getWeb3ToReadData();
		tradeMachineContractCall = new _web3.eth.Contract(TRADE_MACHINE_ABI, TRADE_MACHINE_ADDR);
	}
	setTimeout(function(){ 
		initTradeMachineContract();
	}, 3000);
}

function reloadExchangeData() {
	setTimeout(function(){ 
		loadExchangeData();
	}, 3000);
}
function loadExchangeData() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return reloadExchangeData();
		}
		$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);
		getOutputAmount();
		getPrice();
		getMaxAmountSwap();
		// // load liquidity info
		getLiquidityInfo()
			.then(_data => {
				let _total  = _data.total;
				let _amountByToken = _data.tokens;
				for (let idx in _amountByToken) {
					$(`.token-info-${idx}`).html(`${formatBalance(_amountByToken[idx], 2)} (${numberWithCommas(_amountByToken[idx] * 100 / _total, 2)}%)`);
				} 
				reloadExchangeData();
			});
	} catch(e) {
		reloadExchangeData();
	}
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

function getOutputAmount() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return false;
		}

		let fromID = $('input[type=radio][name=from_cur]:checked').val();
		let toID = $('input[type=radio][name=to_cur]:checked').val();

		if (typeof fromID == 'undefined' || typeof toID == 'undefined') {
			return false;
		}
		let fromToken = tokens[fromID.toString()];
		let toToken = tokens[toID.toString()];
		if (!fromToken || !	toToken) {
			return false;
		}
		if (isPairEnable(fromToken.tokenName, toToken.tokenName) == false) {
			return false;
		}
		let fromCurrency = parseFloat($('input[name=from_currency]').val());
		if (isNaN(fromCurrency) == true || fromCurrency == 0) {
			return false;
		}
		let swapPool = $('select[name=swap_pool]').val();
		let callContract = exchangeCallContract[config.exchangeContract[swapPool][getPair(fromToken.tokenName, toToken.tokenName)]];
		// if (!callContract) {
		// 	return false();
		// }
		_getToCurrency(callContract, fromToken, toToken, fromCurrency, swapPool);
	} catch(e) {
		console.log("getOutputAmount", e);
	}
	function _getToCurrency(callContract, fromToken, toToken, fromCurrency, swapPool) {
		let functionName = getFunctionToGetOutputAmount(fromToken.tokenName, toToken.tokenName);
		if (functionName == '') {
			return false;
		}
		let slippage = getSlippage();
		if (isNaN(slippage) == true) {
			return false;
		}
		if (isSwapTokenToToken(fromToken.tokenName, toToken.tokenName) == true) {
			let _exchangeOfFromToken = config.contracts[fromToken.exchange];
			let _exchangeOfToToken = config.contracts[toToken.exchange];

			if (!_exchangeOfFromToken || !_exchangeOfToToken) {
				return false;
			} 

			tradeMachineContractCall
				.methods
				[functionName](toBN(fromCurrency, fromToken.tokenDecimal), _exchangeOfFromToken, _exchangeOfToToken)
				.call()
				.then(_result => _setToCurrency(_result, toToken, slippage));
		} else if (!callContract) {
			return false;
		} else {	
			callContract
				.methods
				[functionName](toBN(fromCurrency, fromToken.tokenDecimal))
				.call()
				.then(_result => _setToCurrency(_result, toToken, slippage));
		}
	}
	function _setToCurrency(_result, toToken, slippage) {
		let toCurrency = parseInt(_result) / 10 ** toToken.tokenDecimal;
		toCurrency -= toCurrency * slippage;  
		// show to currency
		$('input[name=to_currency]').val(toCurrency);
	}
}

function getSlippage() {
	let slippage = $('input[type=radio][name=slippage]:checked').val();
	if (slippage != '-') {
		return parseFloat(slippage);
	}
	let customSlippage = $('input[type=text][name=custom_slippage_input]').val();
	return parseFloat(customSlippage) / 100;
}

function getPrice() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return false;
		}

		let fromID = $('input[type=radio][name=from_cur]:checked').val();
		let toID = $('input[type=radio][name=to_cur]:checked').val();

		if (typeof fromID == 'undefined' || typeof toID == 'undefined') {
			return false;
		}
		let fromToken = tokens[fromID.toString()];
		let toToken = tokens[toID.toString()];
		if (!fromToken || !	toToken) {
			return false;
		}
		_setTokenName(fromToken, toToken);
		if (isPairEnable(fromToken.tokenName, toToken.tokenName) == false) {
			$('.swap_price').val(1);
			return false;
		}
		let fromCurrency = parseFloat($('input[name=from_currency]').val());
		if (
			fromCurrency == 0 ||
			isNaN(fromCurrency) == true
			) {
			fromCurrency = 1;
		}
		let swapPool = $('select[name=swap_pool]').val();
		let callContract = exchangeCallContract[config.exchangeContract[swapPool][getPair(fromToken.tokenName, toToken.tokenName)]];
		_getPrice(callContract, fromToken, toToken, fromCurrency, swapPool);
	} catch(e) {
		console.log("getPrice", e);
	}
	function _setTokenName(fromToken, toToken) {
		$('.from_token_name').html(fromToken.tokenName);
		$('.to_token_name').html(toToken.tokenName);
	}
	function _getPrice(callContract, fromToken, toToken, fromCurrency, swapPool) {
		let functionName = getFunctionToGetOutputAmount(fromToken.tokenName, toToken.tokenName);
		if (functionName == '') {
			return false;
		}

		if (isSwapTokenToToken(fromToken.tokenName, toToken.tokenName) == true) {
			let _exchangeOfFromToken = config.contracts[fromToken.exchange];
			let _exchangeOfToToken = config.contracts[toToken.exchange];

			if (!_exchangeOfFromToken || !_exchangeOfToToken) {
				return false;
			} 

			tradeMachineContractCall
				.methods
				[functionName](toBN(fromCurrency, fromToken.tokenDecimal), _exchangeOfFromToken, _exchangeOfToToken)
				.call()
				.then(_result => _setPrice(_result, toToken, fromCurrency));
		} else if (!callContract) {
			$('.swap_price').val(1);
			return false;
		} else {	
			callContract
				.methods
				[functionName](toBN(fromCurrency, fromToken.tokenDecimal))
				.call()
				.then(_result => _setPrice(_result, toToken, fromCurrency));
		}
	}
	function _setPrice(_result, toToken, fromCurrency) {
		let toCurrency = parseInt(_result) / 10 ** toToken.tokenDecimal;
		let price = toCurrency / fromCurrency;
		// show to currency
		$('.swap_price').html(price);
	}
}
function getMaxAmountSwap() {
	try {
		let userAddr = getCurrentAddress();
		if (!userAddr) {
			return _setMax(0);
		}
		let fromID = $('input[type=radio][name=from_cur]:checked').val();
		let toID = $('input[type=radio][name=to_cur]:checked').val();

		if (typeof fromID == 'undefined' || typeof toID == 'undefined') {
			return _setMax(0);
		}
		let fromToken = tokens[fromID.toString()];
		let toToken = tokens[toID.toString()];
		if (!fromToken || !	toToken) {
			return _setMax(0);
		}
		if (isPairEnable(fromToken.tokenName, toToken.tokenName) == false) {
			return _setMax(0);
		}
		let swapPool = $('select[name=swap_pool]').val();
		let _transactionHistory = {}; 
		let _token = tokenCallContract[fromToken.tokenAddr];
		if (!_token) {
			const _web3 = getWeb3ToReadData();
			_token = new _web3.eth.Contract(TOKEN_ABI, fromToken.tokenAddr);
			tokenCallContract[fromToken.tokenAddr] = _token;
		}
		
		let _exchangeContractAddr = config.contracts[config.exchangeContract[swapPool][getPair(fromToken.tokenName, toToken.tokenName)]];
		_token
			.methods
			.balanceOf(userAddr)
			.call()
			.then(_uBal => {
				_uBal = parseInt(_uBal) / 10 ** fromToken.tokenDecimal;
				
				return _setMax(roundDownFloat(_uBal, 1e2));
				
				// _token
				// 	.methods
				// 	.balanceOf(_exchangeContractAddr)
				// 	.call()
				// 	.then(_exchangeBal => {
				// 		_exchangeBal = parseInt(_exchangeBal) / 10 ** fromToken.tokenDecimal;
				// 		let _max = _uBal > _exchangeBal ? _exchangeBal : _uBal;
				// 		_max = roundDownFloat(_max, 1e2);
				// 		return _setMax(_max);
				// 	});
			});
	} catch(e) {
		console.log("getMaxAmountSwap", e);
	}
	function _setMax(amt) {
		maxAmountSwap = amt;
		$('.max-amount-swap').html(numberWithCommas(amt, 2));
	}
}
function _showPopup(id) {
	$(`#${id}`).show();
}
function _hidePopup(id, time = 10000) {
	setTimeout(() => {
		$(`#${id}`).hide();
	}, time);
}
function initUserAction() {
	_onChangeAmountInput(); 
	_reverse();
	_clickMaxSwap();
	_approve();
	_swapToken();
	function _onChangeAmountInput() {
		$('input[name=from_currency]').on('input', function(e) {
			e.preventDefault();
			getOutputAmount();
			getPrice();
		});
	}
	function _reverse() {
		$('.btn-reverse-pair').unbind("click").bind('click', function(e) {
			e.preventDefault();
			let fromID = $('input[type=radio][name=from_cur]:checked').val();
			let toID = $('input[type=radio][name=to_cur]:checked').val();
			if (typeof toID == 'undefined') {
				$(`input[type=radio][name=from_cur]`).prop('checked', false);
			} else {
				$(`input[type=radio][name=from_cur][value=${toID}]`).prop('checked', true);
			}
			if (typeof fromID == 'undefined') {
				$(`input[type=radio][name=to_cur]`).prop('checked', false);
			} else {
				console.log("2222222222")
				$(`input[type=radio][name=to_cur][value=${fromID}]`).prop('checked', true);
			}

			getOutputAmount();
			getPrice();
			getMaxAmountSwap();
		});
	}
	function _clickMaxSwap() {
		$('.max-swap').click(function(e) {
			e.preventDefault();
			$('input[name=from_currency]').val(maxAmountSwap)
		});
	}
	function _approve() {
		$('#btn-approvel-swap').click(function(e) {
			e.preventDefault();
			let fromID = $('input[type=radio][name=from_cur]:checked').val();
			let toID = $('input[type=radio][name=to_cur]:checked').val();

			if (typeof fromID == 'undefined' || typeof toID == 'undefined') {
				return false;
			}
			let fromToken = tokens[fromID.toString()];
			let toToken = tokens[toID.toString()];
			if (!fromToken || !	toToken) {
				return false;
			}
			if (isPairEnable(fromToken.tokenName, toToken.tokenName) == false) {
				return false;
			}
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let swapPool = $('select[name=swap_pool]').val();
			let _transactionHistory = {}; 
			let _token = new web3.eth.Contract(TOKEN_ABI, fromToken.tokenAddr);
			let _contractAddr = config.contracts[config.exchangeContract[swapPool][getPair(fromToken.tokenName, toToken.tokenName)]];
			_token
				.methods
				.approve(_contractAddr, ALLOW_LIMIT_AMT)
				.send({ from: getCurrentAddress() })
				.on('transactionHash', function(hash) {
	                _showPopup('confirm-popup');
	            })
	            .on('confirmation', function(confirmationNumber, receipt) {
	                if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
						_transactionHistory[receipt.transactionHash] = true;
						_hidePopup('confirm-popup', 0);
						_showPopup('success-confirm-popup');
						_hidePopup('success-confirm-popup', 10000);
					} 
	            });
		});
	}
	function _swapToken() {
		$('#btn-swap').click(function(e) {
			e.preventDefault();
			let fromCurrency = parseFloat($('input[name=from_currency]').val());
			let toCurrency = parseFloat($('input[name=to_currency]').val());
			if (isNaN(fromCurrency) == true) {
				return false;
			}
			if (isNaN(toCurrency) == true) {
				return false;
			}

			let fromID = $('input[type=radio][name=from_cur]:checked').val();
			let toID = $('input[type=radio][name=to_cur]:checked').val();

			if (typeof fromID == 'undefined' || typeof toID == 'undefined') {
				return false;
			}
			let fromToken = tokens[fromID.toString()];
			let toToken = tokens[toID.toString()];
			if (!fromToken || !	toToken) {
				return false;
			}
			if (isPairEnable(fromToken.tokenName, toToken.tokenName) == false) {
				return false;
			}
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let now = parseInt(Date.now() / 1000);
			let deadline = now + exchangeDealine;
			let swapPool = $('select[name=swap_pool]').val();
			let _transactionHistory = {}; 
			let _token = new web3.eth.Contract(TOKEN_ABI, fromToken.tokenAddr);
			let _contractAddr = config.contracts[config.exchangeContract[swapPool][getPair(fromToken.tokenName, toToken.tokenName)]];
			let _contract = null;
			if (_contractAddr && _contractAddr != '') {
				_contract = new web3.eth.Contract(EXCHANGE_ABI, _contractAddr);
			}
			if (isSwapTokenToToken(fromToken.tokenName, toToken.tokenName) == true) {
				_contractAddr = TRADE_MACHINE_ADDR;
			} 
			// need verify approvel first
			_token
				.methods
				.allowance(userAddr, _contractAddr)
				.call()
				.then(amountAllow => {
					amountAllow = parseInt(amountAllow) / 10 ** fromToken.tokenDecimal;
					if (amountAllow < fromCurrency) {
						return _approvelToken();
					}
					return _swap();
				})
				.catch(e => {
					console.log(e);
				});
			function _approvelToken() {
				let pendingApprovel = false;
				_token
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
	                        return _swap();
	                    } 
	                });
					
			}	
			function _swap() {
				let functionName = getFunctionToSwapWithInputAmount(fromToken.tokenName, toToken.tokenName);
				
				if (isSwapTokenToToken(fromToken.tokenName, toToken.tokenName) == true) {
					let _tradeMachineContract = new web3.eth.Contract(TRADE_MACHINE_ABI, TRADE_MACHINE_ADDR);
					let _exchangeOfFromToken = config.contracts[fromToken.exchange];
					let _exchangeOfToToken = config.contracts[toToken.exchange];
					if (!_tradeMachineContract) {
						return false;
					}
					if (!_exchangeOfFromToken || !_exchangeOfToToken) {
						return false;
					} 
					_tradeMachineContract
						.methods
						.swapTokenToTokenWithTokenInput(toBN(fromCurrency, fromToken.tokenDecimal), toBN(toCurrency, toToken.tokenDecimal), _exchangeOfFromToken, _exchangeOfToToken, deadline)
						.send({ from: userAddr })
						.on('transactionHash', function(hash) {
		                	_showPopup('confirm-popup');
		                })
		                .on('confirmation', function(confirmationNumber, receipt){
		                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
								_transactionHistory[receipt.transactionHash] = true;
								$('input[name=from_currency]').val("0.00");
								$('input[name=to_currency]').val("0.00");
								_hidePopup('confirm-popup', 0);
								_showPopup('success-confirm-popup');
								_hidePopup('success-confirm-popup', 10000);
							} 
		                });
				} else if (!_contract || functionName == '') {
					return false;
				} else {
					_contract
						.methods
						[functionName](toBN(fromCurrency, fromToken.tokenDecimal), toBN(toCurrency, toToken.tokenDecimal), deadline)
						.send({ from: userAddr })
						.on('transactionHash', function(hash) {
		                	_showPopup('confirm-popup');
		                })
		                .on('confirmation', function(confirmationNumber, receipt){
		                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
								_transactionHistory[receipt.transactionHash] = true;
								$('input[name=from_currency]').val("0.00");
								$('input[name=to_currency]').val("0.00");
								_hidePopup('confirm-popup', 0);
								_showPopup('success-confirm-popup');
								_hidePopup('success-confirm-popup', 10000);
							} 
		                });
				}
			}	
		});
	}
}	