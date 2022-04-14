$.TURRING_PROTOCOL_LIQUIDITY_LAUNCH = function() {};
$.TURRING_PROTOCOL_LIQUIDITY_LAUNCH.prototype = (function() {
    var setting = {
        chainId: 25,
        pids: [] // 0 => get ALL,
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
                await self.getData();
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

        async getData() {
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.protocolLiquidityLaunch.contract;
            let _readContract = cronosContractHelper.getReadContract(_contract, _abi);
            let _r = await _readContract.methods.getData(_user).call();

            let _data = {};
            /**
             *      data_[0] = uint256 croBalanceOfUSer;
                    data_[1] = uint256 maxTuringReceive;
                    data_[2] =  uint256 maxCroBuy;
                    data_[3] = uint256 croBalanceOfContract;
                    data_[4] = uint256 croAddLp;
                    data_[5] = uint256 croDistributeFarms;
                    data_[6] = uint256 maxTuringSell;
                    data_[7] = uint256 maxQuantityBuyTuringOfUser;
                    data_[8] = uint256 totalTuringBuyLaunchpad;
                    data_[9] = uint256 priceTuringLaunchpad;
             */
            _data.croBalanceOfUSer = coreHelper.parseFloatNumber(parseInt(_r[0]) / 1e18, 18);
            _data.maxTuringReceive = coreHelper.parseFloatNumber(parseInt(_r[1]) / 1e18, 18);
            _data.maxCroBuy = coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.croBalanceOfContract = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            _data.croOnAddLp = coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 18);
            _data.croDistributeFarms = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.maxQuantityBuyTuringOfUser = coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 18);
            _data.totalTuringBuyLaunchpad = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.priceTuringLaunchpad = coreHelper.parseFloatNumber(parseInt(_r[8]) / 1e18, 18);

            _data.totalTuringBuy = _contractsObj.protocolLiquidityLaunch.totalTuringBuy;
            _data.turingBuyed = coreHelper.numberWithCommas((_data.totalTuringBuy * 1e18 - parseInt(_r[7])) / 1e18, 6)

            // console.log(_data);

            await this._initUserData(_user, _data);

        },

        async drawUI() {
            let self = this;
            let _user = coreHelper.getUserAccount();
            let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
            let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};

            let _ratioProgess = _data.turingBuyed * 100 / _data.totalTuringBuy

            $(`.total-cro-obtained`).html(`${ coreHelper.numberWithCommas(_data.croBalanceOfContract, 3) }`);
            $(`.total-turing-buy-launch`).html(`${ coreHelper.numberWithCommas(_data.totalTuringBuy, 0) }`);
            $(`.turing-price-launch`).html(`$${ coreHelper.numberWithCommas(_data.priceTuringLaunchpad, 2) }`);
            $(`.max-buy-of`).html(`${ coreHelper.numberWithCommas(_data.maxQuantityBuyTuringOfUser, 2) }`);
            $(`.u-cro-bal`).html(`${ coreHelper.numberWithCommas(_data.croBalanceOfUSer, 8) }`)

            $(`.progress-bar`).css(`width`, `${_ratioProgess}%`);
            $(`.ratio`).html(`${ coreHelper.numberWithCommas(_ratioProgess, 2) }%`)

            setTimeout(function() {
                self.drawUI()
            }, 3000)
        },

        async processAmt() {
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.protocolLiquidityLaunch.contract;
            let _readContract = cronosContractHelper.getReadContract(_contract, _abi);

            let _amtCro = $(`input[name=amount_cro]`).val();

            _readContract
                .methods
                .getProcessAmt(_user, coreHelper.toBN(_amtCro))
                .call()
                .then(_result => {
                    $(`input[name=turing_receive]`).val(coreHelper.numberWithCommas(_result[2] / 1e18, 8));
                    $(`input[name=cro_refund]`).val(coreHelper.numberWithCommas(_result[1] / 1e18), 8);
                    if ($(`input[name=amount_cro]`).val() > _result[0] / 1e18) {
                        $(`input[name=amount_cro]`).val(_result[0] / 1e18)
                    }
                    $(`.max-cro`).on("click", () => {
                        $(`input[name=amount_cro`).val(_result[0] * 1.0001 / 1e18);
                    })
                })

            setTimeout(() => {
                this.processAmt()
            }, 3000)
        },

        buy() {
            $(`.btn-buy`).click(function(e) {
                let _abi = abiHelper.getProtocolLiquidityLaunchABI();
                let _user = coreHelper.getUserAccount();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.protocolLiquidityLaunch.contract;
                let callContarct = cronosContractHelper.getMainContract(_contract, _abi);

                let input = $(`input[name=amount_cro]`).val();
                callContarct
                    .methods
                    .buy()
                    .send({ from: _user, value: coreHelper.toBN(input) })
                    .on("transactionHash", function(hash) {
                        console.log(hash);
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on("confirmation", function(confirmationNumber, receipt) {
                        if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                            coreHelper.hidePopup('confirm-popup', 0);
                            coreHelper.showPopup('success-confirm-popup');
                            coreHelper.hidePopup('success-confirm-popup', 10000);
                            $('input[name=amount_cro]').val("");
                        }
                    })
                    .on('receipt', (receipt) => {
                        self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });

            })
        },

        _showSuccessPopup(receipt) {
            if (receipt.status == true && !transactions[receipt.transactionHash]) {
                transactions[receipt.transactionHash] = true;
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            }
        },

        async _initUserData(_user, _data) {

            let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
            _protocolLauchInfoOf = _protocolLauchInfoOf ? _protocolLauchInfoOf : {};
            _protocolLauchInfoOf[_user] = _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
            _protocolLauchInfoOf[_user] = _data;
            storeHelper.setVaule('protocolLauchInfoOf', _protocolLauchInfoOf);
        },


    }
}(jQuery));