$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        1029: {
            info: {
                getAllowTransfer: '0xfD6a73988C367f05Fa3A9F7a91Cb7Cd3975432c5',
                balanceInfo: '0x587843dA605eEAd150bfA4f035545DdF192358ef',
                priceInfo: '0x1c358AB0871aDBCf73Bf5190a748C5A909d8C24d',
                orclePriceInfo: ''
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
                // 0: {
                //     type: 'vvs_pool',
                //     contract: '0x9F96F16C8A05b28Eb7d20b2058aA712996eaBe60',
                //     want: '0x137d78C7f129b643e3450F3578Ff9152728f203c', // vvs
                //     wantDecimals: 18,
                //     pid: 0,
                //     isActive: true,
                //     isBep20: true,
                //     isActive: true,
                // },
            },
            harvestMachine: '',
            orclePriceContract: '',
            protocolLiquidityLaunch: {
                contract: "0x4a0a59eaE15AB3aC6211fD6baa1eD7021048848d",
                totalTuringOffered: 50000000000
            }
        },
    };
    var TOKENS = {
        25: {
            'vvs': '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03'
        },
        338: {
            'vvs': '0x137d78C7f129b643e3450F3578Ff9152728f203c'
        },
        1029: {
            'trx': '0xA51E181FbE77F2a6D1eA137347775F7Ea81ac6b7'
        },

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