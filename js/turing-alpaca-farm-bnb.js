$.TuringAlpacaFarmBNB = function () {
};

$.TuringAlpacaFarmBNB.prototype = (function () {
    const isMainnet = false;
    const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    const TURING_ALPACA_FARM_BNB_ADDR='0x0161b070130740BF3b1b39960c3Fd22CC622eEEc';
    var turingAlpacaFarmBNBContract = null;
    var user = {};
    var setting = {
        pool: 'turing-alpaca-farm-bnb',
        isFarmPage: false
    };
    return {
        init: function (options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.initData();
        },
        initData() {
            let self = this;
            let _contract = self.getTuringAlpacaFarmBNBContract();
            if (!_contract) {
                return self.reloadInitData();
            }
            if (!core) {
                return self.reloadInitData();
            }
            let _userAddr = core.getCurrentAddress();
            if (!_userAddr) {
                return self.reloadInitData();
            }
            _contract
                .methods
                .getData(_userAddr)
                .call()
                .then(r => {
                    let _data = {
                        wantBal: core.parseFloatNumber(parseInt(r.userBNBBal_) / 1e18, 18),
                        wantShare: core.parseFloatNumber(parseInt(r.userBNBShare_) / 1e18, 18),
                        price: core.parseFloatNumber(parseInt(r.bnbPrice_) / 1e18, 18),
                        totalMintPerDay: core.parseFloatNumber(parseInt(r.totalMintPerDay_) / 1e18, 18),
                        totalShare: core.parseFloatNumber(parseInt(r.totalShare_) / 1e18, 18),
                        userTuringPending: core.parseFloatNumber(parseInt(r.userTuringPending_) / 1e18, 18),
                        turingAPY: core.parseFloatNumber(parseInt(r.turingAPY_) / 1e2, 2),
                        alpacaAPY: core.parseFloatNumber(parseInt(r.alpacaAPY_) / 1e10, 10),
                        ibBNBAPY: core.parseFloatNumber(parseInt(r.supplyAPY_) / 1e10, 10),
                        tvl: core.parseFloatNumber(parseInt(r.tvl_) / 1e18, 18)
                    };
                    if (page != null && (page === "Dashboard" || page === "Home")) {
                        if (
                            isMainnet == true &&
                            arrayContractFarmUserJoined &&
                            _data.wantShare > 0 &&
                            _data.userTuringPending > 0
                        ) {
                            arrayContractFarmUserJoined[`${setting.pool}-v1`] = TURING_ALPACA_FARM_BNB_ADDR;
                        } else if (arrayContractFarmUserJoined) {
                            delete arrayContractFarmUserJoined[`${setting.pool}-v1`];
                        }
                    }
                    user = _data;
                    self.initInterface();
                    return self.reloadInitData();
                })
                .catch(e => {
                    self.reloadInitData();
                });
        },
        reloadInitData() {
            let self = this;
            setTimeout(function () {
                self.initData();
            }, 3000);
        },
        initInterface() {
            $(`.${setting.pool}-your-stake`).html(core.numberWithCommas(user.wantShare, 18));
            $(`.${setting.pool}-your-earned`).html(core.numberWithCommas(user.userTuringPending, 18));
            $(`.${setting.pool}-tvl`).html(`$${core.numberWithCommas(user.tvl, 2)}`);
            $(`.${setting.pool}-user-bal`).html(core.numberWithCommas(user.wantBal, 18));
            $(`.${setting.pool}-user-state`).html(core.numberWithCommas(user.wantShare, 18));
            $(`.${setting.pool}-apy`).html(core.formatBalance((user.turingAPY + user.alpacaAPY + user.ibBNBAPY), 2));
            $(`.${setting.pool}-apy-alpaca`).html(core.formatBalance((user.alpacaAPY), 2));
            $(`.${setting.pool}-apy-turing`).html(core.formatBalance((user.turingAPY), 2));
            $(`.${setting.pool}-apy-ibbnb`).html(core.formatBalance((user.ibBNBAPY), 2));

            if (page != null && page === "Dashboard") {
                if (user.wantShare <= 0) {
                    $(`.${setting.pool}`).hide();
                } else {
                    $(`.${setting.pool}-user-stake`).html(core.formatBalance(user.wantShare, 2));
                    $(`.${setting.pool}`).show();
                }
            }
        },
        getWeb3ToRead() {
            if (isMainnet == true) {
                return core.getWeb3ToReadDataOnMainnet();
            } else {
                return core.getWeb3ToReadDataOnTestnet();
            }
        },
        getTuringAlpacaFarmBNBContract() {
            if (!core) {
                return false;
            }
            if (turingAlpacaFarmBNBContract) {
                return turingAlpacaFarmBNBContract;
            }
            let _turingAlpacaFarmBNBABI = abi.getTuringAlpacaFarmBNBABI();
            let _web3 = this.getWeb3ToRead();
            turingAlpacaFarmBNBContract = new _web3.eth.Contract(_turingAlpacaFarmBNBABI, TURING_ALPACA_FARM_BNB_ADDR);
            return turingAlpacaFarmBNBContract;
        },
        clickMaxDeposit() {
            let self = this;
            $(`.${setting.pool}-max-deposit`).click(function (e) {
                e.preventDefault();
                let _amount = user.wantBal ? user.wantBal : 0;
                $(`input[type=number][name=${setting.pool}-deposit-amt]`).val(_amount);
            });
        },
        clickMaxWithdraw() {
            let self = this;
            $(`.${setting.pool}-max-withdraw`).click(function (e) {
                e.preventDefault();
                let _amount = user.wantShare ? user.wantShare : 0;
                $(`input[type=number][name=${setting.pool}-withdraw-amt]`).val(_amount);
            });
        },
        deposit() {
            let self = this;
            $(`.${setting.pool}-deposit`).click(function (e) {
                e.preventDefault();
                let amount = $(`input[type=number][name=${setting.pool}-deposit-amt]`).val();
                amount = parseFloat(amount);
                if (typeof web3 == 'undifined') {
                    return false;
                }
                let userAddr = core.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }

                let _transactionHistory = {};
                _deposit();
                function _deposit() {
                    let _turingAlpacaFarmBNBABI = abi.getTuringAlpacaFarmBNBABI();
                    let _contract = new web3.eth.Contract(_turingAlpacaFarmBNBABI, TURING_ALPACA_FARM_BNB_ADDR);

                    _contract.methods.deposit().send({from: userAddr, value: core.toBN(amount, 18) })
                            .on('transactionHash', function (hash) {
                                core.showPopup('confirm-popup');
                            })
                            .on('confirmation', function (confirmationNumber, receipt) {
                                if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                                    _transactionHistory[receipt.transactionHash] = true;
                                    $(`input[type=number][name=${setting.pool}-deposit-amt]`).val('');
                                    core.hidePopup('confirm-popup', 0);
                                    core.showPopup('success-confirm-popup');
                                    core.hidePopup('success-confirm-popup', 10000);
                                }
                            });
                }
            });
        },
        withdraw() {
            let self = this;
            $(`.${setting.pool}-withdraw`).click(function (e) {
                e.preventDefault();
                let amount = $(`input[type=number][name=${setting.pool}-withdraw-amt]`).val();
                amount = parseFloat(amount);
                if (typeof web3 == 'undifined') {
                    return false;
                }
                let userAddr = core.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }
                let _transactionHistory = {};
                let _turingAlpacaFarmBNBABI = abi.getTuringAlpacaFarmBNBABI();
                let _contract = new web3.eth.Contract(_turingAlpacaFarmBNBABI, TURING_ALPACA_FARM_BNB_ADDR);

                _contract.methods.withdraw(core.toBN(amount, 18)).send({from: userAddr})
                        .on('transactionHash', function (hash) {
                            core.showPopup('confirm-popup');
                        })
                        .on('confirmation', function (confirmationNumber, receipt) {
                            if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                                _transactionHistory[receipt.transactionHash] = true;
                                $(`input[type=number][name=${setting.pool}-withdraw-amt]`).val('');
                                core.hidePopup('confirm-popup', 0);
                                core.showPopup('success-confirm-popup');
                                core.hidePopup('success-confirm-popup', 10000);
                            }
                        });
            });
        },
        harvest() {
            let self = this;
            $(`.${setting.pool}-harvest`).click(function (e) {
                e.preventDefault();
                if (typeof web3 == 'undifined') {
                    return false;
                }
                let userAddr = core.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }

                let _transactionHistory = {};
                let _turingAlpacaFarmBNBABI = abi.getTuringAlpacaFarmBNBABI();
                let _contract = new web3.eth.Contract(_turingAlpacaFarmBNBABI, TURING_ALPACA_FARM_BNB_ADDR);
                _contract.methods.harvest(userAddr).send({from: userAddr})
                        .on('transactionHash', function (hash) {
                            core.showPopup('confirm-popup');
                        })
                        .on('confirmation', function (confirmationNumber, receipt) {
                            if (receipt.status == true && !_transactionHistory[receipt.transactionHash]) {
                                _transactionHistory[receipt.transactionHash] = true;
                                core.hidePopup('confirm-popup', 0);
                                core.showPopup('success-confirm-popup');
                                core.hidePopup('success-confirm-popup', 10000);
                            }
                        });
            });
        }
    };
}(jQuery));