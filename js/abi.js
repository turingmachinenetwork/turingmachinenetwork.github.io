$.ABI = function() {
};

$.ABI.prototype = (function() {
	var setting = {};
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			setting = $.extend({}, setting, options);
		},
		getTuringStakeABI() {
			return [
				{
					"inputs": [
						{
							"internalType": "contract ITuringWhitelist",
							"name": "_whitelistContract",
							"type": "address"
						},
						{
							"internalType": "contract IPancakeSwapRouter",
							"name": "_pancakeSwap",
							"type": "address"
						},
						{
							"internalType": "contract ITuringTimeLock",
							"name": "_turingTimeLockContract",
							"type": "address"
						},
						{
							"internalType": "contract IBEP20",
							"name": "_voteTuring",
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
						},
						{
							"internalType": "uint256",
							"name": "_timelock",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "_rateOfMintVoteTuring",
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
					"name": "onWithdraw",
					"type": "event"
				},
				{
					"inputs": [],
					"name": "RATE_OF_MINT_VOTE_TURING",
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
					"name": "TIMELOCK",
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
							"name": "userVoteTuring_",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "totalVoteTuring_",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "withdrawTime_",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "totalShare_",
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
					"name": "getWithdrawTime",
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
							"internalType": "address",
							"name": "_busd",
							"type": "address"
						}
					],
					"name": "setBUSD",
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
					"name": "setPancakeSwapRouter",
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
					"name": "setRateOfMintVoteTuring",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "setTIMELOCK",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "setVoteTuring",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_wbnb",
							"type": "address"
						}
					],
					"name": "setWBNB",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "setWantToken",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "contract ITuringWhitelist",
							"name": "_whitelistContract",
							"type": "address"
						}
					],
					"name": "setWhitelistContract",
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
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"name": "timeOfDepositOf",
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
					"name": "voteTURING",
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
					"inputs": [],
					"name": "whitelistContract",
					"outputs": [
						{
							"internalType": "contract ITuringWhitelist",
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
		},
		getTokenABI() {
			return [
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
		},
		getTuringHarvestMachineABI() {
			return [
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
		}
	};
}(jQuery));