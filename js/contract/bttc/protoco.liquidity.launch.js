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
            let self = this;
            let _abi = abiHelper.getProtocolLiquidityLaunchABI();
            let _user = coreHelper.getUserAccount();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.protocolLiquidityLaunch.contract;
            let _readContract = cronosContractHelper.getReadContract(_contract, _abi);
            let _r = await _readContract.methods.getData(_user).call();

            let _data = {};
            /**
             *      data_[0] = uint256 bttBalanceOfUSer;
                    data_[1] = uint256 maxTuringBuy;
                    data_[2] = uint256 maxBTTPay;
                    data_[3] = uint256 bttBalanceOfContract;
                    data_[4] = uint256 maxQuantityBuyTuringOfUser;
                    data_[5] = uint256 totalTuringBuyLaunchpad;
                    data_[6] = uint256 priceTuringLaunchpad;
             */
            _data.uBTTBal = coreHelper.parseFloatNumber(parseInt(_r[0]) / 1e18, 18);
            _data.uMaxTurBuy = coreHelper.parseFloatNumber(parseInt(_r[1]) / 1e18, 18);
            _data.uMaxBTTPay =  coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.cBTTBal = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            _data.config = {
                maxQuantityBuyTuringOfUser: coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 8),
                priceTuringLaunchpad: coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 8),
                totalTuringBuy: _contractsObj.protocolLiquidityLaunch.totalTuringBuy
            };
            _data.totalTuringBuyLaunchpad = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.totalTurBuyed = _data.config.totalTuringBuy - _data.totalTuringBuyLaunchpad;
            // _data.totalTurBuyed = coreHelper.numberWithCommas(_data.config.totalTuringBuy - _data.totalTuringBuyLaunchpad, 6)
            self.processAmt(null, _data);
            self.drawUI( _data);
            await self._initUserData(_user, _data);

        },

        async drawUI(_data) {
            let self = this;
            let _ratioProgess = _data.totalTurBuyed * 100 / _data.config.totalTuringBuy;

            $(`.total-btt-obtained`).html(`${ coreHelper.formatBalance(_data.cBTTBal, 3) }`);
            $(`.total-turing-buy-launch`).html(`${ coreHelper.formatBalance(_data.config.totalTuringBuy, 0) }`);
            $(`.turing-price-launch`).html(`${ coreHelper.numberWithCommas(_data.config.priceTuringLaunchpad, 2) }`);
            $(`.max-buy-of`).html(`${ coreHelper.formatBalance(_data.config.maxQuantityBuyTuringOfUser, 2) }`);
            $(`.u-btt-bal`).html(`${ coreHelper.numberWithCommas(_data.uBTTBal, 8) }`)

            $(`.progress-bar`).css(`width`, `${_ratioProgess}%`);
            if (_ratioProgess > 0.1) {
                $(`.ratio`).html(`${ coreHelper.numberWithCommas(_ratioProgess, 2) }%`);
            } 
        },


        async processAmt(_bttPay = null, _data = null) {
            if (_data == null) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
            }
            if (!_data) return false;
            if (_bttPay == null) _bttPay = $(`input[name=amount_btt]`).val();

            let _pTurToBTT = _data.config.priceTuringLaunchpad;
            let _uMaxTurBuy = _data.uMaxTurBuy;
            let _uMaxBTTPay = _data.uMaxBTTPay <= _data.uBTTBal ? _data.uMaxBTTPay : _data.uBTTBal;

            if (_uMaxTurBuy <= 0) {
                $(`input[name=turing_receive]`).val(0);
            }

            let _uTurBuyAmt = _bttPay / _pTurToBTT;
            _uTurBuyAmt = _uTurBuyAmt <= _uMaxTurBuy ? _uTurBuyAmt : _uMaxTurBuy;

            $(`input[name=turing_receive]`).val(_uTurBuyAmt);
        },
        onAmountPayChange() {
            let self = this;
            $(`input[name=amount_btt]`).on('input', (e) => {
               self.processAmt(e.target.value);
            });
        },
        clickMax() {
            $(`.max-btt`).on("click", () => {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                $(`input[name=amount_btt`).val(_data.uMaxBTTPay);
            });
        },

        buy() {
            $(`.btn-buy`).click(function(e) {
                let _abi = abiHelper.getProtocolLiquidityLaunchABI();
                let _user = coreHelper.getUserAccount();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.protocolLiquidityLaunch.contract;
                let callContarct = cronosContractHelper.getMainContract(_contract, _abi);

                let input = $(`input[name=amount_btt]`).val();
                callContarct
                    .methods
                    .buy()
                    .send({ from: _user, value: coreHelper.toBN(input) })
                    .on("transactionHash", function(hash) {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on("confirmation", function(confirmationNumber, receipt) {
                        if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                            coreHelper.hidePopup('confirm-popup', 0);
                            coreHelper.showPopup('success-confirm-popup');
                            coreHelper.hidePopup('success-confirm-popup', 10000);
                            $('input[name=amount_btt]').val("");
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