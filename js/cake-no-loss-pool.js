$(document).ready(function() {
    initWeb3();
    initCakeNoLossPoolContract();
    try {
    	loadData();
    } catch(e) {
    	reloadData();
    }
    
    initUserAction();
});

function getWeb3ToReadData() {
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}

const CAKE_NO_LOSS_POOL_CONTRACT_ADDR = '0x534B73E7fdDCf5220A7894385Ec4357ef608069f';
const CAKE_TOKEN_ADDR = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';
let cakeNoLossPoolContract;
let userDataInCakeNoLossPool = {};
let prizeHistory = [];
const CAKE_NO_LOSS_POOL_CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "approveConnectToPancake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "changeEndLoteryTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "changeHalftime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_wantAmt",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "draw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "harvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "_pancakeSwap",
				"type": "address"
			},
			{
				"internalType": "contract IMiningMachine",
				"name": "_miningMachine",
				"type": "address"
			},
			{
				"internalType": "contract IPancakeMasterChef",
				"name": "_pancakeMasterChef",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_cake",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_turing",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_wbnb",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_busd",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pidOfMining",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "onDeposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_performanceFee",
				"type": "uint256"
			}
		],
		"name": "onDraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "onWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "onWithdrawWon",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "setPendingTimeOfWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "setRatefeeOfWithdrawEarly",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rate",
				"type": "uint256"
			}
		],
		"name": "setRateOfPerformanceFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
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
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "transferPerformanceMachine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_wantAmt",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawWon",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "busd",
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
		"name": "endLoteryTime",
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
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256[16]",
				"name": "data_",
				"type": "uint256[16]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "getFeeOfWithdrawEarly",
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
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "getOwnerOfToken",
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
		"name": "getTotalReward",
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
		"name": "getTuringPrice",
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
		"name": "getWantPrice",
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
		"name": "halftime",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "historyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tiketsWin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTickets",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "wonAmt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "performanceFee",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "lastDepositTimeOf",
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
		"name": "lastHistory",
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
		"name": "miningMachine",
		"outputs": [
			{
				"internalType": "contract IMiningMachine",
				"name": "",
				"type": "address"
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
		"name": "pancakeSwap",
		"outputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pankaceMasterChef",
		"outputs": [
			{
				"internalType": "contract IPancakeMasterChef",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pendingTimeOfWithdraw",
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
		"name": "performanceMachine",
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
		"name": "pidOfMining",
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
		"name": "rateFeeOfWithdrawEarly",
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
		"name": "rateOfPerformanceFee",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "shareOf",
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
		"name": "totalHistory",
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
		"name": "totalPlayer",
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
		"name": "totalRandom",
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
		"name": "totalShare",
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
		"name": "totalWon",
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
		"name": "TURING",
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
		"name": "version",
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
		"name": "want",
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
		"name": "wbnb",
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
		"name": "wonOf",
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
const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
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

function  initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
}
function initCakeNoLossPoolContract() {
	if (!cakeNoLossPoolContract) {
		const _web3 = getWeb3ToReadData();
		cakeNoLossPoolContract = new _web3.eth.Contract(CAKE_NO_LOSS_POOL_CONTRACT_ABI, CAKE_NO_LOSS_POOL_CONTRACT_ADDR);
	}
	setTimeout(function(){ 
		initCakeNoLossPoolContract();
	}, 3000);
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
function sortArray(array, key, isAsc = true, isValueString = false) {
    array.sort(function(a, b){
	    if (isValueString == true) {
	        var valueA = a[key].toUpperCase(); 
	        var valueB = b[key].toUpperCase(); 
	        if (isAsc == true) {
	            if (valueA < valueB) {
	                return -1;
	            }
	        } else {
	            if (valueB < valueA) {
	                return -1;
	            }
	        }
	                
	    } else {
	        if (isAsc == true) {
	            return a[key] - b[key] //sort by date ascending
	        } else {
	            return b[key] - a[key] //sort by date ascending
	        }
	    }
    });
    return array;
}
function formatTime(timestamp) {
	var date = moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss');
	var stillUtc = moment.utc(date).toDate();
	return moment(stillUtc).local().format('MMM Do');
}
function getTimeCountDown(time) {
    if (time < 0) {
        return {
            "day": dealNum(0),
            "hour": dealNum(0),
            "min": dealNum(0),
            "sec": dealNum(0)
        }
    }
    return {
    	"day": dealNum((time / (24 * 60 * 60))),
        "hour": dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min": dealNum((time % (60 * 60)) / 60),
        "sec": dealNum(time % 60)
    };
}
function dealNum (val) {
    var str = Math.floor(val)
    return (str < 10 ? '0' : '') + str
}
function reloadData() {
	setTimeout(function(){ 
		loadData();
	}, 3000);
}
function loadData() {
	if (!cakeNoLossPoolContract) {
		return reloadData();
	}
	let userAddr = getCurrentAddress();
	if (!userAddr) {
		return reloadData();
	}
	$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);
	/**
        data_[0] uint256 miningSpeed_, 
        data_[1] uint256 userWant_, 
        data_[2] uint256 userTickets_, 
        data_[3] uint256 userWant_, // cake 
        data_[4] uint256 userTuringPending_, 
        data_[5] uint256 userTuringBal_, 
        data_[6] uint256 userBNBBal_, 
        data_[7] uint256 prize_, 
        data_[8] uint256 turingRewardAPY_, 
        data_[9] uint256 totalTickets_, 
        data_[10] uint256 wantPrice_, 
        data_[11] uint256 turingPrice_, 
        data_[12] uint256 endLoteryTime_, 
        data_[13] uint256 tvl_
    */
	cakeNoLossPoolContract
		.methods
		.getData(userAddr)
		.call()
		.then(_updateUserData)
		.catch(_error);
	function _updateUserData(_result) {
		userDataInCakeNoLossPool.miningSpeed = parseInt(_result[0]); 
		// userDataInCakeNoLossPool.userWant = parseFloatNumber(parseInt(_result[1]) / 1e18, 18);
		userDataInCakeNoLossPool.userTickets = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
		userDataInCakeNoLossPool.userWantCanWithdraw = parseFloatNumber(roundDownFloat(parseInt(_result[3]) / 1e18, 18), 18);
		userDataInCakeNoLossPool.userTuringPending = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
		userDataInCakeNoLossPool.userTuringBal = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
		userDataInCakeNoLossPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
		userDataInCakeNoLossPool.prize = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
		userDataInCakeNoLossPool.turingRewardAPY = parseFloatNumber(parseInt(_result[8]) / 1e2, 2);
		userDataInCakeNoLossPool.totalTickets = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
		userDataInCakeNoLossPool.totalDeposits = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
		userDataInCakeNoLossPool.wantPrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
		userDataInCakeNoLossPool.turingPrice = parseFloatNumber(parseInt(_result[11]) / 1e18, 18);
		userDataInCakeNoLossPool.endLoteryTime = parseInt(_result[12]);
		userDataInCakeNoLossPool.tvl = parseFloatNumber(parseInt(_result[13]) / 1e18, 18);
		userDataInCakeNoLossPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[14]) / 1e18, 18), 18);
		userDataInCakeNoLossPool.totalPlayer = parseInt(_result[15]);

		_loadPrizeHistory()
			.then(_drawUI)
			.catch(_error);
	}	
	function _drawUI() {
		let now = parseInt(Date.now() / 1000);
		let lastPrize = prizeHistory[0] ? prizeHistory[0] : null;
		let timeOfWillBeAwarded = getTimeCountDown(userDataInCakeNoLossPool.endLoteryTime - now);

		$('.will-be-awarded').html(`${timeOfWillBeAwarded.day} DAY ${timeOfWillBeAwarded.hour} HR ${timeOfWillBeAwarded.min} MIN ${timeOfWillBeAwarded.sec} SEC`);
		$('.current-prize').html(formatBalance((userDataInCakeNoLossPool.prize *userDataInCakeNoLossPool.wantPrice ), 2));
		$('.total-tickets').html(formatBalance(userDataInCakeNoLossPool.totalTickets, 2));
		$('.total-player').html(formatBalance(userDataInCakeNoLossPool.totalPlayer, 0));
		$('.total-cake-deposits').html(formatBalance(userDataInCakeNoLossPool.totalDeposits, 2));
		$('.total-cake-deposits-value').html(formatBalance(userDataInCakeNoLossPool.totalDeposits * userDataInCakeNoLossPool.wantPrice, 2));
		$('.user-tickets-amt').html(formatBalance(userDataInCakeNoLossPool.userTickets, 2));
		$('.user-cake-staked').html(formatBalance(userDataInCakeNoLossPool.userTickets, 2));
		$('.user-cake-bal').html(numberWithCommas(userDataInCakeNoLossPool.userWantBal, 2));
		$('.your-turing-earned').html(numberWithCommas(userDataInCakeNoLossPool.userTuringPending, 2));
		$('.user-cake-can-withdraw').html(numberWithCommas(userDataInCakeNoLossPool.userWantCanWithdraw, 2));
		$('.user-odds-of-winning').html(`${numberWithCommas(userDataInCakeNoLossPool.userTickets*100 / userDataInCakeNoLossPool.totalTickets, 2)}% every week`);
		// drawp prize history
		prizeHistory.forEach((item, idx) => {
			let time = item.time > 0 ? formatTime(item.time * 1000) : '-';
			let winner = item.winner;
			let startAddress    = winner.slice(0,5);
            let endAddress      = winner.slice(-5);
			$(`.time-pool-no-${idx + 1}`).html(time);
			$(`.prize-busd-pool-no-${idx + 1}`).html(`$${formatBalance((item.prize * userDataInCakeNoLossPool.wantPrice), 2)}`);
			$(`.prize-cake-pool-no-${idx + 1}`).html(formatBalance(item.prize, 2));
			$(`.prize-tickets-pool-no-${idx + 1}`).html(formatBalance(item.totalTickets, 2));
			$(`.winner-pool-no-${idx + 1}`).html(`${startAddress}...${endAddress}`);
		});
		return reloadData();
	}
	function _error(_e) {
		return reloadData();
	}	

	function _loadPrizeHistory() {
		let promises = [];
		for (let idx = 0; idx < 5; idx++) {
			promises.push(cakeNoLossPoolContract.methods.historyList(idx).call());
		}
		return new Promise((resolve, reject) => {
			Promise
				.all(promises)
				.then(_result => {
					let _data = [];
					for (let idx = 0; idx < 5; idx++) {
						_data.push({
							time: parseInt(_result[idx].time),
							prize: parseFloatNumber(parseInt(_result[idx].wonAmt) / 1e18, 18) + parseFloatNumber(parseInt(_result[idx].performanceFee) / 1e18, 18),
							totalTickets: parseFloatNumber(parseInt(_result[idx].totalTickets) / 1e18, 18),
							winner: _result[idx].winner || _result[idx].user
						});
					}
					_data = sortArray(_data, 'time', false);
					prizeHistory = _data;
					return resolve();
				})
				.catch((e) => reject(e));
		});
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
	_clickMaxDeposit();
	_clickMaxWithdraw();
	_approve();
	_deposit();
	_withdraw();
	_harvest();
	function _clickMaxDeposit() {
		$('.max-cake-deposit').click(function(e) {
			e.preventDefault();

			let amount = userDataInCakeNoLossPool.userWantBal ? userDataInCakeNoLossPool.userWantBal : 0;
			
			$('input[type=number][name=deposit_cake_amt]').val(amount);
		});
	}

	function _clickMaxWithdraw() {
		$('.max-cake-withdraw').click(function(e) {
			e.preventDefault();

			let amount = userDataInCakeNoLossPool.userWantCanWithdraw ? userDataInCakeNoLossPool.userWantCanWithdraw : 0;
			$('input[type=number][name=withdraw_cake_amt]').val(amount);
		});
	}

	function _approve() {
		$('.btn-approve-cake-no-loss').click(function(e) {
			e.preventDefault();
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let _token = new web3.eth.Contract(TOKEN_ABI, CAKE_TOKEN_ADDR);

			_token
				.methods
				.approve(CAKE_NO_LOSS_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT)
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

	function _deposit() {
		$('.btn-deposit-cake-no-loss').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=deposit_cake_amt]').val();
			amount = parseFloat(amount);
			// amount = toBN(amount, 18);
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let cakeToken = new web3.eth.Contract(TOKEN_ABI, CAKE_TOKEN_ADDR);
			let noLossPoolContract = new web3.eth.Contract(CAKE_NO_LOSS_POOL_CONTRACT_ABI, CAKE_NO_LOSS_POOL_CONTRACT_ADDR);

			cakeToken
				.methods
				.allowance(userAddr, CAKE_NO_LOSS_POOL_CONTRACT_ADDR)
				.call()
				.then(amountAllow => {
					amountAllow = parseInt(amountAllow) / 10 ** 18;
					if (amountAllow < amount) {
						return _approvelToken();
					}
					return _deposit();
				})
				.catch(e => {
					console.log(e);
				});
			function _approvelToken() {
				let pendingApprovel = false;
				cakeToken.methods.approve(CAKE_NO_LOSS_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT).send({ from: getCurrentAddress() })
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
				noLossPoolContract.methods.deposit(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt) {
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=deposit_cake_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
			}	
		});
	}
	function _withdraw() {
		$('.btn-withdraw-cake-no-loss').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=withdraw_cake_amt]').val();
			amount = parseFloat(amount);
			// amount = toBN(amount, 18);
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let noLossPoolContract = new web3.eth.Contract(CAKE_NO_LOSS_POOL_CONTRACT_ABI, CAKE_NO_LOSS_POOL_CONTRACT_ADDR);

			noLossPoolContract.methods.withdraw(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=withdraw_cake_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
		});
	}
	function _harvest() {
		$('.btn-harvest-farm-turing').click(function(e) {
			e.preventDefault();
			// amount = toBN(amount, 18);
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let farmTuringPoolContract = new web3.eth.Contract(CAKE_NO_LOSS_POOL_CONTRACT_ABI, CAKE_NO_LOSS_POOL_CONTRACT_ADDR);

			farmTuringPoolContract.methods.harvest(userAddr).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                     if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
		});
	}
}