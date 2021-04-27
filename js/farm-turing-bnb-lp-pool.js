$(document).ready(function() {
    initWeb3();
    initFarmPoolContract();
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
const turingBNBLPPrice = 90;
const FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR = '0xbFeE817d038aEb8b773e69844b6c6c7c14419455';
const TURING_BNB_LP_TOKEN_ADDR = '0xCF8b7E1F36d46c1352eB923E0058643a9594804C';
let farmTuringPoolContract;
let userDataInFarmTuringPool = {};
let prizeHistory = [];
const FARM_TURING_BNB_LP_POOL_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "_pancakeSwap",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_want",
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
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			}
		],
		"name": "onCancelTransactions",
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
		"name": "onDeposit",
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
		"name": "onEmergencyWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_fieldName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_value",
				"type": "address"
			}
		],
		"name": "onQueuedTransactionsChangeAddress",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_fieldName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "onQueuedTransactionsChangeUint",
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
		"inputs": [],
		"name": "GRACE_PERIOD",
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
		"name": "MAXIMUM_DELAY",
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
		"name": "MINIMUM_DELAY",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			}
		],
		"name": "cancelTransactions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeTokenAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "delay",
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
		"name": "emergencyWithdraw",
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
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "miningSpeed_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userTuringBal_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userWantBal_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "turingPrice_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalMintPerDay_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userBNBBal_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userTuringPending_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userTuringShare_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "turingRewardAPY_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tvl_",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "harvest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_pendingTur",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bonus",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fieldName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newAddr",
				"type": "address"
			}
		],
		"name": "queuedTransactionsChangeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_functionName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fieldName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "queuedTransactionsChangeUint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "delay_",
				"type": "uint256"
			}
		],
		"name": "setDelay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setMiningMachine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setPancakeSwapContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setPidOfMining",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "timeLockOf",
		"outputs": [
			{
				"internalType": "bool",
				"name": "queuedTransactions",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timeOfExecute",
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
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"stateMutability": "payable",
		"type": "receive"
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
function initFarmPoolContract() {
	if (!farmTuringPoolContract) {
		const _web3 = getWeb3ToReadData();
		farmTuringPoolContract = new _web3.eth.Contract(FARM_TURING_BNB_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR);
	}
	setTimeout(function(){ 
		initFarmPoolContract();
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
	if (!farmTuringPoolContract) {
		return reloadData();
	}
	let userAddr = getCurrentAddress();
	if (!userAddr) {
		return reloadData();
	}
	$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

	farmTuringPoolContract
		.methods
		.getData(userAddr)
		.call()
		.then(_updateUserData)
		.catch(_error);
	function _updateUserData(_result) {
		userDataInFarmTuringPool.miningSpeed = parseInt(_result.miningSpeed_); 
		userDataInFarmTuringPool.userTuringBal = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringBal_) / 1e18, 1e18), 18); // turing LP
		userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result.userWantBal_) / 1e18, 1e18), 18);
		userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result.userBNBBal_) / 1e18, 18);
		userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
		userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result.totalMintPerDay_) / 1e18, 18);
		userDataInFarmTuringPool.userTuringShare = parseFloatNumber(parseInt(_result.userTuringShare_) / 1e18, 18); // turing LP
		userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
		userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
		userDataInFarmTuringPool.turingRewardAPY = 0;

		if (userDataInFarmTuringPool.tvl > 0) {
			userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500  / ( userDataInFarmTuringPool.tvl * turingBNBLPPrice);
		}		

		if (userDataInFarmTuringPool.userTuringShare <= 0) {
			userDataInFarmTuringPool.userTuringPending = 0;
		}
		
		_drawUI();
	}	
	function _drawUI() {
		$('.farm-turing-bnb-lp-pool-your-stake').html(formatBalance(userDataInFarmTuringPool.userTuringShare, 2));
		$('.farm-turing-bnb-lp-pool-your-earned').html(formatBalance(userDataInFarmTuringPool.userTuringPending, 6));
		$('.farm-turing-bnb-lp-pool-total-supply').html(`$${formatBalance(userDataInFarmTuringPool.tvl * turingBNBLPPrice, 2)}`);
		$('.farm-turing-bnb-lp-pool-user-turing-lp-bal').html(numberWithCommas(userDataInFarmTuringPool.userWantBal, 2));
		$('.farm-turing-bnb-lp-pool-user-turing-lp-state').html(numberWithCommas(userDataInFarmTuringPool.userTuringShare, 2));
		$('.farm-turing-bnb-lp-pool-apy-turing').html(`${formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2)}%`);

		return reloadData();
	}
	function _error(_e) {
		return reloadData();
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
		$('.farm-turing-bnb-lp-pool-max-turing-lp-deposit').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmTuringPool.userTuringBal ? userDataInFarmTuringPool.userTuringBal : 0;
			
			$('input[type=number][name=farm_turing_bnb_lp_pool_deposit_turing_lp_amt]').val(amount);
		});
	}

	function _clickMaxWithdraw() {
		$('.farm-turing-bnb-lp-pool-max-turing-lp-withdraw').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmTuringPool.userTuringShare ? userDataInFarmTuringPool.userTuringShare : 0;
			$('input[type=number][name=farm_turing_bnb_lp_pool_withdraw_turing_lp_amt]').val(amount);
		});
	}
	function _approve() {
		$('.btn-approve-farm-turing-bnb-lp').click(function(e) {
			e.preventDefault();
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let _token = new web3.eth.Contract(TOKEN_ABI, TURING_BNB_LP_TOKEN_ADDR);
			_token
				.methods
				.approve(FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT)
				.send({ from: getCurrentAddress() })
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
	function _deposit() {
		$('.btn-deposit-farm-turing-bnb-lp').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_turing_bnb_lp_pool_deposit_turing_lp_amt]').val();
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
			let cakeToken = new web3.eth.Contract(TOKEN_ABI, TURING_BNB_LP_TOKEN_ADDR);
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_BNB_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR);

			cakeToken
				.methods
				.allowance(userAddr, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR)
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
				cakeToken.methods.approve(FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT).send({ from: getCurrentAddress() })
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
				farmTuringPoolContract.methods.deposit(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=farm_turing_bnb_lp_pool_deposit_turing_lp_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
			}	
		});
	}
	function _withdraw() {
		$('.btn-withdraw-farm-turing-bnb-lp').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_turing_bnb_lp_pool_withdraw_turing_lp_amt]').val();
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
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_BNB_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR);

			farmTuringPoolContract.methods.withdraw(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                     if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=farm_turing_bnb_lp_pool_withdraw_turing_lp_amt]').val('');
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
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_BNB_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR);

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