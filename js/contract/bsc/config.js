$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        56: {
            info: {
                getAllowTransfer: '0x6BCab47a1c25f06B8CBE2d2BfF57B736D7255c32',
                balanceInfo: '0x2f77996A6FfaA2F2BAD01dD5d911AFA5C565Df81',
                priceInfo: '0x77A695554628C135cE83baa637104d70A04f966e'
            },
            swap: {
                pool: {
                    venus: {
                        tradeMachine: '0x262AAc4c53EEAdb2a365A5bD48A2F17ED79d0d7D',
                        info: {
                            pairs: '0xE71A635528696be0Fd1658ef436b6a0968ad0dBd'
                        },
                        pairs: [{
                                contract: '0xd62FDB0c42288B975c247cBb0C03416514b6b121',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'usdt'
                            },
                            {
                                contract: '0x6b064E7250FD5475473831EF3F6Bc6C1E5C7F1Cc',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'usdc'
                            },
                            {
                                contract: '0xC709A981eeF30cbA9e9636e9ABD8f4f769dC618c',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'dai'
                            },
                            {
                                contract: '0xe2EAE89F05583FBef95408f04f6CC12b78FdBDcb',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'vai'
                            }
                        ]
                    }
                },
            },
            farms: {
                0: {
                    type: 'cake_lp_pool',
                    contract: '0x588Cd06bED000f5979259473712BA6918b73304a',
                    want: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0', // cake lp
                    pid: 0,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeBNBLP_V1',
                    price: 256,
                    version: 1
                },
                1: {
                    type: 'cake_lp_pool',
                    contract: '0xc4758e432de36BC3F44f383FCF9A61D0Ce2a9e64',
                    want: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0', // cake lp
                    pid: 1,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeBNBLP_V2',
                    price: 256,
                    version: 2
                },
                2: {
                    type: 'cake_no_loss_pool',
                    contract: '0x98292750578aa741e1623E09dE3C5A1C8Fe82367',
                    want: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // 
                    pid: 2,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringCakeNoLoss',
                    price: 0,
                    version: 1
                },
                3: {
                    type: 'cake_pool',
                    contract: '0xeABC96b9bE830af31846053e361d25e7D928E638',
                    want: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // 
                    pid: 3,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeV1',
                    price: 0,
                    version: 1
                },
                4: {
                    type: 'cake_pool',
                    contract: '0xFdE9BC72F9791B738FC47aeB07f426243b25E6a3',
                    want: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // 
                    pid: 4,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeV2',
                    price: 0,
                    version: 2
                },
                5: {
                    type: 'turing_lp_pool',
                    contract: '0xbFeE817d038aEb8b773e69844b6c6c7c14419455',
                    want: '0xCF8b7E1F36d46c1352eB923E0058643a9594804C', // 
                    pid: 5,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmTuringBNBLP_V1',
                    price: 30,
                    version: 1
                },
                6: {
                    type: 'turing_lp_pool',
                    contract: '0xcb3B1A0905ADe6C7D1dB17fD92409dA057df7ec3',
                    want: '0xC4B04C545261db0dC1cCC33dc99bBd98A9c630f5', // 
                    pid: 6,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmTuringBNBLP_V2',
                    price: 30,
                    version: 2
                },
                7: {
                    type: 'cake_lp_pool',
                    contract: '0x2c184b922681882A9b277EE4090170B71E99e74E',
                    want: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd', // 
                    pid: 7,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeUSDT_BUSD_LP_V1',
                    price: 2,
                    version: 1
                },
                8: {
                    type: 'cake_lp_pool',
                    contract: '0xc8a61e2d78697C41D81752831c436AaC846464d7',
                    want: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd', // 
                    pid: 8,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeUSDT_BUSD_LP_V2',
                    price: 2,
                    version: 2
                },
                9: {
                    type: 'cake_lp_pool',
                    contract: '0xb2Bd7C2D2577d8Cb95ed31e7E388b2D846626E0e',
                    want: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE', // 
                    pid: 9,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeUSDT_BNB_LP',
                    price: 45,
                    version: 1
                },
                10: {
                    type: 'cake_lp_pool',
                    contract: '0x9d75212AC8f9Edbd1901Af67b550779Cef14dB8d',
                    want: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', // 
                    pid: 10,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeBUSD_BNB_LP',
                    price: 48,
                    version: 1
                },
                11: {
                    type: 'cake_lp_pool',
                    contract: '0xCFa7F1485FBDC29F52662A8E2D3F247539Df51DC',
                    want: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082', // 
                    pid: 11,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeBTCB_BNB_LP',
                    price: 12000,
                    version: 1
                },
                12: {
                    type: 'cake_lp_pool',
                    contract: '0x1C9CcF44d143aE86fAaDD2A42197c0d281511a32',
                    want: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc', // 
                    pid: 12,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringFarmCakeETH_BNB_LP',
                    price: 3300,
                    version: 1
                },
                13: {
                    type: 'turing_venus_lp_pool',
                    contract: '0xC177D351DD8E69f6727a350c2711B7CfC208AFD2',
                    want: '0xd62FDB0c42288B975c247cBb0C03416514b6b121', // 
                    pid: 13,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVenusUSDT_BUSD_LP',
                    price: 2,
                    version: 1
                },
                14: {
                    type: 'turing_venus_lp_pool',
                    contract: '0x5008c518063C907eb3234b0aB6273d843d81FFf9',
                    want: '0x6b064E7250FD5475473831EF3F6Bc6C1E5C7F1Cc', // 
                    pid: 14,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVenusUSDC_BUSD_LP',
                    price: 2,
                    version: 1
                },
                15: {
                    type: 'turing_venus_lp_pool',
                    contract: '0x3Dc50B71e630a6E4B07f7d406faEb4f4Bb470A50',
                    want: '0xC709A981eeF30cbA9e9636e9ABD8f4f769dC618c', // 
                    pid: 15,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVenusDAI_BUSD_LP',
                    price: 2,
                    version: 1
                },
                16: {
                    type: 'turing_venus_lp_pool',
                    contract: '0x5bf342bb704d55fDfC4c9B2E2fA1292f543dC8dc',
                    want: '0xe2EAE89F05583FBef95408f04f6CC12b78FdBDcb', // 
                    pid: 16,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVenusVAI_BUSD_LP',
                    price: 2,
                    version: 1
                },
                17: {
                    type: 'turing_stake',
                    contract: '0x53a648B6A77AFc1A46815588809Ea8A6bD4a23c5',
                    want: '0x76eD05FA250E8E993275e6E78b470B4D70Ed120B', // 
                    pid: 17,
                    rateToCalculateAverageStakeTime: 0,
                    speed: 1,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringStake1x',
                    price: null,
                    version: 1
                },
                18: {
                    type: 'turing_stake',
                    contract: '0x18bcd760Fa77BBE3Cf35A3004A482c9BC9Be3328',
                    want: '0x76eD05FA250E8E993275e6E78b470B4D70Ed120B', // 
                    pid: 18,
                    rateToCalculateAverageStakeTime: 0.5,
                    speed: 3,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringStake3x',
                    price: null,
                    version: 1
                },
                19: {
                    type: 'turing_stake',
                    contract: '0x2403C811206d27eb40a81450d7125808B565F889',
                    want: '0x76eD05FA250E8E993275e6E78b470B4D70Ed120B', // 
                    pid: 19,
                    rateToCalculateAverageStakeTime: 1,
                    speed: 9,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringStake6x',
                    price: null,
                    version: 1
                },
                20: {
                    type: 'turing_alpaca_farm_bnb',
                    contract: '0xA14c7692e1cfa6257E2CABB542B1842668a40728',
                    want: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // 
                    pid: 20,
                    isBep20: false,
                    isActive: true,
                    label: 'TuringAlpacaFarmBNB',
                    price: null,
                    version: 1
                }
            },
            harvestMachine: "0xde43520a7BB65535208512159fe5448636067a06"
        },
        97: {
            info: {
                getAllowTransfer: '0x4896B99D80319793A60bDE2c5e36c5bF8062bd75',
                balanceInfo: '0x62e9DcfeF799924BFa404571cC67B5aeAE369463',
                priceInfo: '0x26877a40F1B7B6B3e4537Fa7dA2E30606d0B13e9'
            },
            swap: {
                pool: {
                    venus: {
                        tradeMachine: '0xBA3948A1f7Fd9Ff19ab77CC52019f5125fb6F0Db',
                        info: {
                            pairs: '0xd0EaEccA69D3bd5634A764917241a03CF42E5EEF'
                        },
                        pairs: [{
                                contract: '0xB5b5695DB823ebb597E2B21149eC5F6E6baaC80f',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'usdt'
                            },
                            {
                                contract: '0xe2e6670e952016fbd31307ab62F7a42e3Ddde52E',
                                tradeFee: 0.002,
                                performanceFee: 0.16,
                                safuFund: 0.04,
                                base: 'busd',
                                token: 'usdc'
                            }
                        ]
                    }
                }
            },
            farms: {
                1: {
                    type: 'cake_no_loss_pool',
                    contract: '0xF995cADaEFE229e072dBB950eeD047BE143792D5',
                    want: '0xC92e5AdA37ac86e81B05134E2fcC79623c509b72', // 
                    pid: 1,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringCakeNoLoss',
                    price: 0,
                    version: 1
                },
                2: {
                    type: 'turing_venus_lp_pool',
                    contract: '0xdA44C5E2fA394d96a6bF6127f01cA721b59Ac813',
                    want: '0xB5b5695DB823ebb597E2B21149eC5F6E6baaC80f', // 
                    pid: 2,
                    isActive: true,
                    isBep20: true,
                    isActive: true,
                    label: 'TuringVenusUSDT_BUSD_LP',
                    price: 2,
                    version: 1
                },
            }
        }
    };
    var TOKENS = {
        56: {
            'wbnb': '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
            'busd': '0xe9e7cea3dedca5984780bafc599bd69add087d56',
            'cake': '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
            'usdt': '0x55d398326f99059ff775485246999027b3197955',
            'xvs': '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
            'usdc': '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            'dai': '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
            'vai': '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
            // 'vbusd': '0x95c78222b3d6e262426483d42cfa53685a67ab9d',
            // 'vusdt': '0xfd5840cd36d94d7229439859c0112a4185bc0255',
            // 'vusdc': '0xeca88125a5adbe82614ffc12d0db554e2e2867c8',
            // 'vdai': '0x334b3ecb4dca3593bccc3c7ebd1a1c1d1780fbf1'
        },
        97: {
            'busd': '0xbe94bFf8299d54575bbEeF0D701A7F8B7a0d2E0b',
            'usdt': '0xA411e3f045CbdeEC5C970e9948a343CE5322396a',
            'usdc': '0x0BD5f4cE549B423e2c35C1C845C9FCdB7e9dCEED',
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