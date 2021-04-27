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
const usdtBNBLPPrice = 45;
const FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR = '0xb2Bd7C2D2577d8Cb95ed31e7E388b2D846626E0e';
const LP_TOKEN_ADDR = '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE';
let farmUsdtBNBLPPoolContract;
let userDataInFarmUSDTBNBLPPool = {};
let prizeHistory = [];
const FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "_pancakeSwap",
				"type": "address"
			},
			{
				"internalType": "contract IPancakeMasterChef",
				"name": "_pancakeMasterChef",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_want",
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
		"name": "CAKE",
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
		"name": "accWantPerShare",
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
		"name": "approveConnectToPancake",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "controllerMachine",
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
			}
		],
		"name": "getAddressChangeOnTimeLock",
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
		"name": "getCakePrice",
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
				"internalType": "uint256[11]",
				"name": "data_",
				"type": "uint256[11]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalRewardPerDay",
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
			}
		],
		"name": "getUintChangeOnTimeLock",
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
		"outputs": [],
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "pendingCakeOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_pendingCake",
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
		"name": "periodOfDay",
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
		"name": "pidOfFarm",
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
		"inputs": [],
		"name": "rateOfControllerFee",
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
		"name": "rewardWantDebtOf",
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
		"name": "setControllerMachine",
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
		"name": "setPancakeMasterChefContract",
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
		"name": "setPerformanceMachine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setPidOfFarm",
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
		"inputs": [],
		"name": "setRateOfControllerFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setRateOfPerformanceFee",
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
		"name": "timeOfHarvest",
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
	if (!farmUsdtBNBLPPoolContract) {
		const _web3 = getWeb3ToReadData();
		farmUsdtBNBLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR);
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
	if (!farmUsdtBNBLPPoolContract) {
		return reloadData();
	}
	let userAddr = getCurrentAddress();
	if (!userAddr) {
		return reloadData();
	}
	$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

	farmUsdtBNBLPPoolContract
		.methods
		.getData(userAddr)
		.call()
		.then(_updateUserData)
		.catch(_error);
	function _updateUserData(_result) {

		userDataInFarmUSDTBNBLPPool.miningSpeed = parseInt(_result[0]); 
		userDataInFarmUSDTBNBLPPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
		userDataInFarmUSDTBNBLPPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
		userDataInFarmUSDTBNBLPPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
		userDataInFarmUSDTBNBLPPool.turingRewardAPY = 0;
		userDataInFarmUSDTBNBLPPool.wantRewardAPY = 0;
		if (userDataInFarmUSDTBNBLPPool.tvl > 0) {
			userDataInFarmUSDTBNBLPPool.turingRewardAPY = userDataInFarmUSDTBNBLPPool.totalMintPerDay * userDataInFarmUSDTBNBLPPool.turingPrice * 36500 / (userDataInFarmUSDTBNBLPPool.tvl * usdtBNBLPPrice);
			userDataInFarmUSDTBNBLPPool.wantRewardAPY = userDataInFarmUSDTBNBLPPool.totalWantRewardPerDay * userDataInFarmUSDTBNBLPPool.cakePrice * 36500 / (userDataInFarmUSDTBNBLPPool.tvl * usdtBNBLPPrice);	 

		}
		_drawUI();
	}	
	function _drawUI() {

		$('.farm-usdt-bnb-lp-pool-your-stake').html(formatBalance(userDataInFarmUSDTBNBLPPool.userWantShare, 2));
		$('.farm-usdt-bnb-lp-pool-your-earned').html(`${formatBalance(userDataInFarmUSDTBNBLPPool.userTuringPending, 6)} TURING ${formatBalance(userDataInFarmUSDTBNBLPPool.userCakePending, 6)} CAKE`);
		$('.farm-usdt-bnb-lp-pool-total-supply').html(`$${formatBalance(userDataInFarmUSDTBNBLPPool.tvl * usdtBNBLPPrice, 2)}`);
		$('.farm-usdt-bnb-lp-pool-user-usdt-bnb-lp-bal').html(numberWithCommas(userDataInFarmUSDTBNBLPPool.userWantBal, 2));
		$('.farm-usdt-bnb-lp-pool-user-usdt-bnb-lp-state').html(numberWithCommas(userDataInFarmUSDTBNBLPPool.userWantShare, 2));
		$('.farm-usdt-bnb-lp-pool-apy').html(`${formatBalance(userDataInFarmUSDTBNBLPPool.wantRewardAPY, 2)}%`);
		$('.farm-usdt-bnb-lp-pool-turing-apy').html(`${formatBalance(userDataInFarmUSDTBNBLPPool.turingRewardAPY, 2)}%`);

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
		$('.farm-usdt-bnb-lp-pool-max-usdt-bnb-lp-deposit').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmUSDTBNBLPPool.userWantBal ? userDataInFarmUSDTBNBLPPool.userWantBal : 0;
			
			$('input[type=number][name=farm_usdt_bnb_lp_pool_deposit_usdt_bnb_lp_amt]').val(amount);
		});
	}

	function _clickMaxWithdraw() {
		$('.farm-usdt-bnb-lp-pool-max-usdt-bnb-lp-withdraw').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmUSDTBNBLPPool.userWantShare ? userDataInFarmUSDTBNBLPPool.userWantShare : 0;
			$('input[type=number][name=farm_usdt_bnb_lp_pool_withdraw_usdt_bnb_lp_amt]').val(amount);
		});
	}

	function _approve() {
		$('.btn-approve-farm-usdt-bnb-lp').click(function(e) {
			e.preventDefault();
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let _transactionHistory = {}; 
			let _token = new web3.eth.Contract(TOKEN_ABI, LP_TOKEN_ADDR);
			_token
				.methods
				.approve(FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT)
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
		$('.btn-deposit-farm-usdt-bnb-lp').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_usdt_bnb_lp_pool_deposit_usdt_bnb_lp_amt]').val();
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
			let _token = new web3.eth.Contract(TOKEN_ABI, LP_TOKEN_ADDR);
			let _contract = new web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR);

			_token
				.methods
				.allowance(userAddr, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR)
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
				_token
					.methods
					.approve(FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT)
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
				_contract
					.methods
					.deposit(toBN(amount, 18))
					.send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=farm_usdt_bnb_lp_pool_deposit_usdt_bnb_lp_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
			}	
		});
	}
	function _withdraw() {
		$('.btn-withdraw-farm-usdt-bnb-lp').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_usdt_bnb_lp_pool_withdraw_usdt_bnb_lp_amt]').val();
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
			let _contract = new web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR);

			_contract
				.methods
				.withdraw(toBN(amount, 18))
				.send({ from: getCurrentAddress() })
				.on('transactionHash', function(hash) {
	                _showPopup('confirm-popup');
	            })
	            .on('confirmation', function(confirmationNumber, receipt){
	                if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
						$('input[type=number][name=farm_usdt_bnb_lp_pool_withdraw_usdt_bnb_lp_amt]').val('');
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
			let _contract = new web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR);

			_contract
				.methods
				.harvest(userAddr)
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
	
}