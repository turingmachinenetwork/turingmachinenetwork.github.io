$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        25: {
            info: {
                getAllowTransfer: '0xAe0419df26ee79969a2A09abEf7017aEb53C0Bbe',
                balanceInfo: '0x06266211CE801AbbFA14E9A0A3F5d0B6d5ee5Ade',
                priceInfo: '0xCC84553a556cA660b921557a1777199a66800F70',
                orclePriceInfo: '0x365c7b67027BdBe9DC315280C2966e290Ee81793'
            },
            swap: {
                pool: {
                    // venus: {
                    //     tradeMachine: '0x262AAc4c53EEAdb2a365A5bD48A2F17ED79d0d7D',
                    //     info: {
                    //         pairs: '0xE71A635528696be0Fd1658ef436b6a0968ad0dBd'
                    //     },
                    //     pairs: [{
                    //             contract: '0xd62FDB0c42288B975c247cBb0C03416514b6b121',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'usdt'
                    //         },
                    //         {
                    //             contract: '0x6b064E7250FD5475473831EF3F6Bc6C1E5C7F1Cc',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'usdc'
                    //         },
                    //         {
                    //             contract: '0xC709A981eeF30cbA9e9636e9ABD8f4f769dC618c',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'dai'
                    //         },
                    //         {
                    //             contract: '0xe2EAE89F05583FBef95408f04f6CC12b78FdBDcb',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'vai'
                    //         }
                    //     ]
                    // }
                },
            },
            farms: {
                0: {
                    type: 'vvs_pool',
                    contract: '0xB9051C8367Abff507075f6383463F66F930d49E2',
                    want: '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03', // VVS
                    wantDecimals: 18,
                    pid: 0,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                },
                1: {
                    type: 'vvs_no_loss_pool',
                    contract: '0x7b3123388109b03f5d48A330fdB18650D7B4E1c1',
                    want: '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03', // VVS
                    wantDecimals: 18,
                    pid: 1,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVVSNoLoss',
                    price: 0.01,
                    version: 1
                },
                2: {
                    type: 'turing_cro_lp_pool',
                    contract: '0x31A0005e28CBbbE17d5C803813b32A391573EDb2',
                    want: '0xff575bf7f144838885720F72B1Af9dE1fFC75518', // turing cro lp
                    wantDecimals: 18,
                    pid: 2,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringCroLp',
                    price: 1,
                    version: 1
                }


            },
            harvestMachine: "0x3F1a74F3d08F540C7abD86ab14922182aC49741C"
        },
        338: {
            info: {
                getAllowTransfer: '0xCD243cA0f4FdE7e78Fd820e31207fe97d8bB6e22',
                balanceInfo: '0x6B582994617b23560A1801FBb6431F1d85e6B33c',
                priceInfo: '0x1c358AB0871aDBCf73Bf5190a748C5A909d8C24d',
                orclePriceInfo: '0x27A04b4fa1b737c47C4608c81fEe3BD56cF35828'
            },
            swap: {
                pool: {
                    // venus: {
                    //     tradeMachine: '0xBA3948A1f7Fd9Ff19ab77CC52019f5125fb6F0Db',
                    //     info: {
                    //         pairs: '0xd0EaEccA69D3bd5634A764917241a03CF42E5EEF'
                    //     },
                    //     pairs: [{
                    //             contract: '0xB5b5695DB823ebb597E2B21149eC5F6E6baaC80f',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'usdt'
                    //         },
                    //         {
                    //             contract: '0xe2e6670e952016fbd31307ab62F7a42e3Ddde52E',
                    //             tradeFee: 0.002,
                    //             performanceFee: 0.16,
                    //             safuFund: 0.04,
                    //             base: 'busd',
                    //             token: 'usdc'
                    //         }
                    //     ]
                    // }
                }
            },
            farms: {
                0: {
                    type: 'vvs_pool',
                    contract: '0x9F96F16C8A05b28Eb7d20b2058aA712996eaBe60',
                    want: '0x137d78C7f129b643e3450F3578Ff9152728f203c', // vvs
                    wantDecimals: 18,
                    pid: 0,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                },
                1: {
                    type: 'vvs_lp_pool',
                    contract: '0xa03C6181E085dfd9150F0a94575Ab6F08100B074',
                    want: '0x7FB8DFC3acDC5Dfd66e3256155fB792EC34BC043', // cro vvs
                    wantDecimals: 18,
                    pid: 1,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: '[VVS_LP]CRO_VVS',
                    price: 0.0001,
                    version: 1
                },
                2: {
                    type: 'vvs_lp_pool',
                    contract: '0x6d110d0f9e37555f8DD5037F93C3a51BBc77f5B2',
                    want: '0x267CB162Fc35e070bac4201B08cC43c31a0Ce83B', // vvs usdc
                    wantDecimals: 18,
                    pid: 2,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: '[VVS_LP]VVS_USDC',
                    price: 0.01,
                    version: 1
                },
                3: {
                    type: 'vvs_lp_pool',
                    contract: '0x9Ba1279ca0a00E012c33A2945Aa1Eb9ca153E0a3',
                    want: '0x14e65035d43189D9C8F788D65401232788a4aF3b', // usdt usdc
                    wantDecimals: 18,
                    pid: 3,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: '[VVS_LP]USDT_USDC',
                    price: 2,
                    version: 1
                },
                4: {
                    type: 'vvs_no_loss_pool',
                    contract: '0xbb89505E69BdfDde244Da52a0928Be3bb7f7d74d',
                    want: '0x137d78C7f129b643e3450F3578Ff9152728f203c', // vvs
                    wantDecimals: 18,
                    pid: 4,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVVSNoLoss',
                    price: 0,
                    version: 1
                },
                5: {
                    type: 'turing_cro_lp_pool',
                    contract: '0x788DE0c8Ec39699Cc13144E846ac291104a0515f',
                    want: '0xcCDcC9b458370798E4F70244343DE97Bff91E5C5', // turing cro lp
                    wantDecimals: 18,
                    pid: 5,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringCroLp',
                    price: 1,
                    version: 1
                }
            },
            harvestMachine: '0xB138e79D52A8a29d7B907551Ff4B2A6eB3EC9617',
            orclePriceContract: '0x56d92dc03CC34b6620e56a33eD8F435245FAc63C'
        },
        97: {
            info: {
                getAllowTransfer: '0x9EfD5D477Fe79C756ceF532BA5554350D3A52677',
                balanceInfo: '0x857CfDf26CCC2BF1aF33FbC3B6E9234fd2552D43',
                priceInfo: '0x16F3646b788453317e6BAD385dDCB645Bf3fEc80',
                orclePriceInfo: ''
            },
            farms: {
                0: {
                    type: 'vvs_pool',
                    contract: '0xd5Dc8E9dd65De0DB3926e64437DbeCa595163621',
                    want: '0x9766a14878209776d5c2F468A86046142007032C', // vvs
                    wantDecimals: 18,
                    pid: 0,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                },
            },
            protocolLiquidityLaunch: {
                contract: "0xCfD664862B375cca2BE158d7c9314DC98ae0F24B",
                totalTuringBuy: 1000
            }
        }
    };
    var TOKENS = {
        25: {
            'vvs': '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03'
        },
        338: {
            'vvs': '0x137d78C7f129b643e3450F3578Ff9152728f203c'
        }

    }
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        /**
         * @param _chainId {Number} 56 || 97
         */
        getContracts(_chainId = 56) {
            return CONTRACTS[_chainId];
        },
        /**
         * @param _chainId {Number} 56 || 97
         */
        getTokens(_chainId = 56) {
            return TOKENS[_chainId];
        },
        getTokenList(_chainId = 56) {
            let _tokenObj = this.getTokens(_chainId);
            let _tokenList = [];
            for (let idx in _tokenObj) {
                _tokenList.push(_tokenObj[idx]);
            }
            return _tokenList;
        },
        /**
         * @param _chainId {Number} 56 || 97
         * @param _tokenName {String}
         */
        getTokenByTokenName(_chainId = 56, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        }
    };
}(jQuery));