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
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.defibit.io';
    // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}

const FARM_CAKE_POOL_CONTRACT_ADDR = '0xeABC96b9bE830af31846053e361d25e7D928E638';
const CAKE_TOKEN_ADDR = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';
let farmCakePoolContract;
let userDataInFarmCakePool = {};
let prizeHistory = [];

const FARM_CAKE_POOL_CONTRACT_ABI = [
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
		"inputs": [
			{
				"internalType": "contract IMiningMachine",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "setMiningMachine",
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
		"stateMutability": "payable",
		"type": "receive"
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
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256[12]",
				"name": "data_",
				"type": "uint256[12]"
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
		"name": "pendingWantOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_pendingWant",
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
	if (!farmCakePoolContract) {
		const _web3 = getWeb3ToReadData();
		farmCakePoolContract = new _web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_CONTRACT_ADDR);
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
	if (!farmCakePoolContract) {
		return reloadData();
	}
	let userAddr = getCurrentAddress();
	if (!userAddr) {
		return reloadData();
	}
	$('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

	farmCakePoolContract
		.methods
		.getData(userAddr)
		.call()
		.then(_updateUserData)
		.catch(_error);
	function _updateUserData(_result) {

		userDataInFarmCakePool.miningSpeed = parseInt(_result[0]); 
		userDataInFarmCakePool.userWantBal = parseFloatNumber(parseInt(_result[1]) / 1e18, 18);
		userDataInFarmCakePool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
		userDataInFarmCakePool.wantPrice = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
		userDataInFarmCakePool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
		userDataInFarmCakePool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
		userDataInFarmCakePool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
		userDataInFarmCakePool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
		userDataInFarmCakePool.userWantShare = parseFloatNumber(parseInt(_result[8]) / 1e18, 18);
		userDataInFarmCakePool.turingRewardAPY = 0;
		if (parseInt(_result[9]) > 0) {
			userDataInFarmCakePool.turingRewardAPY = parseFloatNumber(parseInt(_result[9]) / 1e2, 2);
		}
		if (parseInt(_result[10]) > 0) {
			userDataInFarmCakePool.wantRewardAPY = parseFloatNumber(parseInt(_result[10]) / 1e2, 2);
		}
		userDataInFarmCakePool.tvl = parseFloatNumber(parseInt(_result[11]) / 1e18, 18);
		_drawUI();
	}	
	function _drawUI() {
		$('.farm-cake-pool-your-stake').html(formatBalance(userDataInFarmCakePool.userWantShare, 6));
		$('.farm-cake-pool-your-earned').html(formatBalance(userDataInFarmCakePool.userTuringPending, 6));
		$('.farm-cake-pool-total-supply').html(`$${formatBalance(userDataInFarmCakePool.tvl * userDataInFarmCakePool.wantPrice, 2)}`);
		$('.farm-cake-pool-user-cake-bal').html(numberWithCommas(userDataInFarmCakePool.userWantBal, 6));
		$('.farm-cake-pool-user-cake-state').html(numberWithCommas(userDataInFarmCakePool.userWantShare, 6));
		$('.farm-cake-pool-apy').html(`${formatBalance((userDataInFarmCakePool.wantRewardAPY + userDataInFarmCakePool.turingRewardAPY), 2)}%`);
		$('.farm-cake-pool-apy-cake').html(`${formatBalance((userDataInFarmCakePool.wantRewardAPY), 2)}%`);
		$('.farm-cake-pool-turing-apy').html(`${formatBalance((userDataInFarmCakePool.turingRewardAPY), 2)}%`);

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
		$('.farm-cake-pool-max-cake-deposit').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmCakePool.userWantBal ? userDataInFarmCakePool.userWantBal : 0;
			
			$('input[type=number][name=farm_cake_pool_deposit_cake_amt]').val(amount);
		});
	}

	function _clickMaxWithdraw() {
		$('.farm-cake-pool-max-cake-withdraw').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmCakePool.userWantShare ? userDataInFarmCakePool.userWantShare : 0;
			$('input[type=number][name=farm_cake_pool_withdraw_cake_amt]').val(amount);
		});
	}
	function _approve() {
		$('.btn-approve-farm-cake').click(function(e) {
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
				.approve(FARM_CAKE_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT)
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
		$('.btn-deposit-farm-cake').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_cake_pool_deposit_cake_amt]').val();
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
			let farmPoolContract = new web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_CONTRACT_ADDR);

			cakeToken
				.methods
				.allowance(userAddr, FARM_CAKE_POOL_CONTRACT_ADDR)
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
				cakeToken.methods.approve(FARM_CAKE_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT).send({ from: getCurrentAddress() })
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
				farmPoolContract.methods.deposit(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=farm_cake_pool_deposit_cake_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
			}	
		});
	}
	function _withdraw() {
		$('.btn-withdraw-farm-cake').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_cake_pool_withdraw_cake_amt]').val();
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
			let farmPoolContract = new web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_CONTRACT_ADDR);

			farmPoolContract.methods.withdraw(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                	_showPopup('confirm-popup');
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
							_transactionHistory[receipt.transactionHash] = true;
							$('input[type=number][name=farm_cake_pool_withdraw_cake_amt]').val('');
							_hidePopup('confirm-popup', 0);
							_showPopup('success-confirm-popup');
							_hidePopup('success-confirm-popup', 10000);
						} 
	                });
		});
	}
	function _harvest() {
		$('.btn-harvest-farm-cake').click(function(e) {
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
			let farmPoolContract = new web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_CONTRACT_ADDR);

			farmPoolContract.methods.harvest(userAddr).send({ from: getCurrentAddress() })
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