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
    // const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}

const FARM_TURING_POOL_CONTRACT_ADDR = '0x47618462aba45EF82adcEe1a6929138f93dccEd8';
const TURING_TOKEN_ADDR = '0x5e6Fb2B4EC55F43480d5B6408c9d73d58b0ced98';
let farmTuringPoolContract;
let userDataInFarmTuringPool = {};
let prizeHistory = [];
const FARM_TURING_POOL_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "contract IPancakeSwapRouter",
				"name": "_pancakeSwap",
				"type": "address"
			},
			{
				"internalType": "contract IBEP20",
				"name": "_tur",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastTimeOf",
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
		farmTuringPoolContract = new _web3.eth.Contract(FARM_TURING_POOL_CONTRACT_ABI, FARM_TURING_POOL_CONTRACT_ADDR);
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
		userDataInFarmTuringPool.userTuringBal = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringBal_) / 1e18, 18), 18);
		userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result.userBNBBal_) / 1e18, 18);
		userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
		userDataInFarmTuringPool.userTuringShare = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringShare_) / 1e18, 18), 18);
		userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
		userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
		userDataInFarmTuringPool.turingRewardAPY = parseFloatNumber(parseInt(_result.turingRewardAPY_) / 1e2, 2);
		

		_drawUI();
	}	
	function _drawUI() {

		$('.farm-turing-pool-your-stake').html(numberWithCommas(userDataInFarmTuringPool.userTuringShare, 2));
		$('.farm-turing-pool-your-earned').html(numberWithCommas(userDataInFarmTuringPool.userTuringPending, 2));
		$('.farm-turing-pool-total-supply').html(numberWithCommas(userDataInFarmTuringPool.tvl, 2));
		$('.farm-turing-pool-user-turing-bal').html(numberWithCommas(userDataInFarmTuringPool.userTuringBal, 2));
		$('.farm-turing-pool-user-turing-state').html(numberWithCommas(userDataInFarmTuringPool.userTuringShare, 2));
		$('.farm-turing-pool-apy').html(`${numberWithCommas(userDataInFarmTuringPool.turingRewardAPY, 2)}%`);

		return reloadData();
	}
	function _error(_e) {
		return reloadData();
	}	
}
function initUserAction() {
	_clickMaxDeposit();
	_clickMaxWithdraw();
	_deposit();
	_withdraw();
	_harvest();

	function _clickMaxDeposit() {
		$('.farm-turing-pool-max-turing-deposit').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmTuringPool.userTuringBal ? userDataInFarmTuringPool.userTuringBal : 0;
			
			$('input[type=number][name=farm_turing_pool_deposit_turing_amt]').val(amount);
		});
	}

	function _clickMaxWithdraw() {
		$('.farm-turing-pool-max-turing-withdraw').click(function(e) {
			e.preventDefault();

			let amount = userDataInFarmTuringPool.userTuringShare ? userDataInFarmTuringPool.userTuringShare : 0;
			$('input[type=number][name=farm_turing_pool_withdraw_turing_amt]').val(amount);
		});
	}

	function _deposit() {
		$('.btn-deposit-farm-turing').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_turing_pool_deposit_turing_amt]').val();
			amount = parseFloat(amount);
			// amount = toBN(amount, 18);
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let cakeToken = new web3.eth.Contract(TOKEN_ABI, TURING_TOKEN_ADDR);
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_POOL_CONTRACT_ABI, FARM_TURING_POOL_CONTRACT_ADDR);

			cakeToken
				.methods
				.allowance(userAddr, FARM_TURING_POOL_CONTRACT_ADDR)
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
				cakeToken.methods.approve(FARM_TURING_POOL_CONTRACT_ADDR, ALLOW_LIMIT_AMT).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    if (receipt.status && pendingApprovel == false) {
	                    	pendingApprovel = true;
	                        return _deposit();
	                    } 
	                });
					
			}	
			function _deposit() {
				farmTuringPoolContract.methods.deposit(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    
	                });
			}	
		});
	}
	function _withdraw() {
		$('.btn-withdraw-farm-turing').click(function(e) {
			e.preventDefault();
			let amount = $('input[type=number][name=farm_turing_pool_withdraw_turing_amt]').val();
			amount = parseFloat(amount);
			// amount = toBN(amount, 18);
			let userAddr = getCurrentAddress();
			if (!userAddr) {
				return false;
			}
			if (typeof web3 == 'undifined') {
				return false;
			}
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_POOL_CONTRACT_ABI, FARM_TURING_POOL_CONTRACT_ADDR);

			farmTuringPoolContract.methods.withdraw(toBN(amount, 18)).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    
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
			let farmTuringPoolContract = new web3.eth.Contract(FARM_TURING_POOL_CONTRACT_ABI, FARM_TURING_POOL_CONTRACT_ADDR);

			farmTuringPoolContract.methods.harvest(userAddr).send({ from: getCurrentAddress() })
					.on('transactionHash', function(hash) {
	                
	                })
	                .on('confirmation', function(confirmationNumber, receipt){
	                    
	                });
		});
	}
	
}