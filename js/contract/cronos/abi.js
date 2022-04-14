$.ABI = function() {};
$.ABI.prototype = (function() {
    var setting = {};
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        getBalanceInfoABI() {
            return [{
                "inputs": [{
                        "internalType": "address",
                        "name": "_account",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IBEP20[]",
                        "name": "_tokens",
                        "type": "address[]"
                    }
                ],
                "name": "getData",
                "outputs": [{
                        "components": [{
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct BalanceInfo.BEP20BALANCE[]",
                        "name": "tokensBal_",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bnbBal_",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }];
        },
        getPriceInfoABI() {
            return [{
                    "inputs": [{
                            "internalType": "address",
                            "name": "_token",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IChainlinkAggregatorV3",
                            "name": "_chainlinkAggregator",
                            "type": "address"
                        }
                    ],
                    "name": "setChainlinkAggregator",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "chainlinkAggregatorOf",
                    "outputs": [{
                        "internalType": "contract IChainlinkAggregatorV3",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address[]",
                        "name": "_tokens",
                        "type": "address[]"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "components": [{
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "price",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct PriceInfo.Price[]",
                        "name": "data_",
                        "type": "tuple[]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }],
                    "name": "getPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
        },
        getTuringVenusSwapABI() {
            return [{
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "base",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "farmContract",
                    "outputs": [{
                        "internalType": "contract ITuringswapFarmVenus",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "feeMachineContract",
                    "outputs": [{
                        "internalType": "contract ITuringswapFeeMachine",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "tokenInputAmount",
                        "type": "uint256"
                    }],
                    "name": "getBaseOutput",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "baseInputAmount",
                        "type": "uint256"
                    }],
                    "name": "getDataFromBaseInputToAddLp",
                    "outputs": [{
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
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "tokenInputAmount",
                        "type": "uint256"
                    }],
                    "name": "getDataFromTokenInputToAddLp",
                    "outputs": [{
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
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "amountLP",
                        "type": "uint256"
                    }],
                    "name": "getDataToRemoveLP",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getOwner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "baseInputAmount",
                        "type": "uint256"
                    }],
                    "name": "getTokenOutput",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalReserve",
                    "outputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
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
                    "inputs": [{
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
                    "outputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "token",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "whitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringswapWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
        },
        getTradeMachineABI() {
            return [{
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_pair",
                        "type": "address"
                    }],
                    "name": "addPair",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "pairs",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_pair",
                        "type": "address"
                    }],
                    "name": "removePair",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
        },
        getAllowTransferABI() {
            return [{
                "inputs": [{
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IBEP20[]",
                        "name": "_tokens",
                        "type": "address[]"
                    }
                ],
                "name": "getData",
                "outputs": [{
                    "components": [{
                            "internalType": "address",
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct GETAllowTransfer.AT[]",
                    "name": "data_",
                    "type": "tuple[]"
                }],
                "stateMutability": "view",
                "type": "function"
            }];
        },
        getTuringVenusLPInfoABI() {
            return [{
                "inputs": [{
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "internalType": "contract ITuringVenusLP[]",
                        "name": "_lps",
                        "type": "address[]"
                    }
                ],
                "name": "getData",
                "outputs": [{
                    "components": [{
                            "internalType": "uint256",
                            "name": "baseReserve",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenReserve",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalLP",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "uLPBal",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "uBaseAllowed",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "uTokenAllowed",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct TuringVenusLPInfo.LP[]",
                    "name": "data_",
                    "type": "tuple[]"
                }],
                "stateMutability": "view",
                "type": "function"
            }];
        },
        getTuringStakeABI() {
            return [{
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TIMELOCK",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "busd",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getWithdrawTime",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "contract IMiningMachine",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pancakeSwap",
                    "outputs": [{
                        "internalType": "contract IPancakeSwapRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_busd",
                        "type": "address"
                    }],
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "_wbnb",
                        "type": "address"
                    }],
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
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_whitelistContract",
                        "type": "address"
                    }],
                    "name": "setWhitelistContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "timeOfDepositOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "voteTURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "wbnb",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "whitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
            return [{
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_addr",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [{
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ];
        },
        getTuringHarvestMachineABI() {
            return [{
                "inputs": [{
                    "internalType": "contract ITuringPool[]",
                    "name": "_pools",
                    "type": "address[]"
                }],
                "name": "harvest",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }];
        },
        getTuringAlpacaFarmBNBABI() {
            return [{
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "name": "connectToAlpacaAndPancake",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "enableNetwork",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pausedNetwork",
                    "outputs": [],
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
                    "name": "setMiningMachine",
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
                    "name": "setTuringProcessFeeForBNB",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_whitelistContract",
                        "type": "address"
                    }],
                    "name": "setWhitelistContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "contract ITuringTimeLock",
                            "name": "_turingTimeLock",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IAlpacaVault",
                            "name": "_ibBNB",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IAlpacaFairLaunch",
                            "name": "_alpacaFairLaunch",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IPancakeSwapRouter",
                            "name": "_pancakeSwap",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringProcessFeeForBNB",
                            "name": "_turingProcessFeeForBNB",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_alpacaToken",
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
                            "internalType": "address",
                            "name": "_turing",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_pidOfVault",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "ALPACA",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "AlpacaFairLaunch",
                    "outputs": [{
                        "internalType": "contract IAlpacaFairLaunch",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "avaiableBal",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_addr",
                        "type": "address"
                    }],
                    "name": "balanceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "BUSD",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "FARM_FEE",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getAlpacaApy",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getAlpacaPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getBNBPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                            "internalType": "uint256",
                            "name": "bnbPrice_",
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
                            "name": "userBNBBal_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userBNBShare_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "turingAPY_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "alpacaAPY_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "supplyAPY_",
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
                    "name": "getFarmFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPendingAlpaca",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getSupplyApy",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalBal",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalBNBValueOfAlpaca",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalBNBValueOfIbBNB",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalIbBNB",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTuringApy",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTuringPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "ibBNB",
                    "outputs": [{
                        "internalType": "contract IAlpacaVault",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "isPaused",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "PancakeSwap",
                    "outputs": [{
                        "internalType": "contract IPancakeSwapRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "PERIOD_DAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfVault",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "timeOfUpdateTotalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringMiningMachine",
                    "outputs": [{
                        "internalType": "contract IMiningMachine",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringProcessFeeForBNB",
                    "outputs": [{
                        "internalType": "contract ITuringProcessFeeForBNB",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringTimeLock",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringWhitelist",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint128",
                        "name": "",
                        "type": "uint128"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "WBNB",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
        },
        getVVSLPPoolABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract ITuringTimeLock",
                            "name": "_turingTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_turingWhiteListContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IVVSRouter",
                            "name": "_vvsRouter",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ICraftsman",
                            "name": "_Craftsman",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_want",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_VVS",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_turing",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_wcro",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_usdc",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "name": "Craftsman",
                    "outputs": [{
                        "internalType": "contract ICraftsman",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "VVS",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "accWantPerShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveConnectToVVS",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveDistributeContractToUseToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_turing",
                        "type": "address"
                    }],
                    "name": "changeTuringToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_VVS",
                        "type": "address"
                    }],
                    "name": "changeVVSToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_want",
                        "type": "address"
                    }],
                    "name": "changeWantToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_wcro",
                        "type": "address"
                    }],
                    "name": "changeWcroToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_usdc",
                        "type": "address"
                    }],
                    "name": "changeusdcToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "controllerMachine",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "distributeTuring",
                    "outputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "internalType": "uint256[11]",
                        "name": "data_",
                        "type": "uint256[11]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPerfomanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalMintPerDayOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalRewardPerDay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTuringPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getVVSPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "pendingVVSOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "_pendingVVS",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "periodOfDay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfFarm",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfControllerFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfPerformanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "rewardWantDebtOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_controllerMachine",
                        "type": "address"
                    }],
                    "name": "setControllerMachine",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ICraftsman",
                        "name": "_Craftsman",
                        "type": "address"
                    }],
                    "name": "setCraftsmanContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "_distributeTuring",
                        "type": "address"
                    }],
                    "name": "setDistributeTuring",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pidOfFarm",
                        "type": "uint256"
                    }],
                    "name": "setPidOfFarm",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pidOfMining",
                        "type": "uint256"
                    }],
                    "name": "setPidOfMining",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_rateOfControllerFee",
                        "type": "uint256"
                    }],
                    "name": "setRateOfControllerFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_rateOfPerformanceFee",
                        "type": "uint256"
                    }],
                    "name": "setRateOfPerformanceFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_turingWhiteListContract",
                        "type": "address"
                    }],
                    "name": "setWhiteListContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "timeOfHarvest",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingWhitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "usdc",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "vvsRouter",
                    "outputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "wcro",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
        getVVSNoLossPoolABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract ITuringTimeLock",
                            "name": "_turingTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_turingWhiteListContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IVVSRouter",
                            "name": "_vvsRouter",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IDistributeTuring",
                            "name": "_distributeTuring",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ICraftsman",
                            "name": "_craftsman",
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
                            "name": "_wcro",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_usdc",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                            "name": "_cakeConvertToTuringAmt",
                            "type": "uint256"
                        }
                    ],
                    "name": "onDraw",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                            "name": "_fee",
                            "type": "uint256"
                        }
                    ],
                    "name": "onWithdraw",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "Craftsman",
                    "outputs": [{
                        "internalType": "contract ICraftsman",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "HALFTIME",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "LOTTERY_END_TIME",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringTimeLock",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringWhitelist",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "USDC",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "VVSRouter",
                    "outputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "WCRO",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveConnectToVVS",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveDistributeContractToUseToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "changeHalftime",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "changeLotteryEndTime",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "changeTotalRandom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_turing",
                        "type": "address"
                    }],
                    "name": "changeTuringToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_usdc",
                        "type": "address"
                    }],
                    "name": "changeUsdcToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_want",
                        "type": "address"
                    }],
                    "name": "changeWantToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_wcro",
                        "type": "address"
                    }],
                    "name": "changeWcroToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "distributeTuring",
                    "outputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "internalType": "uint256[16]",
                        "name": "data_",
                        "type": "uint256[16]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_token",
                        "type": "uint256"
                    }],
                    "name": "getOwnerOfToken",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPerfomanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalMintPerDayOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalReward",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTuringPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getWantPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "name": "historyList",
                    "outputs": [{
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
                            "name": "turRewardAmt",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "lastDepositTimeOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "lastHistory",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pendingTimeOfWithdraw",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "periodOfDay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateFeeOfWithdrawEarly",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfConvertWinAmtToTuring",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfPerformanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "_distributeTuring",
                        "type": "address"
                    }],
                    "name": "setDistributeTuring",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "setPendingTimeOfWithdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "setPidOfMining",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "setRateOfConvertWinAmtToTuring",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "setRateOfPerformanceFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "setRatefeeOfWithdrawEarly",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "_vvsRouter",
                        "type": "address"
                    }],
                    "name": "setVVSRouter",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_turingWhiteListContract",
                        "type": "address"
                    }],
                    "name": "setWhiteListContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "timeOfHarvest",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalHistory",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalPlayer",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalRandom",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
        getVVSPoolABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract IVVSRouter",
                            "name": "_vvsRouter",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ICraftsman",
                            "name": "_Craftsman",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringTimeLock",
                            "name": "_turingTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_turingWhiteListContract",
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
                            "name": "_wcro",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_usdc",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "name": "Craftsman",
                    "outputs": [{
                        "internalType": "contract ICraftsman",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "accWantPerShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveConnectToVVS",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "approveDistributeContractToUseToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_turing",
                        "type": "address"
                    }],
                    "name": "changeTuringToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_want",
                        "type": "address"
                    }],
                    "name": "changeWantToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_wcro",
                        "type": "address"
                    }],
                    "name": "changeWcroToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_usdc",
                        "type": "address"
                    }],
                    "name": "changeusdcToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "controllerMachine",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "distributeTuring",
                    "outputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "internalType": "uint256[12]",
                        "name": "data_",
                        "type": "uint256[12]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPerfomanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalMintPerDayOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalRewardPerDay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTuringPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getWantPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "pendingWantOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "_pendingWant",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "periodOfDay",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfControllerFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "rateOfPerformanceFee",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "rewardWantDebtOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_controllerMachine",
                        "type": "address"
                    }],
                    "name": "setControllerMachine",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "_distributeTuring",
                        "type": "address"
                    }],
                    "name": "setDistributeTuring",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_pidOfMining",
                        "type": "uint256"
                    }],
                    "name": "setPidOfMining",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_rateOfControllerFee",
                        "type": "uint256"
                    }],
                    "name": "setRateOfControllerFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_rateOfPerformanceFee",
                        "type": "uint256"
                    }],
                    "name": "setRateOfPerformanceFee",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "_vvsRouter",
                        "type": "address"
                    }],
                    "name": "setVVSRouter",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_turingWhiteListContract",
                        "type": "address"
                    }],
                    "name": "setWhiteListContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "timeOfHarvest",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "turingWhitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "usdc",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "vvsRouter",
                    "outputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "wcro",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
        getTuringLPPoolABI() {
            return [{
                    "inputs": [{
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
                    "inputs": [{
                        "indexed": false,
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
                    "name": "onCancelTransactions",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "MAXIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "MINIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "busd",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "contract IMiningMachine",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pancakeSwap",
                    "outputs": [{
                        "internalType": "contract IPancakeSwapRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "delay_",
                        "type": "uint256"
                    }],
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "name": "timeLockOf",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "wbnb",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
        getTuringVenusLPPoolABI() {
            return [{
                    "inputs": [{
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
                    "inputs": [{
                        "indexed": false,
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
                    "name": "onCancelTransactions",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "MAXIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "MINIMUM_DELAY",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "busd",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "string",
                        "name": "_functionName",
                        "type": "string"
                    }],
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "contract IMiningMachine",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pancakeSwap",
                    "outputs": [{
                        "internalType": "contract IPancakeSwapRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pidOfMining",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
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
                    "inputs": [{
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
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "delay_",
                        "type": "uint256"
                    }],
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
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }],
                    "name": "timeLockOf",
                    "outputs": [{
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
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
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "want",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "wbnb",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_wantAmt",
                        "type": "uint256"
                    }],
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
        getTuringCroLPPoolABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract ITuringTimeLock",
                            "name": "_TuringTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_TuringWhiteListContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IDistributeTuring",
                            "name": "_DistributeTuringContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_TURINGCROLP",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_TURING",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
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
                    "inputs": [{
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
                    "name": "DistributeTuringContract",
                    "outputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "HALF_TIME",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "LASTED_TIME",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURINGCROLP",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringWhitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "accTurPerShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "changeHalfTime",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_turingCroLp",
                        "type": "address"
                    }],
                    "name": "changeTuringCroLpToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_turing",
                        "type": "address"
                    }],
                    "name": "changeTuringToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "distribution",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "internalType": "uint256[8]",
                        "name": "data_",
                        "type": "uint256[8]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalMintPerDayOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getTuringPending",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "harvest",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "rewardTuringDebtOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "_DistributeTuringContract",
                        "type": "address"
                    }],
                    "name": "setDistributeTuring",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_TuringWhiteListContract",
                        "type": "address"
                    }],
                    "name": "setWhiteListContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "shareOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalReward",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalShare",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_newOwner",
                        "type": "address"
                    }],
                    "name": "transferOwnership",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "version",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                }
            ]
        },
        getOrclePriceABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract ITuringTimelock",
                            "name": "_turingTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_turingWhitelistContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IVVSRouter",
                            "name": "_vvsRouter",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_wcro",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "MAX_RATE",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "MAX_UPDATE_RATE",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "PERIOD_UPDATE",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringTimelockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimelock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringWhitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "VVSRouter",
                    "outputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "WCRO",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_rate",
                        "type": "uint256"
                    }],
                    "name": "changeMaxUpdateRate",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    }],
                    "name": "changeOwner",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }],
                    "name": "changePeriodUpate",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "_vvsRouter",
                        "type": "address"
                    }],
                    "name": "changeVVSRouter",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_wcro",
                        "type": "address"
                    }],
                    "name": "changeWCRO",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "decimalOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }],
                    "name": "getPrice",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "priceOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "_token",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "setTokenDecimal",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }],
                    "name": "syncPrice",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "updatedAtOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        },
        getOrclePriceInfoABI() {
            return [{
                    "inputs": [{
                        "internalType": "contract IOraclePrice",
                        "name": "_oraclePriceContract",
                        "type": "address"
                    }],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "OraclePriceContract",
                    "outputs": [{
                        "internalType": "contract IOraclePrice",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address[]",
                        "name": "_tokens",
                        "type": "address[]"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "components": [{
                                "internalType": "uint256",
                                "name": "currentPrice",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "priceOnVVS",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nextPrice",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "nextUpdateTime",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct OraclePriceInfo.OraclePrice[]",
                        "name": "data_",
                        "type": "tuple[]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        },
        getProtocolLiquidityLaunchABI() {
            return [{
                    "inputs": [{
                            "internalType": "contract ITuringTimeLock",
                            "name": "_TuringTimeLockContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringWhitelist",
                            "name": "_TuringWhiteListContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IVVSRouter",
                            "name": "_VVSRouterContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IDistributeTuring",
                            "name": "_DistributeTuringContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ITuringCrpLpContract",
                            "name": "_TuirngCroLpContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IPriceOracle",
                            "name": "_PriceOracleContract",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_TURING",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IBEP20",
                            "name": "_TURING_CRO_LP",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_USDC",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_WCRO",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [{
                            "indexed": false,
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_croSend",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_croRefund",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_turingReceive",
                            "type": "uint256"
                        }
                    ],
                    "name": "onBuy",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "DistributeTuringContract",
                    "outputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "ENABLE",
                    "outputs": [{
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "PriceOracleContract",
                    "outputs": [{
                        "internalType": "contract IPriceOracle",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TURING_CRO_LP",
                    "outputs": [{
                        "internalType": "contract IBEP20",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuirngCroLpContract",
                    "outputs": [{
                        "internalType": "contract ITuringCrpLpContract",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringTimeLockContract",
                    "outputs": [{
                        "internalType": "contract ITuringTimeLock",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "TuringWhitelistContract",
                    "outputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "USDC",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "VVSRouterContract",
                    "outputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "WCRO",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "name": "arrPid",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "baseRatio",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "burnLpToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "buy",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "close",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "connectVVSRouter",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "disable",
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
                    "inputs": [],
                    "name": "enable",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getCroBalance",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getData",
                    "outputs": [{
                        "internalType": "uint256[9]",
                        "name": "data_",
                        "type": "uint256[9]"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint256",
                            "name": "_amtCroOnAddLp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amtCroLpContract",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amtTuringLpContract",
                            "type": "uint256"
                        }
                    ],
                    "name": "getEstimateTuringOnAddLp",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "_amtTuringOnAddLp",
                        "type": "uint256"
                    }],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPriceTuringToCRO",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amtCRO",
                            "type": "uint256"
                        }
                    ],
                    "name": "getProcessAmt",
                    "outputs": [{
                            "internalType": "uint256",
                            "name": "_croSend",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_croRefund",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_turingReceive",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getReserves",
                    "outputs": [{
                            "internalType": "uint112",
                            "name": "_amtCroLpContract",
                            "type": "uint112"
                        },
                        {
                            "internalType": "uint112",
                            "name": "_amtTuringLpContract",
                            "type": "uint112"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "_user",
                        "type": "address"
                    }],
                    "name": "getTurBuyMaxOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "maxQuantityBuyTuringOfUser",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "priceTuringLaunchpad",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "ratioCroAddLp",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "name": "ratioPidsOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "requireClose",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IDistributeTuring",
                        "name": "_DistributeTuringContract",
                        "type": "address"
                    }],
                    "name": "setDistributeTuringContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_maxQuantityBuyTuringOfUser",
                        "type": "uint256"
                    }],
                    "name": "setMaxQuantityBuyTuringOfUser",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IPriceOracle",
                        "name": "_PriceOracleContract",
                        "type": "address"
                    }],
                    "name": "setPriceOracleContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_priceTuringLaunchpad",
                        "type": "uint256"
                    }],
                    "name": "setPriceTuringLaunchpad",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                            "internalType": "uint256",
                            "name": "_pid",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_ratio",
                            "type": "uint256"
                        }
                    ],
                    "name": "setRatioPidsOf",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_requireClose",
                        "type": "uint256"
                    }],
                    "name": "setRequireClose",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "uint256",
                        "name": "_totalTuringBuyLaunchpad",
                        "type": "uint256"
                    }],
                    "name": "setTotalTuringBuyLaunchpad",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringCrpLpContract",
                        "name": "_TuirngCroLpContract",
                        "type": "address"
                    }],
                    "name": "setTuirngCroLpContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IBEP20",
                        "name": "_TURING_CRO_LP",
                        "type": "address"
                    }],
                    "name": "setTuringCroLpToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IBEP20",
                        "name": "_TURING",
                        "type": "address"
                    }],
                    "name": "setTuringTokenContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract ITuringWhitelist",
                        "name": "_TuringWhiteListContract",
                        "type": "address"
                    }],
                    "name": "setTuringWhiteListContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "contract IVVSRouter",
                        "name": "_VVSRouterContract",
                        "type": "address"
                    }],
                    "name": "setVVSRouterContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalTuringBuyLaunchpad",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }],
                    "name": "turingbuyedOf",
                    "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                }
            ]
        }
    };
}(jQuery));