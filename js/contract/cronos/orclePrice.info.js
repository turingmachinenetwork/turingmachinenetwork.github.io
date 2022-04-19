$.ORCLE_PRICE_INFO = function() {};
$.ORCLE_PRICE_INFO.prototype = (function() {
    var setting = {
        chainId: 25
    };
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.initData();
        },
        async initData() {
            let self = this;
            try {
                await self._initOrclePrice();
                self.reloadData();
            } catch (e) {
                console.log("INIT::DATA::FALSE", e);
                self.reloadData();
            }
        },

        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 3000);
        },

        async _initOrclePrice() {
            try {
                let _abi = abiHelper.getOrclePriceInfoABI();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.info.orclePriceInfo;
                let _readContract = cronosContractHelper.getReadContract(_contract, _abi);
                let _tokenObj = configHelper.getTokenList(setting.chainId);
                let _r = await _readContract.methods.getData(_tokenObj).call();

                let currentPrice = _r[0].currentPrice;
                let nextPrice = _r[0].nextPrice;

                let ratio = 100 * nextPrice / currentPrice - 100;

                let math;

                if (ratio > 0) {
                    $(`.ratio`).css('color', 'rgb(7, 224, 7)');
                    math = "+";
                } else {
                    $(`.ratio`).css('color', 'red');
                    math = ""
                }

                $(`.priceOfSystem`).html(`${ coreHelper.parseFloatNumber(currentPrice / 1e18, 8) }`);
                $(`.ratio`).html(`${math}${ coreHelper.parseFloatNumber(ratio, 2) }%`);
                $(`.priceOfVVS`).html(`${ coreHelper.parseFloatNumber(nextPrice / 1e18, 8) }`);

            } catch (e) {
                console.log(e);
            }
        },
        // async drawUI() {
        //     let dPrice = storeHelper.getValue('dPrice')
        //     let _data = dPrice ? dPrice : {}
        //     console.log(_data);

        // }

    }
}(jQuery))