var arrayTuringSwapPoolTVLs = [];
var arrayTuringSwapPoolTradingVols = [];
var arrayTuringSwapPoolUserBalance = [];
var arrayTuringUserRewardPending = [];
var arrayContractTuringSwapPoolUserJoined = [];
$(document).ready(function () {
    initWeb3();
    initVenusPoolContract();
    try {
        loadVenusPoolData();
    } catch (e) {
        reloadVenusPoolData();
    }
    setInterval(function () {
        // Store it in the local storage
        var totalTuringSwapPoolsTVL = getTuringSwapPoolsTotalTVL();
        var totalTuringSwapPoosTradingVol = getTuringSwapPoolsTotalTradingVol();
        if(totalTuringSwapPoolsTVL != 0) {
            localStorage.setItem('turingSwapPoolsTVL', getTuringSwapPoolsTotalTVL());
        }
        if(totalTuringSwapPoosTradingVol != 0) {
            localStorage.setItem('turingSwapPoolsTradingVol', getTuringSwapPoolsTotalTradingVol());
        }
        
        try {
            if(page != null && page === "Dashboard") {
                var totalTuringSwapPoolsUserBalance = getTuringSwapPoolUserBalance();
                if(totalTuringSwapPoolsUserBalance > 0) {
                    localStorage.setItem('totalTuringSwapPoolsUserBalance', totalTuringSwapPoolsUserBalance);
                }
                var totalTuringUserRewardPending = getTuringUserRewardPending();
                if(totalTuringUserRewardPending > 0) {
                    
                    localStorage.setItem('totalTuringUserRewardPending', totalTuringUserRewardPending);
                    localStorage.setItem('arrayContractTuringSwapPoolUserJoined', getContractTuringSwapPoolUserJoined());
                    
                }
                
            }
        } catch (exception) {
            console.log(exception);
        }
    }, 3000);
});
function getContractTuringSwapPoolUserJoined() {
    var arrayContracts = [];
    for (var key in arrayContractTuringSwapPoolUserJoined) {
        arrayContracts.push(arrayContractTuringSwapPoolUserJoined[key]);
    }
    return arrayContracts.join(",");
}
function getTuringUserRewardPending() {
    var totalTuringUserRewardPending = 0;
    for (var key in arrayTuringUserRewardPending) {
        totalTuringUserRewardPending += arrayTuringUserRewardPending[key];
    }
    return totalTuringUserRewardPending;
}

function getTuringSwapPoolUserBalance() {
    var totalTuringSwapPoolsUserBalance = 0;
    for (var key in arrayTuringSwapPoolUserBalance) {
        totalTuringSwapPoolsUserBalance += arrayTuringSwapPoolUserBalance[key];
    }
    return totalTuringSwapPoolsUserBalance;
}

function getTuringSwapPoolsTotalTVL() {
    var totalTuringSwapPoolsTVL = 0;
    for (var key in arrayTuringSwapPoolTVLs) {
        totalTuringSwapPoolsTVL += arrayTuringSwapPoolTVLs[key];
    }
    return totalTuringSwapPoolsTVL;
}

function getTuringSwapPoolsTotalTradingVol() {
    var totalTuringSwapPoosTradingVol = 0;
    for (var key in arrayTuringSwapPoolTradingVols) {
        totalTuringSwapPoosTradingVol += arrayTuringSwapPoolTradingVols[key];
    }
    return totalTuringSwapPoosTradingVol;
}

function getWeb3ToReadData() {
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}
const turingLPPrice = 2;
let farmTuringVenusPoolContract = {};

const CONFIGS = [
    {
        'lp': 'usdt-busd',
        'farmContract': '0xC177D351DD8E69f6727a350c2711B7CfC208AFD2'
    },
    {
        'lp': 'usdc-busd',
        'farmContract': '0x5008c518063C907eb3234b0aB6273d843d81FFf9'
    },
    {
        'lp': 'dai-busd',
        'farmContract': '0x3Dc50B71e630a6E4B07f7d406faEb4f4Bb470A50'
    },
    {
        'lp': 'vai-busd',
        'farmContract': '0x5bf342bb704d55fDfC4c9B2E2fA1292f543dC8dc'
    }
];

function findFarmContractByLP(lp) {
    for (let idx = 0; idx < CONFIGS.length; idx++) {
        if(CONFIGS[idx].lp === lp) {
            return CONFIGS[idx].farmContract;
        }
    }
}

