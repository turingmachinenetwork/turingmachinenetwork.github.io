var arrayTVLs = [];
var arrayUserBalance = [];
var arrayUserTuringReward = [];
var arrayContractFarmUserJoined = [];
$(document).ready(function () {
    initWeb3();
    initCakeNoLossPoolContract();
    
    try {
        initFarmPoolContract();
    } catch (e) {
        console.log("initFarmPoolContract", e);
    }

    try {
        loadCakeNoLossData();
    } catch (e) {
        reloadCakeNoLossData();
    }
    try {
        loadFarmTuringBNBLPPoolData();
    } catch (e) {
        reloadFarmTuringBNBLPPoolData();
    }
    try {
        loadFarmCakePoolData();
    } catch (e) {
        reloadFarmCakePoolData();
    }
    try {
        loadFarmCakePoolV2Data();
    } catch (e) {
        reloadFarmCakePoolV2Data();
    }
    try {
        loadFarmCakeBNBLPPoolData();
    } catch (e) {
        reloadFarmCakeBNBLPPoolData();
    }

    try {
        loadFarmUSDTBUSDLPPoolData();
    } catch (e) {
        reloadFarmUSDTBUSDLPPoolData();
    }
    // V2
    try {
        loadFarmTuringBNBLPPoolV2Data();
    } catch (e) {
        reloadFarmTuringBNBLPPoolV2Data();
    }

    try {
        loadFarmCakeBNBLPPoolV2Data();
    } catch (e) {
        reloadFarmCakeBNBLPPoolV2Data();
    }
    try {
        loadFarmUSDTBUSDLPPoolV2Data();
    } catch (e) {
        reloadFarmUSDTBUSDLPPoolV2Data();
    }
    try {
        loadFarmUSDTBNBLPPoolData();
    } catch (e) {
        reloadFarmUSDTBNBLPPoolData();
    }

    try {
        loadFarmBUSDBNBLPPoolData();
    } catch (e) {
        reloadFarmBUSDBNBLPPoolData();
    }

    try {
        loadFarmBTCBBNBLPPoolData();
    } catch (e) {
        reloadFarmBTCBBNBLPPoolData();
    }

    try {
        loadFarmETHBNBLPPoolData();
    } catch (e) {
        reloadFarmETHBNBLPPoolData();
    }

    initUserActionForMain();
    setInterval(function () {
        // Get it from the local storage
        var turingSwapPoolsTVL = localStorage.getItem('turingSwapPoolsTVL'); //set on venus-pool-main.js
        var totalTVL = parseFloat(turingSwapPoolsTVL) + parseFloat(getSystemTotalTVL());
        $('#total-system-tvl').html(`${formatBalance(totalTVL, 2)}`);
        var turingSwapPoolsTradingVol = parseFloat(localStorage.getItem('turingSwapPoolsTradingVol')); //set on venus-pool-main.js
        
        $('#total-trading-vol').html(`${formatBalance(turingSwapPoolsTradingVol, 2)}`);
        
        try {
            if(page) {
                if(page != null && page === "Dashboard") {
                    var totalTuringSwapPoolsUserBalance = localStorage.getItem('totalTuringSwapPoolsUserBalance'); //set on venus-pool-main.js
                    var totalUserBalance = parseFloat(totalTuringSwapPoolsUserBalance) + parseFloat(getTotalUserBalance());
                    $('#total-user-balance').html(`${formatBalance(totalUserBalance, 2)}`);
                    var totalTuringUserRewardPending = parseFloat(localStorage.getItem('totalTuringUserRewardPending')) + parseFloat(getUserTuringReward()); //set on venus-pool-main.js
                    $('#total-user-reward').html(`${formatBalance(totalTuringUserRewardPending, 2)}`);
                }
            }
        } catch (exception) {
            
        }

    }, 3000);
    
});

function getContractUserJoined() {
    var arrayContracts = [];
    for (var key in arrayContractFarmUserJoined) {
        arrayContracts.push(arrayContractFarmUserJoined[key]);
    }
    var arrayContractTuringSwapPoolUserJoined = localStorage.getItem('arrayContractTuringSwapPoolUserJoined'); //set on venus-pool-main.js
    arrayContractTuringSwapPoolUserJoined = arrayContractTuringSwapPoolUserJoined.split(",");
    return arrayContracts.concat(arrayContractTuringSwapPoolUserJoined);
}

function getUserTuringReward () {
    var totalUserTuringReward = 0;
    for (var key in arrayUserTuringReward) {
        totalUserTuringReward += arrayUserTuringReward[key];
    }
    return totalUserTuringReward;
}

function getTotalUserBalance () {
    var totalUserBalance = 0;
    for (var key in arrayUserBalance) {
        totalUserBalance += arrayUserBalance[key];
    }
    return totalUserBalance;
}

function getSystemTotalTVL() {
    var totalSystemTVL = 0;
    for (var key in arrayTVLs) {
        totalSystemTVL += arrayTVLs[key];
    }
    return totalSystemTVL;
}

