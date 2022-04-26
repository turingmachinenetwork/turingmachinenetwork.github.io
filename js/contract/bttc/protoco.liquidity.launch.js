$.TURRING_PROTOCOL_LIQUIDITY_LAUNCH = function() {};
$.TURRING_PROTOCOL_LIQUIDITY_LAUNCH.prototype = (function() {
    var setting = {
        chainId: 25,
        pids: [], // 0 => get ALL,
        transactionFee: 50 // BTT
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
                data_[0] = uint256 userBTTBalance;
                data_[1] = uint256 userMaxTuringBuy;
                data_[2] = uint256 userMaxBTTPay;
                data_[3] = uint256 contractBTTBalance;
                data_[4] = uint256 HARD_CAP_PER_USER;
                data_[5] = uint256 totalSaleTuring;
                data_[6] = uint256 salePrice;
                data_[7] = uint256 totalPurchased;
             */
            _data.uBTTBal = coreHelper.parseFloatNumber(parseInt(_r[0]) / 1e18, 18);
            _data.uMaxTurBuy = coreHelper.parseFloatNumber(parseInt(_r[1]) / 1e18, 18);
            _data.uMaxBTTPay =  coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.cBTTBal = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            _data.totalPurchased = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.config = {
                hardCapPerUser: coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 8),
                salePrice: coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 8),
                totalTuringOffered: _contractsObj.protocolLiquidityLaunch.totalTuringOffered
            };
            _data.totalSaleTuring = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.totalTurBuyed = _data.config.totalTuringOffered - _data.totalSaleTuring;
            // _data.totalTurBuyed = coreHelper.numberWithCommas(_data.config.totalTuringOffered - _data.totalSaleTuring, 6)
            self.processAmt(null, _data);
            self.drawUI( _data);
            await self._initUserData(_user, _data);

        },

        async drawUI(_data) {
            let self = this;
            let _ratioProgess = _data.totalTurBuyed * 100 / _data.config.totalTuringOffered;

            $(`.total-btt-perchased`).html(`${ coreHelper.formatBalance(_data.totalPurchased, 3) }`);
            $(`.total-turing-offered`).html(`${ coreHelper.formatBalance(_data.config.totalTuringOffered, 0) }`);
            $(`.sale-price`).html(`${ coreHelper.numberWithCommas(_data.config.salePrice, 2) }`);
            $(`.hard-cap-per-user`).html(`${ coreHelper.formatBalance(_data.config.hardCapPerUser, 2) }`);
            $(`.u-btt-max-pay`).html(`${ coreHelper.numberWithCommas(self.getMaxPay(_data), 8) }`)

            $(`.progress-bar`).css(`width`, `${_ratioProgess}%`);
            if (_ratioProgess > 0.1) {
                $(`.ratio`).html(`${ coreHelper.numberWithCommas(_ratioProgess, 2) }%`);
            } 
        },

        getMaxPay(_data) {
            let _maxPay = _data.uMaxBTTPay;
            let _uBal = _data.uBTTBal;
            let _fee = setting.transactionFee;

            if (_uBal <= _fee) {
                _maxPay = 0;
            } else {
                _maxPay = _maxPay < _uBal - _fee ? _maxPay : _uBal - _fee;
            }
            return _maxPay;
        },
        async processAmt(_bttPay = null, _data = null) {
            if (_data == null) {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
            }
            if (!_data) return false;
            if (_bttPay == null) _bttPay = $(`input[name=amount_btt]`).val();

            let _pTurToBTT = _data.config.salePrice;
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
            let self = this;
            $(`.max-btt`).on("click", () => {
                let _user = coreHelper.getUserAccount();
                let _protocolLauchInfoOf = storeHelper.getValue('protocolLauchInfoOf');
                let _data = _protocolLauchInfoOf && _protocolLauchInfoOf[_user] ? _protocolLauchInfoOf[_user] : {};
                
                $(`input[name=amount_btt`).val(self.getMaxPay(_data));
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