$.TuringStake = function () {
};

$.TuringStake.prototype = (function () {
    const isMainnet = true;
    const ALLOW_LIMIT_AMT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    var turingStakeContract = {};
    var voteTuringToken = null;
    var turingHarvestMachineAddr = "0xde43520a7BB65535208512159fe5448636067a06";
    var turingTokenAddr = '0x76eD05FA250E8E993275e6E78b470B4D70Ed120B';
    var voteTuringTokenAddr = '0x7013c3414C425aaFc371842F7Dd67E360E9BA103';
    var turingStakeContractAddr = {
        "0": "0xa17Fe5E0278e6f15af5B15CACD67322629dC1279",
        "1": "0x50d59e3c3B53498815bB1a745537ddaD724ABD33",
        "2": "0xd851f4a9Fdb9924EcF97e6353d39E67F34F9E8bB"
    };
    var rateToCalculateAverageStakeTime = {
        "0": 0,
        "1": 0.5,
        "2": 1
    };
    var speedOfPool = {
        "0": 1,
        "1": 3,
        "2": 6
    };
    var totalPool = 3;
    var user = {

    };
    let averageStakeTime = 0;
    var totalVoteTuring = 0;
    var totalAPY = 0;
    var totalStake = 0;
    var totalStakeOfUser = 0;
    var totalEarnedOfUser = 0;
    var totalTVL = 0;
    var setting = {
        pool: 'turing-stake',
        isStakePage: false
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
            let _promises = [];
            for (let idx in turingStakeContractAddr) {
                _promises.push(self.loadUserDataByPool(idx));
            }
            Promise
                    .all(_promises)
                    .then(r => {
                        let _averageStakeTime = 0;
                        let _totalStakeOfUser = 0;
                        let _totalEarnedOfUser = 0;
                        let _totalStake = 0;
                        let _totalAPY = 0;
                        // console.log("_averageStakeTime = ");
                        for (let idx in user) {
                            if (user[idx]) {
                                _totalAPY += user[idx].rewardAPY;
                                _totalStake += user[idx].totalShare;
                                _totalStakeOfUser += user[idx].wantShare;
                                _totalEarnedOfUser += user[idx].userTuringPending;

                                _averageStakeTime += user[idx].totalShare * rateToCalculateAverageStakeTime[user[idx].poolIdx];
                                // console.log(`+ (${user[idx].totalShare} * ${rateToCalculateAverageStakeTime[user[idx].poolIdx]}) / ${totalPool}`);
                            }
                        }
                        totalAPY = _totalAPY;
                        totalStake = _totalStake;
                        _averageStakeTime = _averageStakeTime / totalStake;
                        totalStakeOfUser = _totalStakeOfUser;
                        totalEarnedOfUser = _totalEarnedOfUser;
                        averageStakeTime = _averageStakeTime;
                        let _price = user["0"] ? user["0"].price : 0;
                        totalTVL = totalStake * _price;
                        if(page != null && (page === "Dashboard" || page === "Home")) {
                            if (arrayTVLs) {
                                arrayTVLs["turingStakeTVL"] = totalStake * _price;
                            }
                            if (arrayUserTuringReward) {
                                arrayUserTuringReward["turingStakeUserReward"] = _totalEarnedOfUser;
                            }
                            if (arrayUserBalance) {
                                arrayUserBalance["turingStakeUserBalance"] = _totalStakeOfUser * _price;
                            }
                        }
                        if (user["0"]) {
                            totalVoteTuring = user["0"].totalVoteTuring;
                        }
                        if (setting.isStakePage == true) {
                            self.initStakePageInterface();
                        } else {
                            self.initInterface();
                        }
                        self.reloadInitData();
                    })
                    .catch(e => {
                        console.log("[Init DATA]: e", e);
                        self.reloadInitData();
                    });
        },
        reloadInitData() {
            let self = this;
            setTimeout(function () {
                self.initData();
            }, 3000);
        },
        initVoteTuringEstimate(_poolIdx, _value) {
            _poolIdx = _poolIdx.toString();
            _value = _value * speedOfPool[_poolIdx];
            $(`.${setting.pool}-vote-turing-estimate`).html(core.numberWithCommas(_value, 6));
        },
        initInterface() {
            $(`.${setting.pool}-tvl`).html("$"+core.formatBalance(totalTVL, 6));
            $(`.${setting.pool}-apy`).html(core.formatBalance(totalAPY / totalPool, 2));

            if (page != null && page === "Dashboard") {
                if (totalStakeOfUser <= 0) {
                    $(`.${setting.pool}`).hide();
                } else {
                    $(`.${setting.pool}-user-balance`).html(core.formatBalance(totalStakeOfUser, 2));
                    $(`.${setting.pool}`).show();
                }
            }
        },
        initStakePageInterface() {
            $(`.${setting.pool}-staked`).html(core.numberWithCommas(totalStake, 6));
            $(`.${setting.pool}-total-vote-turing`).html(core.numberWithCommas(totalVoteTuring, 6));
            $(`.${setting.pool}-average-stake-time`).html(core.numberWithCommas(averageStakeTime, 2));

            $(`.${setting.pool}-your-stake`).html(core.numberWithCommas(totalStakeOfUser, 6));
            $(`.${setting.pool}-your-earned`).html(core.numberWithCommas(totalEarnedOfUser, 6));

            if (
                    turingData &&
                    turingData.totalSupply &&
                    turingData.totalSupply > 0
                    ) {
                $(`.${setting.pool}-percent-of-all-turing`).html(core.numberWithCommas(totalStake * 100 / turingData.totalSupply, 2));
            }

            if (user["0"]) {
                $(`.${setting.pool}-tur-bal`).html(core.numberWithCommas(user["0"].wantBal, 6));
            }

            let _witdrawPoolIdxActive = this.getWithdrawPoolIdx();

            for (let idx in user) {
                let _data = user[idx] ? user[idx] : null;
                if (_data) {
                    _drawUI(idx, _data);
                }
            }
            function _drawUI(_poolIdx, _data) {
                $(`.${setting.pool}-pool-${_poolIdx}-your-stake`).html(`${core.numberWithCommas(_data.wantShare, 6)}`);
                $(`.${setting.pool}-pool-${_poolIdx}-reward-apy`).html(`${core.formatBalance(_data.rewardAPY, 2)}%`);
                $(`.${setting.pool}-pool-${_poolIdx}-total-stake`).html(core.numberWithCommas(_data.totalShare, 6));
                if (_data.withdrawTime > 0 && _data.wantShare > 0) {
                    $(`.${setting.pool}-pool-${_poolIdx}-your-unstake-time`).html(core.formatDate(_data.withdrawTime, 'DD-MMM-YYYY HH:mm:ss'));
                }
                if (_witdrawPoolIdxActive == _poolIdx) {
                    $(`.${setting.pool}-user-turing-state`).html(core.numberWithCommas(_data.wantShare, 6));
                }
            }
        },
        loadUserDataByPool(_poolIdx) {
            let self = this;

            return new Promise((resolve, reject) => {
                let _contract = self.getTuringStakeContract(_poolIdx);
                if (!_contract) {
                    return resolve(null);
                }
                if (!core) {
                    return resolve(null);
                }
                let _userAddr = core.getCurrentAddress();
                if (!_userAddr) {
                    return resolve(null);
                }
                $('.user-addr').html(`${_userAddr.slice(0,5)}...${_userAddr.slice(-5)}`);
                _contract
                        .methods
                        .getData(_userAddr)
                        .call()
                        .then(r => {
                            let _data = {
                                poolIdx: _poolIdx,
                                miningSpeed: parseInt(r.miningSpeed_),
                                withdrawTime: parseInt(r.withdrawTime_) * 1000,
                                voteTuringBal: core.parseFloatNumber(parseInt(r.userVoteTuring_) / 1e18, 18),
                                wantBal: core.parseFloatNumber(parseInt(r.userTuringBal_) / 1e18, 18),
                                wantShare: core.parseFloatNumber(parseInt(r.userTuringShare_) / 1e18, 18),
                                price: core.parseFloatNumber(parseInt(r.turingPrice_) / 1e18, 18),
                                totalMintPerDay: core.parseFloatNumber(parseInt(r.totalMintPerDay_) / 1e18, 18),
                                totalShare: core.parseFloatNumber(parseInt(r.totalShare_) / 1e18, 18),
                                totalVoteTuring: core.parseFloatNumber(parseInt(r.totalVoteTuring_) / 1e18, 18),
                                userTuringPending: core.parseFloatNumber(parseInt(r.userTuringPending_) / 1e18, 18),
                                rewardAPY: core.parseFloatNumber(parseInt(r.turingRewardAPY_) / 1e2, 2),
                                tvl: core.parseFloatNumber(parseInt(r.tvl_) / 1e18, 18)
                            };
                            if (page != null && (page === "Dashboard" || page === "Home")) {
                                if (
                                        isMainnet == true &&
                                        arrayContractFarmUserJoined &&
                                        _data.wantShare > 0 &&
                                        _data.userTuringPending > 0
                                        ) {
                                    arrayContractFarmUserJoined[`${setting.pool}-pool-${_poolIdx}`] = turingStakeContractAddr[_poolIdx];
                                } else if (arrayContractFarmUserJoined) {
                                    delete arrayContractFarmUserJoined[`${setting.pool}-pool-${_poolIdx}`];
                                }
                            }
                            user[_poolIdx] = _data;
                            return resolve(_data);
                        })
                        .catch(e => reject(e));
            });
        },
        getWeb3ToRead() {
            if (isMainnet == true) {
                return core.getWeb3ToReadDataOnMainnet();
            } else {
                return core.getWeb3ToReadDataOnTestnet();
            }
        },
        getTuringStakeContract(_poolIdx) {
            if (!core) {
                return false;
            }
            let _addr = turingStakeContractAddr[_poolIdx];
            if (turingStakeContract[_addr]) {
                return turingStakeContract[_addr];
            }
            let _turingStakeABI = abi.getTuringStakeABI();
            let _web3 = this.getWeb3ToRead();
            turingStakeContract[_addr] = new _web3.eth.Contract(_turingStakeABI, _addr);
            return turingStakeContract[_addr];
        },
        getPoolsJoined() {
            let _pools = [];
            for (let idx in user) {
                if (
                        user[idx] &&
                        user[idx].wantShare > 0 &&
                        user[idx].userTuringPending > 0
                        ) {
                    _pools.push(turingStakeContractAddr[idx]);
                }
            }
            return _pools;
        },
        getVoteTuringToken() {
            if (!core) {
                return false;
            }
            if (voteTuringToken) {
                return voteTuringToken;
            }
            let _tokenABI = abi.getTokenABI();
            let _web3 = this.getWeb3ToRead();
            voteTuringToken = new _web3.eth.Contract(_tokenABI, voteTuringTokenAddr);
            return voteTuringToken;
        },
        getDepositPoolIdx() {
            return $('input[type=radio][name=type-of-stake-deposit]:checked').val();
        },
        getWithdrawPoolIdx() {
            return $('input[type=radio][name=type-of-stake-withdraw]:checked').val();
        },
        clickMaxDeposit() {
            let self = this;
            $(`.${setting.pool}-max-deposit`).click(function (e) {
                e.preventDefault();
                let _poolIdx = self.getDepositPoolIdx();
                let _amount = user[_poolIdx] && user[_poolIdx].wantBal ? user[_poolIdx].wantBal : 0;
                $(`input[type=number][name=${setting.pool}-deposit-amt]`).val(_amount);
                self.initVoteTuringEstimate(_poolIdx, _amount);
            });
        },
        clickMaxWithdraw() {
            let self = this;
            $(`.${setting.pool}-max-withdraw`).click(function (e) {
                e.preventDefault();
                let _poolIdx = self.getWithdrawPoolIdx();
                let _amount = user[_poolIdx] && user[_poolIdx].wantShare ? user[_poolIdx].wantShare : 0;
                $(`input[type=number][name=${setting.pool}-withdraw-amt]`).val(_amount);
            });
        },
        onChangeDepositPool() {
            let self = this;
            $(`input[type=radio][name=type-of-stake-deposit]`).change(function () {
                $(`.${setting.pool}-speed-of-reward`).html(speedOfPool[this.value]);
                let _amount = $(`input[type=number][name=${setting.pool}-deposit-amt]`).val();
                self.initVoteTuringEstimate(this.value, _amount);
            });
        },
        onChangeWithdrawPool() {
            let self = this;
            $(`input[type=radio][name=type-of-stake-withdraw]`).change(function () {
                let _amount = user[this.value] ? user[this.value].wantShare : 0;
                $(`.${setting.pool}-user-turing-state`).html(core.numberWithCommas(_amount, 6));
            });
        },
        onChangeDepositAmount() {
            let self = this;
            $(`input[type=number][name=${setting.pool}-deposit-amt]`).on('input', function (e) {
                let _poolIdx = self.getDepositPoolIdx();
                self.initVoteTuringEstimate(_poolIdx, this.value);
            });
        },
        approve() {
            let self = this;
            $(`.${setting.pool}-approve`).click(function (e) {
                e.preventDefault();
                if (!core) {
                    return false;
                }
                if (typeof web3 == 'undifined') {
                    return false;
                }
                let userAddr = core.getCurrentAddress();
                if (!userAddr) {
                    return false;
                }

                let _transactionHistory = {};
                let _tokenABI = abi.getTokenABI();
                let _token = new web3.eth.Contract(_tokenABI, turingTokenAddr);
                let _poolIdx = self.getDepositPoolIdx();
                let _contractAddr = turingStakeContractAddr[_poolIdx] ? turingStakeContractAddr[_poolIdx] : null;
                if (!_contractAddr) {
                    return false;
                }
                _token
                        .methods
                        .approve(_contractAddr, ALLOW_LIMIT_AMT)
                        .send({from: userAddr})
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
                let _tokenABI = abi.getTokenABI();
                let _token = new web3.eth.Contract(_tokenABI, turingTokenAddr);
                let _poolIdx = self.getDepositPoolIdx();
                let _contractAddr = turingStakeContractAddr[_poolIdx] ? turingStakeContractAddr[_poolIdx] : null;
                if (!_contractAddr) {
                    return false;
                }
                _token
                        .methods
                        .allowance(userAddr, _contractAddr)
                        .call()
                        .then(amountAllow => {
                            amountAllow = parseInt(amountAllow) / 10 ** 18;
                            if (amountAllow < amount) {
                                return _approvel();
                            }
                            return _deposit();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                function _approvel() {
                    let pendingApprovel = false;
                    _token.methods.approve(_contractAddr, ALLOW_LIMIT_AMT).send({from: userAddr})
                            .on('transactionHash', function (hash) {
                                core.showPopup('confirm-popup');
                            })
                            .on('confirmation', function (confirmationNumber, receipt) {
                                if (receipt.status && pendingApprovel == false) {
                                    pendingApprovel = true;
                                    core.hidePopup('confirm-popup', 0);
                                    core.showPopup('success-confirm-popup');
                                    core.hidePopup('success-confirm-popup', 0);
                                    return _deposit();
                                }
                            });

                }
                function _deposit() {
                    let _turingStakeABI = abi.getTuringStakeABI();
                    let _contract = new web3.eth.Contract(_turingStakeABI, _contractAddr);

                    _contract.methods.deposit(core.toBN(amount, 18)).send({from: userAddr})
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
                let _poolIdx = self.getWithdrawPoolIdx();
                let _contractAddr = turingStakeContractAddr[_poolIdx] ? turingStakeContractAddr[_poolIdx] : null;
                if (!_contractAddr) {
                    return false;
                }
                let _transactionHistory = {};
                let _turingStakeABI = abi.getTuringStakeABI();
                let _contract = new web3.eth.Contract(_turingStakeABI, _contractAddr);

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
                let _turingHarvestMachineABI = abi.getTuringHarvestMachineABI();
                let _contract = new web3.eth.Contract(_turingHarvestMachineABI, turingHarvestMachineAddr);
                let _pools = self.getPoolsJoined();
                _contract.methods.harvest(_pools).send({from: userAddr})
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