const LP_CONTRACT_ABI = [
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
                "name": "userTuringPending_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userWantShare_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tradeAPY_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "supplyAPY_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "xvsAPY_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vol_",
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

function  initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
}
function initVenusPoolContract() {
    for (let idx = 0; idx < CONFIGS.length; idx++) {
        if (!farmTuringVenusPoolContract[CONFIGS[idx].lp]) {
            const _web3 = getWeb3ToReadData();
            farmTuringVenusPoolContract[CONFIGS[idx].lp] = new _web3.eth.Contract(LP_CONTRACT_ABI, CONFIGS[idx].farmContract);
        }
    }
    setTimeout(function () {
        initVenusPoolContract();
    }, 3000);
}
function numberWithCommas(x, decimals = 3) {
    if (isNaN(x) == true)
        x = 0;
    x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
    x = parseFloat(x).toFixed(decimals);
    x = parseFloat(x).toString();
    x = x.split(".");
    x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    x = x.join('.');
    return x;
}
function formatBalance(labelValue, decimals = 2) {
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
    if (!window)
        return null;
    if (!window.ethereum)
        return null;
    if (window.ethereum.selectedAddress == '')
        return null;
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
    array.sort(function (a, b) {
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
function dealNum(val) {
    var str = Math.floor(val)
    return (str < 10 ? '0' : '') + str
}
function reloadVenusPoolData() {
    setTimeout(function () {
        loadVenusPoolData();
    }, 3000);
}
function loadVenusPoolData() {
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadVenusPoolData();
    }
    $('.user-addr').html(`${userAddr.slice(0, 5)}...${userAddr.slice(-5)}`);

    try {
        for (let idx = 0; idx < CONFIGS.length; idx++) {
            if (farmTuringVenusPoolContract[CONFIGS[idx].lp]) {
                initVenusPool(CONFIGS[idx].lp, userAddr)
            }
        }
        return reloadVenusPoolData();
    } catch (e) {
        return reloadVenusPoolData();
    }
}

function initVenusPool(lp, userAddr) {
    try {
        if (!farmTuringVenusPoolContract[lp]) {
            return false;
        }
        farmTuringVenusPoolContract[lp]
                .methods
                .getData(userAddr)
                .call()
                .then(_updateUserData)
                .catch(_error);
        function _updateUserData(_result) {
            let _userDataInFarmTuringPool = {};
            _userDataInFarmTuringPool.miningSpeed = parseInt(_result.miningSpeed_);
            _userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result.userWantBal_) / 1e18, 1e18), 18);
            _userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
            _userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result.totalMintPerDay_) / 1e18, 18);
            _userDataInFarmTuringPool.userWantShare = parseFloatNumber(parseInt(_result.userWantShare_) / 1e18, 18); // turing LP
            _userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
            arrayTuringSwapPoolTVLs[lp] = _userDataInFarmTuringPool.tvl * turingLPPrice;
            _userDataInFarmTuringPool.vol = parseFloatNumber(parseInt(_result.vol_) / 1e18, 18);
            arrayTuringSwapPoolTradingVols[lp] = _userDataInFarmTuringPool.vol;
            _userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
            _userDataInFarmTuringPool.tradeAPY = parseFloatNumber(parseInt(_result.tradeAPY_) / 1e10, 10);
            _userDataInFarmTuringPool.supplyAPY = parseFloatNumber(parseInt(_result.supplyAPY_) / 1e10, 10);
            _userDataInFarmTuringPool.xvsAPY = parseFloatNumber(parseInt(_result.xvsAPY_) / 1e10, 10);
            _userDataInFarmTuringPool.turingRewardAPY = 0;

            if (_userDataInFarmTuringPool.tvl > 0) {
                _userDataInFarmTuringPool.turingRewardAPY = _userDataInFarmTuringPool.totalMintPerDay * _userDataInFarmTuringPool.turingPrice * 36500 / (_userDataInFarmTuringPool.tvl * turingLPPrice);
            }

            if (_userDataInFarmTuringPool.userWantShare <= 0) {
                _userDataInFarmTuringPool.userTuringPending = 0;
            }
            
            if(page != null && page === "Dashboard") {
                arrayTuringSwapPoolUserBalance[lp] = _userDataInFarmTuringPool.userWantShare * turingLPPrice;
                arrayTuringUserRewardPending[lp] = _userDataInFarmTuringPool.userTuringPending;
            }

            _drawUI(_userDataInFarmTuringPool);
        }
        function _drawUI(_userDataInFarmTuringPool) {

            let _venusAPY = _userDataInFarmTuringPool.supplyAPY + _userDataInFarmTuringPool.xvsAPY;
            let _poolAPY = _userDataInFarmTuringPool.turingRewardAPY + _venusAPY + _userDataInFarmTuringPool.tradeAPY;
            $(`.farm-turing-${lp}-venus-lp-pool-tvl`).html(`$${formatBalance(_userDataInFarmTuringPool.tvl * turingLPPrice, 2)}`);
            $(`.farm-turing-${lp}-venus-lp-pool-vol`).html(`$${formatBalance(_userDataInFarmTuringPool.vol, 2)}`);
            $(`.farm-turing-${lp}-venus-lp-pool-apy`).html(`${formatBalance(_poolAPY, 2)}`);
            $(`.farm-turing-${lp}-venus-lp-pool-apy-turing`).html(`${formatBalance(_userDataInFarmTuringPool.turingRewardAPY, 2)}`);
            $(`.farm-turing-${lp}-venus-lp-pool-apy-venus`).html(`${formatBalance(_venusAPY, 2)}`);
            $(`.farm-turing-${lp}-venus-lp-pool-apy-trade`).html(`${formatBalance(_userDataInFarmTuringPool.tradeAPY, 2)}`);
            if(_userDataInFarmTuringPool.userWantShare > 0) {
                $(`.farm-turing-${lp}-venus-lp-pool-user-balance`).html(`${formatBalance(_userDataInFarmTuringPool.userWantShare, 2)}`);
                arrayContractTuringSwapPoolUserJoined[lp] = findFarmContractByLP(lp);
            }
            else {
                if(page != null && page === "Dashboard") {
                    $(`.farm-turing-${lp}-venus-lp-pool`).hide();
                }
            }

            return true;
        }
        function _error(_e) {
            console.log("initVenusPool", _e);
            return false;
        }
    } catch (e) {
        console.log("initVenusPool 2222222", _e);
        return false;
    }
}