function getWeb3ToReadDataForMain() {
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}
function getWeb3ToReadDataOnTestnetForMain() {
    // const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}
const turingBNBLPPrice = 30;
const cakeLPPrice = 256;
const usdtBusdLPPrice = 2;
const usdtBNBLPPrice = 45;
const busdBNBLPPrice = 48;
const btcbBNBLPPrice = 12000;
const ethBNBLPPrice = 3300;

const TURING_HARVEST_MACHINE_ADDR = '0xde43520a7BB65535208512159fe5448636067a06';

const FARM_USDT_BUSD_LP_POOL_CONTRACT_ADDR = '0x2c184b922681882A9b277EE4090170B71E99e74E';
const FARM_USDT_BUSD_LP_POOL_CONTRACT_V2_ADDR = '0xc8a61e2d78697C41D81752831c436AaC846464d7';
const FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR = '0xb2Bd7C2D2577d8Cb95ed31e7E388b2D846626E0e';
const FARM_BUSD_BNB_LP_POOL_CONTRACT_ADDR = '0x9d75212AC8f9Edbd1901Af67b550779Cef14dB8d';
const FARM_BTCB_BNB_LP_POOL_CONTRACT_ADDR = '0xCFa7F1485FBDC29F52662A8E2D3F247539Df51DC';
const FARM_ETH_BNB_LP_POOL_CONTRACT_ADDR = '0x1C9CcF44d143aE86fAaDD2A42197c0d281511a32';

const FARM_CAKE_LP_POOL_CONTRACT_ADDR = '0x588Cd06bED000f5979259473712BA6918b73304a';
const FARM_CAKE_LP_POOL_CONTRACT_V2_ADDR = '0xc4758e432de36BC3F44f383FCF9A61D0Ce2a9e64';
const FARM_CAKE_POOL_CONTRACT_ADDR = '0xeABC96b9bE830af31846053e361d25e7D928E638';
const FARM_CAKE_POOL_V2_CONTRACT_ADDR = '0xFdE9BC72F9791B738FC47aeB07f426243b25E6a3'; //
// const FARM_TURING_POOL_CONTRACT_ADDR = '0x47618462aba45EF82adcEe1a6929138f93dccEd8';
const FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR = '0xbFeE817d038aEb8b773e69844b6c6c7c14419455';
const FARM_TURING_BNB_LP_POOL_CONTRACT_V2_ADDR = '0xcb3B1A0905ADe6C7D1dB17fD92409dA057df7ec3';
const CAKE_NO_LOSS_POOL_CONTRACT_ADDR = '0x98292750578aa741e1623E09dE3C5A1C8Fe82367';
let cakeNoLossPoolContract;
let farmTuringPoolContract;
let farmTuringBNBLPPoolContract;
let farmTuringBNBLPPoolV2Contract;
let farmCakeLPPoolContract;
let farmCakeLPPoolV2Contract;
let farmBUSDBNBLPPoolContract;
let farmBTCBBNBLPPoolContract;
let farmETHBNBLPPoolContract;
let farmUSDTBNBLPPoolContract;
let farmUSDTBUSDLPPoolContract;
let farmUSDTBUSDLPPoolV2Contract;
let farmCakePoolContract;
let farmCakePoolV2Contract;
let prizeHistory = [];
const TURING_HARVEST_MACHINE_ABI = [
    {
        "inputs": [
            {
                "internalType": "contract ITuringPool[]",
                "name": "_pools",
                "type": "address[]"
            }
        ],
        "name": "harvest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
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
const FARM_TURING_LP_POOL_CONTRACT_ABI = [
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
const FARM_CAKE_LP_POOL_CONTRACT_ABI = [
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
        "inputs": [],
        "name": "transferOwnership",
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
        const _web3 = getWeb3ToReadDataForMain();
        cakeNoLossPoolContract = new _web3.eth.Contract(CAKE_NO_LOSS_POOL_CONTRACT_ABI, CAKE_NO_LOSS_POOL_CONTRACT_ADDR);
    }
    setTimeout(function () {
        initCakeNoLossPoolContract();
    }, 3000);
}
function initFarmPoolContract() {
    if (
        !farmTuringBNBLPPoolContract ||
        !farmTuringBNBLPPoolV2Contract ||
        !farmCakeLPPoolContract ||
        !farmCakeLPPoolV2Contract ||
        !farmCakePoolContract ||
        !farmCakePoolV2Contract ||
        !farmUSDTBUSDLPPoolContract ||
        !farmUSDTBUSDLPPoolV2Contract ||
        !farmUSDTBNBLPPoolContract ||
        !farmBUSDBNBLPPoolContract ||
        !farmBTCBBNBLPPoolContract ||
        !farmETHBNBLPPoolContract 
        ) {
        const _web3 = getWeb3ToReadDataForMain();
        const _web3OnTestnet = getWeb3ToReadDataOnTestnetForMain();
        // farmTuringPoolContract = new _web3.eth.Contract(FARM_TURING_POOL_CONTRACT_ABI, FARM_TURING_POOL_CONTRACT_ADDR);

        farmTuringBNBLPPoolContract = new _web3.eth.Contract(FARM_TURING_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_ADDR);
        farmTuringBNBLPPoolV2Contract = new _web3.eth.Contract(FARM_TURING_LP_POOL_CONTRACT_ABI, FARM_TURING_BNB_LP_POOL_CONTRACT_V2_ADDR);
        farmCakeLPPoolContract = new _web3.eth.Contract(FARM_CAKE_LP_POOL_CONTRACT_ABI, FARM_CAKE_LP_POOL_CONTRACT_ADDR);
        farmCakeLPPoolV2Contract = new _web3.eth.Contract(FARM_CAKE_LP_POOL_CONTRACT_ABI, FARM_CAKE_LP_POOL_CONTRACT_V2_ADDR);
        farmCakePoolContract = new _web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_CONTRACT_ADDR);
        farmCakePoolV2Contract = new _web3.eth.Contract(FARM_CAKE_POOL_CONTRACT_ABI, FARM_CAKE_POOL_V2_CONTRACT_ADDR);

        farmUSDTBUSDLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BUSD_LP_POOL_CONTRACT_ADDR);
        farmUSDTBUSDLPPoolV2Contract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BUSD_LP_POOL_CONTRACT_V2_ADDR);
        farmUSDTBNBLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_USDT_BNB_LP_POOL_CONTRACT_ADDR);
        farmBUSDBNBLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_BUSD_BNB_LP_POOL_CONTRACT_ADDR);
        farmBTCBBNBLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_BTCB_BNB_LP_POOL_CONTRACT_ADDR);
        farmETHBNBLPPoolContract = new _web3.eth.Contract(FARM_TOKEN_LP_ON_CAKE_POOL_CONTRACT_ABI, FARM_ETH_BNB_LP_POOL_CONTRACT_ADDR);
    }
    setTimeout(function () {
        initFarmPoolContract();
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

function getCurrentAddress() {
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
    return parseInt(value * decimals) / decimals;
}
function parseFloatNumber(value, decimals) {
    return parseFloat(value.toFixed(decimals));
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
    var str = Math.floor(val);
    return (str < 10 ? '0' : '') + str;
}
function reloadCakeNoLossData() {
    setTimeout(function () {
        loadCakeNoLossData();
    }, 3000);
}
function reloadFarmTuringPoolData() {
    setTimeout(function () {
        loadFarmTuringPoolData();
    }, 3000);
}

function reloadFarmTuringBNBLPPoolData() {
    setTimeout(function () {
        loadFarmTuringBNBLPPoolData();
    }, 3000);
}

function reloadFarmTuringBNBLPPoolV2Data() {
    setTimeout(function () {
        loadFarmTuringBNBLPPoolV2Data();
    }, 3000);
}

function reloadFarmCakePoolData() {
    setTimeout(function () {
        loadFarmCakePoolData();
    }, 3000);
}

function reloadFarmCakePoolV2Data() {
    setTimeout(function () {
        loadFarmCakePoolV2Data();
    }, 3000);
}

function reloadFarmCakeBNBLPPoolData() {
    setTimeout(function () {
        loadFarmCakeBNBLPPoolData();
    }, 3000);
}

function reloadFarmCakeBNBLPPoolV2Data() {
    setTimeout(function () {
        loadFarmCakeBNBLPPoolV2Data();
    }, 3000);
}
function reloadFarmUSDTBUSDLPPoolData() {
    setTimeout(function () {
        loadFarmUSDTBUSDLPPoolData();
    }, 3000);
}
function reloadFarmUSDTBUSDLPPoolV2Data() {
    setTimeout(function () {
        loadFarmUSDTBUSDLPPoolV2Data();
    }, 3000);
}

function reloadFarmUSDTBNBLPPoolData() {
    setTimeout(function () {
        loadFarmUSDTBNBLPPoolData();
    }, 3000);
}

function reloadFarmBUSDBNBLPPoolData() {
    setTimeout(function () {
        loadFarmBUSDBNBLPPoolData();
    }, 3000);
}

function reloadFarmBTCBBNBLPPoolData() {
    setTimeout(function () {
        loadFarmBTCBBNBLPPoolData();
    }, 3000);
}

function reloadFarmETHBNBLPPoolData() {
    setTimeout(function () {
        loadFarmETHBNBLPPoolData();
    }, 3000);
}

function loadCakeNoLossData() {
    if (!cakeNoLossPoolContract) {
        return reloadCakeNoLossData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadCakeNoLossData();
    }
    $('.user-addr').html(`${userAddr.slice(0, 5)}...${userAddr.slice(-5)}`);
    /**
     data_[0] uint256 miningSpeed_, 
     data_[1] uint256 userWon_, 
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
        let userDataInCakeNoLossPool = {};
        userDataInCakeNoLossPool.miningSpeed = parseInt(_result[0]);
        // userDataInCakeNoLossPool.userWon = parseFloatNumber(parseInt(_result[1]) / 1e18, 18);
        userDataInCakeNoLossPool.userTickets = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInCakeNoLossPool.userWantCanWithdraw = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
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
        arrayTVLs["cakeNoLossTVL"] = userDataInCakeNoLossPool.tvl * userDataInCakeNoLossPool.wantPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["cakeNoLossUserBalance"] = userDataInCakeNoLossPool.userTickets * userDataInCakeNoLossPool.wantPrice;
            arrayUserTuringReward["cakeNoLossUserBalance"] = userDataInCakeNoLossPool.userTuringPending;
        }
        userDataInCakeNoLossPool.userWantBal = parseFloatNumber(parseInt(_result[14]) / 1e18, 18);
        userDataInCakeNoLossPool.totalPlayer = parseInt(_result[15]);
        _drawUI(userDataInCakeNoLossPool);
    }
    function _drawUI(userDataInCakeNoLossPool) {
        let now = parseInt(Date.now() / 1000);
        let timeOfWillBeAwarded = getTimeCountDown(userDataInCakeNoLossPool.endLoteryTime - now);
        $('.cake-no-loss-will-be-awarded').html(`${timeOfWillBeAwarded.day} DAY ${timeOfWillBeAwarded.hour} HR ${timeOfWillBeAwarded.min} MIN ${timeOfWillBeAwarded.sec} SEC`);
        $('.cake-no-loss-current-prize-by-usd').html(`$${formatBalance((userDataInCakeNoLossPool.prize * userDataInCakeNoLossPool.wantPrice), 2)}`);
        $('.cake-no-loss-current-prize').html(formatBalance((userDataInCakeNoLossPool.prize), 2));
        $('.cake-no-loss-turing-reward-apy').html(`${formatBalance((userDataInCakeNoLossPool.turingRewardAPY), 2)}%`);
        $('.cake-no-loss-total-tickets').html(formatBalance(userDataInCakeNoLossPool.totalTickets, 2));
        $('.cake-no-loss-total-volume').html(`$${formatBalance((userDataInCakeNoLossPool.tvl * userDataInCakeNoLossPool.wantPrice), 2)}`);
        if(page != null && page === "Dashboard") {
            if(userDataInCakeNoLossPool.userTickets > 0) {
                $('.cake-no-loss-user-balance').html(`${formatBalance((userDataInCakeNoLossPool.userTickets), 2)}`);
                arrayContractFarmUserJoined["cakeNoLossContract"] = CAKE_NO_LOSS_POOL_CONTRACT_ADDR;
            }
        }

        return reloadCakeNoLossData();
    }
    function _error(_e) {
        return reloadCakeNoLossData();
    }
}
function loadFarmTuringPoolData() {
    if (!farmTuringPoolContract) {
        return reloadFarmTuringPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmTuringPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmTuringPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result.miningSpeed_);
        userDataInFarmTuringPool.userTuringBal = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringBal_) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result.userBNBBal_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringShare = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringShare_) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = parseFloatNumber(parseInt(_result.turingRewardAPY_) / 1e2, 2);
        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-turing-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * userDataInFarmTuringPool.turingPrice), 2)}`);
        $('.farm-turing-pool-apy').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        return reloadFarmTuringPoolData();
    }
    function _error(_e) {
        return reloadFarmTuringPoolData();
    }
}
function loadFarmCakePoolData() {
    if (!farmCakePoolContract) {
        return reloadFarmCakePoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmCakePoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmCakePoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmCakePool = {};
        userDataInFarmCakePool.miningSpeed = parseInt(_result[0]);
        userDataInFarmCakePool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmCakePool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmCakePool.wantPrice = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmCakePool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmCakePool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmCakePool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmCakePool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmCakePool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        if (parseInt(_result[9]) > 0) {
            userDataInFarmCakePool.turingRewardAPY = parseFloatNumber(parseInt(_result[9]) / 1e2, 2);
        } else {
            userDataInFarmCakePool.turingRewardAPY = 0;
        }
        if (parseInt(_result[10]) > 0) {
            userDataInFarmCakePool.wantRewardAPY = parseFloatNumber(parseInt(_result[10]) / 1e2, 2);
        } else {
            userDataInFarmCakePool.wantRewardAPY = 0;
        }
        userDataInFarmCakePool.tvl = parseFloatNumber(parseInt(_result[11]) / 1e18, 18);
        arrayTVLs["cakeFarmTVL"] = userDataInFarmCakePool.tvl * userDataInFarmCakePool.wantPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["cakeFarmTVL"] = userDataInFarmCakePool.userWantShare * userDataInFarmCakePool.wantPrice;
        }
        _drawUI(userDataInFarmCakePool);
    }
    function _drawUI(userDataInFarmCakePool) {
        $('.farm-cake-pool-total-volume').html(`$${formatBalance((userDataInFarmCakePool.tvl * userDataInFarmCakePool.wantPrice), 2)}`);
        $('.farm-cake-pool-turing-apy').html(formatBalance(userDataInFarmCakePool.turingRewardAPY, 2));
        $('.farm-cake-pool-cake-apy').html(formatBalance(userDataInFarmCakePool.wantRewardAPY, 2));
        $('.farm-cake-pool-apy').html(formatBalance(userDataInFarmCakePool.wantRewardAPY + userDataInFarmCakePool.turingRewardAPY, 2));
        if(userDataInFarmCakePool.userWantShare > 0) {
            $('.farm-cake-pool-user-balance').html(formatBalance(userDataInFarmCakePool.userWantShare, 2));
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-cake-pool').hide();
            }
        }
        return reloadFarmCakePoolData();
    }
    function _error(_e) {
        return reloadFarmCakePoolData();
    }
}

function loadFarmCakePoolV2Data() {
    if (!farmCakePoolV2Contract) {
        return reloadFarmCakePoolV2Data();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmCakePoolV2Data();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmCakePoolV2Contract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmCakePool = {};
        userDataInFarmCakePool.miningSpeed = parseInt(_result[0]);
        userDataInFarmCakePool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmCakePool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmCakePool.wantPrice = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmCakePool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmCakePool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmCakePool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmCakePool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmCakePool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        if (parseInt(_result[9]) > 0) {
            userDataInFarmCakePool.turingRewardAPY = parseFloatNumber(parseInt(_result[9]) / 1e2, 2);
        } else {
            userDataInFarmCakePool.turingRewardAPY = 0;
        }
        if (parseInt(_result[10]) > 0) {
            userDataInFarmCakePool.wantRewardAPY = parseFloatNumber(parseInt(_result[10]) / 1e2, 2);
        } else {
            userDataInFarmCakePool.wantRewardAPY = 0;
        }
        userDataInFarmCakePool.tvl = parseFloatNumber(parseInt(_result[11]) / 1e18, 18);
        arrayTVLs["cakeFarmV2TVL"] = userDataInFarmCakePool.tvl * userDataInFarmCakePool.wantPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["cakeFarmV2TVL"] = userDataInFarmCakePool.userWantShare * userDataInFarmCakePool.wantPrice;
            arrayUserTuringReward["cakeFarmV2TVL"] = userDataInFarmCakePool.userTuringPending;
        }
        _drawUI(userDataInFarmCakePool);
    }
    function _drawUI(userDataInFarmCakePool) {

        $('.farm-cake-pool-v2-total-volume').html(`$${formatBalance((userDataInFarmCakePool.tvl * userDataInFarmCakePool.wantPrice), 2)}`);
        $('.farm-cake-pool-v2-turing-apy').html(formatBalance(userDataInFarmCakePool.turingRewardAPY, 2));
        $('.farm-cake-pool-v2-cake-apy').html(formatBalance(userDataInFarmCakePool.wantRewardAPY, 2));
        $('.farm-cake-pool-v2-apy').html(formatBalance(userDataInFarmCakePool.wantRewardAPY + userDataInFarmCakePool.turingRewardAPY, 2));
        if(userDataInFarmCakePool.userWantShare > 0) {
            $('.farm-cake-pool-v2-user-balance').html(formatBalance(userDataInFarmCakePool.userWantShare, 2));
            arrayContractFarmUserJoined["cakeFarmV2Contract"] = FARM_CAKE_POOL_V2_CONTRACT_ADDR;
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-cake-pool-v2').hide();
            }
        }
        return reloadFarmCakePoolV2Data();
    }
    function _error(_e) {
        return reloadFarmCakePoolV2Data();
    }
}

function loadFarmTuringBNBLPPoolData() {
    if (!farmTuringBNBLPPoolContract) {
        return reloadFarmTuringBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmTuringBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmTuringBNBLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};

        userDataInFarmTuringPool.miningSpeed = parseInt(_result.miningSpeed_);
        userDataInFarmTuringPool.userTuringBal = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringBal_) / 1e18, 1e18), 18); // turing LP
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result.userWantBal_) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result.userBNBBal_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result.totalMintPerDay_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringShare = parseFloatNumber(parseInt(_result.userTuringShare_) / 1e18, 18); // turing LP
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
        arrayTVLs["turingBNBLPTVL"] = userDataInFarmTuringPool.tvl * turingBNBLPPrice;
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;

        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * turingBNBLPPrice);
        }

        if (userDataInFarmTuringPool.userTuringShare <= 0) {
            userDataInFarmTuringPool.userTuringPending = 0;
        }
        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-turing-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * turingBNBLPPrice), 2)}`);
        $('.farm-turing-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        return reloadFarmTuringBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmTuringBNBLPPoolData();
    }
}

function loadFarmTuringBNBLPPoolV2Data() {
    if (!farmTuringBNBLPPoolV2Contract) {
        return reloadFarmTuringBNBLPPoolV2Data();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmTuringBNBLPPoolV2Data();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmTuringBNBLPPoolV2Contract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};

        userDataInFarmTuringPool.miningSpeed = parseInt(_result.miningSpeed_);
        userDataInFarmTuringPool.userTuringBal = parseFloatNumber(roundDownFloat(parseInt(_result.userTuringBal_) / 1e18, 1e18), 18); // turing LP
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result.userWantBal_) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result.userBNBBal_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result.userTuringPending_) / 1e18, 18);
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result.totalMintPerDay_) / 1e18, 18);
        userDataInFarmTuringPool.userTuringShare = parseFloatNumber(parseInt(_result.userTuringShare_) / 1e18, 18); // turing LP
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result.tvl_) / 1e18, 18);
        arrayTVLs["turingBNBLPv2TVL"] = userDataInFarmTuringPool.tvl * turingBNBLPPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["turingBNBLPv2TVL"] = userDataInFarmTuringPool.userTuringShare * turingBNBLPPrice;
            arrayUserTuringReward["turingBNBLPv2TVL"] = userDataInFarmTuringPool.userTuringPending;
        }
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result.turingPrice_) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;

        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * turingBNBLPPrice);
        }

        if (userDataInFarmTuringPool.userTuringShare <= 0) {
            userDataInFarmTuringPool.userTuringPending = 0;
        }
        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-turing-bnb-lp-pool-v2-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * turingBNBLPPrice), 2)}`);
        $('.farm-turing-bnb-lp-pool-v2-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userTuringShare > 0) {
            $('.farm-turing-bnb-lp-pool-v2-user-balance').html(formatBalance(userDataInFarmTuringPool.userTuringShare, 2));
            arrayContractFarmUserJoined["turingBNBLPv2Contract"] = FARM_TURING_BNB_LP_POOL_CONTRACT_V2_ADDR;
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-turing-bnb-lp-pool-v2').hide();
            }
        }
        return reloadFarmTuringBNBLPPoolV2Data();
    }
    function _error(_e) {
        return reloadFarmTuringBNBLPPoolV2Data();
    }
}

function loadFarmCakeBNBLPPoolData() {
    if (!farmCakeLPPoolContract) {
        return reloadFarmCakeBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmCakeBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmCakeLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["cakeBNBLPTVL"] = userDataInFarmTuringPool.tvl * cakeLPPrice;
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * cakeLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * cakeLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-cake-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * cakeLPPrice), 2)}`);
        $('.farm-cake-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-cake-bnb-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        return reloadFarmCakeBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmCakeBNBLPPoolData();
    }
}

function loadFarmCakeBNBLPPoolV2Data() {
    if (!farmCakeLPPoolV2Contract) {
        return reloadFarmCakeBNBLPPoolV2Data();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmCakeBNBLPPoolV2Data();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmCakeLPPoolV2Contract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["cakeBNBLPv2TVL"] = userDataInFarmTuringPool.tvl * cakeLPPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["cakeBNBLPv2TVL"] = userDataInFarmTuringPool.userWantShare * cakeLPPrice;
            arrayUserTuringReward["cakeBNBLPv2TVL"] = userDataInFarmTuringPool.userTuringPending;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * cakeLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * cakeLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-cake-bnb-lp-pool-v2-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * cakeLPPrice), 2)}`);
        $('.farm-cake-bnb-lp-pool-v2-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-cake-bnb-lp-pool-v2-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-cake-bnb-lp-pool-v2-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-cake-bnb-lp-pool-v2-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
            arrayContractFarmUserJoined["cakeBNBLPv2Contract"] = FARM_CAKE_LP_POOL_CONTRACT_V2_ADDR;
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-cake-bnb-lp-pool-v2').hide();
            }
        }
        return reloadFarmCakeBNBLPPoolV2Data();
    }
    function _error(_e) {
        return reloadFarmCakeBNBLPPoolV2Data();
    }
}

function loadFarmUSDTBUSDLPPoolData() {
    if (!farmUSDTBUSDLPPoolContract) {
        return reloadFarmUSDTBUSDLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmUSDTBUSDLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmUSDTBUSDLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["usdtBUSDLP"] = userDataInFarmTuringPool.tvl * usdtBusdLPPrice;
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBusdLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBusdLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-usdt-busd-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * usdtBusdLPPrice), 2)}`);
        $('.farm-usdt-busd-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-usdt-busd-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        return reloadFarmUSDTBUSDLPPoolData();
    }
    function _error(_e) {
        return reloadFarmUSDTBUSDLPPoolData();
    }
}

function loadFarmUSDTBUSDLPPoolV2Data() {
    if (!farmUSDTBUSDLPPoolV2Contract) {
        return reloadFarmUSDTBUSDLPPoolV2Data();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmUSDTBUSDLPPoolV2Data();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmUSDTBUSDLPPoolV2Contract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["usdtBUSDLPv2TVL"] = userDataInFarmTuringPool.tvl * usdtBusdLPPrice;
        if(page === "Dashboard") {
            arrayUserBalance["usdtBUSDLPv2TVL"] = userDataInFarmTuringPool.userWantShare * usdtBusdLPPrice;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBusdLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBusdLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-usdt-busd-lp-pool-v2-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * usdtBusdLPPrice), 2)}`);
        $('.farm-usdt-busd-lp-pool-v2-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-usdt-busd-lp-pool-v2-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-usdt-busd-lp-pool-v2-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-usdt-busd-lp-pool-v2-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
        }
        else {
            if(page === "Dashboard") {
                $('.farm-usdt-busd-lp-pool-v2').hide();
            }
        }
        
        return reloadFarmUSDTBUSDLPPoolV2Data();
    }
    function _error(_e) {
        return reloadFarmUSDTBUSDLPPoolV2Data();
    }
}

function loadFarmUSDTBNBLPPoolData() {
    if (!farmUSDTBNBLPPoolContract) {
        return reloadFarmUSDTBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmUSDTBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmUSDTBNBLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["usdtBNBLPTVL"] = userDataInFarmTuringPool.tvl * usdtBNBLPPrice;
        if(page === "Dashboard") {
            arrayUserBalance["usdtBNBLPTVL"] = userDataInFarmTuringPool.userWantShare * usdtBNBLPPrice;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBNBLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * usdtBNBLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-usdt-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * usdtBNBLPPrice), 2)}`);
        $('.farm-usdt-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-usdt-bnb-lp-pool-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-usdt-bnb-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-usdt-bnb-lp-pool-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
        }
        else {
            if(page === "Dashboard") {
                $('.farm-usdt-bnb-lp-pool').hide();
            }
        }
        return reloadFarmUSDTBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmUSDTBNBLPPoolData();
    }
}

function loadFarmBUSDBNBLPPoolData() {
    if (!farmBUSDBNBLPPoolContract) {
        return reloadFarmBUSDBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmBUSDBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmBUSDBNBLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["busdBNBLPTVL"] = userDataInFarmTuringPool.tvl * busdBNBLPPrice;
        if(page === "Dashboard") {
            arrayUserBalance["busdBNBLPTVL"] = userDataInFarmTuringPool.userWantShare * busdBNBLPPrice;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * busdBNBLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * busdBNBLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-busd-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * busdBNBLPPrice), 2)}`);
        $('.farm-busd-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-busd-bnb-lp-pool-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-busd-bnb-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-busd-bnb-lp-pool-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
        }
        else {
            if(page === "Dashboard") {
                $('.farm-busd-bnb-lp-pool').hide();
            }
        }
        return reloadFarmBUSDBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmBUSDBNBLPPoolData();
    }
}

function loadFarmBTCBBNBLPPoolData() {
    if (!farmBTCBBNBLPPoolContract) {
        return reloadFarmBTCBBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmBTCBBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmBTCBBNBLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["btcbBNBLPTVL"] = userDataInFarmTuringPool.tvl * btcbBNBLPPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["btcbBNBLPTVL"] = userDataInFarmTuringPool.userWantShare * btcbBNBLPPrice;
            arrayUserTuringReward["btcbBNBLPTVL"] = userDataInFarmTuringPool.userTuringPending;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * btcbBNBLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * btcbBNBLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-btcb-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * btcbBNBLPPrice), 2)}`);
        $('.farm-btcb-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-btcb-bnb-lp-pool-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-btcb-bnb-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-btcb-bnb-lp-pool-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
            arrayContractFarmUserJoined["btcbBNBLPContract"] = FARM_BTCB_BNB_LP_POOL_CONTRACT_ADDR;
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-btcb-bnb-lp-pool').hide();
            }
        }
        return reloadFarmBTCBBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmBTCBBNBLPPoolData();
    }
}

function loadFarmETHBNBLPPoolData() {
    if (!farmETHBNBLPPoolContract) {
        return reloadFarmETHBNBLPPoolData();
    }
    let userAddr = getCurrentAddress();
    if (!userAddr) {
        return reloadFarmETHBNBLPPoolData();
    }
    // $('.user-addr').html(`${userAddr.slice(0,5)}...${userAddr.slice(-5)}`);

    farmETHBNBLPPoolContract
            .methods
            .getData(userAddr)
            .call()
            .then(_updateUserData)
            .catch(_error);
    function _updateUserData(_result) {
        let userDataInFarmTuringPool = {};
        userDataInFarmTuringPool.miningSpeed = parseInt(_result[0]);
        userDataInFarmTuringPool.userWantBal = parseFloatNumber(roundDownFloat(parseInt(_result[1]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.userBNBBal = parseFloatNumber(parseInt(_result[6]) / 1e18, 18);
        userDataInFarmTuringPool.userTuringPending = parseFloatNumber(parseInt(_result[7]) / 1e18, 18);
        userDataInFarmTuringPool.userWantShare = parseFloatNumber(roundDownFloat(parseInt(_result[8]) / 1e18, 1e18), 18);
        userDataInFarmTuringPool.tvl = parseFloatNumber(parseInt(_result[9]) / 1e18, 18);
        arrayTVLs["ethBNBLPTVL"] = userDataInFarmTuringPool.tvl * ethBNBLPPrice;
        if(page != null && page === "Dashboard") {
            arrayUserBalance["ethBNBLPTVL"] = userDataInFarmTuringPool.userWantShare * ethBNBLPPrice;
            arrayUserTuringReward["ethBNBLPTVL"] = userDataInFarmTuringPool.userTuringPending;
        }
        userDataInFarmTuringPool.totalMintPerDay = parseFloatNumber(parseInt(_result[4]) / 1e18, 18);
        userDataInFarmTuringPool.totalWantRewardPerDay = parseFloatNumber(parseInt(_result[5]) / 1e18, 18);
        userDataInFarmTuringPool.turingPrice = parseFloatNumber(parseInt(_result[2]) / 1e18, 18);
        userDataInFarmTuringPool.cakePrice = parseFloatNumber(parseInt(_result[10]) / 1e18, 18);
        userDataInFarmTuringPool.userCakePending = parseFloatNumber(parseInt(_result[3]) / 1e18, 18);
        userDataInFarmTuringPool.turingRewardAPY = 0;
        userDataInFarmTuringPool.wantRewardAPY = 0;
        if (userDataInFarmTuringPool.tvl > 0) {
            userDataInFarmTuringPool.turingRewardAPY = userDataInFarmTuringPool.totalMintPerDay * userDataInFarmTuringPool.turingPrice * 36500 / (userDataInFarmTuringPool.tvl * ethBNBLPPrice);
            userDataInFarmTuringPool.wantRewardAPY = userDataInFarmTuringPool.totalWantRewardPerDay * userDataInFarmTuringPool.cakePrice * 36500 / (userDataInFarmTuringPool.tvl * ethBNBLPPrice);

        }

        _drawUI(userDataInFarmTuringPool);
    }
    function _drawUI(userDataInFarmTuringPool) {
        $('.farm-eth-bnb-lp-pool-total-volume').html(`$${formatBalance((userDataInFarmTuringPool.tvl * ethBNBLPPrice), 2)}`);
        $('.farm-eth-bnb-lp-pool-apy-turing').html(formatBalance(userDataInFarmTuringPool.turingRewardAPY, 2));
        $('.farm-eth-bnb-lp-pool-apy-cake').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY, 2));
        $('.farm-eth-bnb-lp-pool-apy').html(formatBalance(userDataInFarmTuringPool.wantRewardAPY + userDataInFarmTuringPool.turingRewardAPY, 2));
        if(userDataInFarmTuringPool.userWantShare > 0) {
            $('.farm-eth-bnb-lp-pool-user-balance').html(formatBalance(userDataInFarmTuringPool.userWantShare, 2));
            arrayContractFarmUserJoined["ethBNBLPContract"] = FARM_ETH_BNB_LP_POOL_CONTRACT_ADDR;
        }
        else {
            if(page != null && page === "Dashboard") {
                $('.farm-eth-bnb-lp-pool').hide();
            }
        }
        return reloadFarmETHBNBLPPoolData();
    }
    function _error(_e) {
        return reloadFarmETHBNBLPPoolData();
    }
}
function _showPopupForMain(id) {
    $(`#${id}`).show();
}
function _hidePopupForMain(id, time = 10000) {
    setTimeout(() => {
        $(`#${id}`).hide();
    }, time);
}
function initUserActionForMain() {
    _harvestAll();
    function _harvestAll() {
        $('.btn-harvest-all-pool').click((e) => {
            e.preventDefault();
            let _poolsUserJoined = getContractUserJoined();
            // amount = toBN(amount, 18);
            let userAddr = getCurrentAddress();
            if (!userAddr) {
                return false;
            }
            if (typeof web3 == 'undifined') {
                return false;
            }
            let _transactionHistory = {}; 
            let _contract = new web3.eth.Contract(TURING_HARVEST_MACHINE_ABI, TURING_HARVEST_MACHINE_ADDR);

            _contract.methods.harvest(_poolsUserJoined).send({ from: getCurrentAddress() })
                    .on('transactionHash', function(hash) {
                        _showPopupForMain('confirm-popup');
                    })
                    .on('confirmation', function(confirmationNumber, receipt){
                         if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                            _transactionHistory[receipt.transactionHash] = true;
                            _hidePopupForMain('confirm-popup', 0);
                            _showPopupForMain('success-confirm-popup');
                            _hidePopupForMain('success-confirm-popup', 10000);
                        } 
                    });
        });
    }
}
