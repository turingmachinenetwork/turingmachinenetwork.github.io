$.TURRING_FARM_INFO = function() {};
$.TURRING_FARM_INFO.prototype = (function() {
    var setting = {
        chainId: 25,
        pids: [] // 0 => get ALL,
    };
    var uPoolsJoined = {}; // mapping( user => array);
    let prizeHistory = [];
    let arrayTuringSwapPoolTVLs = []
    let arrayTuringSwapPoolTradingVols = [];
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
                let _pools = self._getPools();
                // let _user = coreHelper.getUserAccount();
                for (let _idx = 0; _idx < _pools.length; _idx++) {
                    await self._initPoolOf(_pools[_idx]);
                }
                self.reloadData();
            } catch (e) {
                console.log("INIT::TURRING_FARM_INFO::FALSE", e);
                self.reloadData();
            }
        },
        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 3000);
        },
        initHomeInterface(_pidOfStakingTur) {
            let self = this;
            let _pools = self._getPools();
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _dataOfStakingTur = {
                apy: 0,
                totalShare: 0,
                uWantShare: 0,
                uTuringPending: 0,
                tvl: 0,
                price: 0
            };
            _pools.forEach((item, idx) => {
                let _data = _dFarm[item.contract] ? _dFarm[item.contract] : null;

                // if (item.type == 'turing_stake' && _data) {
                //     _dataOfStakingTur.apy += _data.apy;
                //     _dataOfStakingTur.totalShare += _data.totalShare;
                //     _dataOfStakingTur.uWantShare += _data.uWantShare;
                //     _dataOfStakingTur.uTuringPending += _data.uTuringPending;
                //     _dataOfStakingTur.price = _data.price;
                //     _dataOfStakingTur.tvl += _data.totalShare * _data.price;
                // } else {
                _init(item.pid, _data);
                // }
            });
            // _init(_pidOfStakingTur, _dataOfStakingTur);

            function _init(_pid, _data) {
                if (!_data) return false;
                $(`#speed-${_pid}`).html(`${ coreHelper.numberWithCommas(_data.miningSpeed,2) }X`);
                $(`#apr-${_pid}`).html(`${ coreHelper.numberWithCommas(_data.apy,2) }%`);
                $(`#tvl-${_pid}`).html(`$${ coreHelper.formatBalance(_data.tvl,2) }`);
                $(`#vl-${_pid}`).html(`$${ coreHelper.formatBalance(_data.vol,2) }`);
                $(`#prize-${_pid}`).html(`$${ coreHelper.formatBalance(_data.price * _data.prize,6) }`);
                $(`#ticket-${_pid}`).html(`${ coreHelper.formatBalance(_data.totalTickets,2) }`);
                $(`#blc-${_pid}`).html(`${ coreHelper.numberWithCommas(_data.uWantShare, 8) }`);
            }

            setTimeout(function() {
                self.initHomeInterface(_pidOfStakingTur);
            }, 3000);
        },

        initDashboardInterface(_pidOfStakingTur) {
            let self = this;
            let _pools = self._getPools();
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let totalBalance = 0
            let totalReward = 0
            let now = parseInt(Date.now() / 1000);
            let timeOfWillBeAwarded
            let _dataOfStakingTur = {
                apy: 0,
                totalShare: 0,
                uWantShare: 0,
                uTuringPending: 0,
                tvl: 0,
                price: 0
            };
            _pools.forEach((item, idx) => {
                let _data = _dFarm[item.contract] ? _dFarm[item.contract] : null;
                if (_data) {
                    totalReward += _data.uTuringPending
                    totalBalance += _data.uWantShare * _data.price

                    $(`#total-balance`).html(`$${coreHelper.formatBalance(totalBalance,2)}`)
                    $(`#total-reward`).html(`${coreHelper.formatBalance(totalReward,6)} TURING`)
                }
                // if (item.type == 'turing_stake' && _data) {
                //     _dataOfStakingTur.apy += _data.apy;
                //     _dataOfStakingTur.totalShare += _data.totalShare;
                //     _dataOfStakingTur.uWantShare += _data.uWantShare;
                //     _dataOfStakingTur.uTuringPending += _data.uTuringPending;
                //     _dataOfStakingTur.price = _data.price;
                //     _dataOfStakingTur.tvl += _data.totalShare * _data.price;
                // }
                if (_data && item.type == "vvs_no_loss_pool") {
                    timeOfWillBeAwarded = self.getTimeCountDown(_data.endLoteryTime - now);
                    $(`.will-be-awarded`).html(`${timeOfWillBeAwarded.day} DAY ${timeOfWillBeAwarded.hour} HR ${timeOfWillBeAwarded.min} MIN ${timeOfWillBeAwarded.sec} SEC`);
                }
                if (_data && _data.uWantShare == 0) {
                    hidePool(idx);
                } else {
                    showPool(idx);
                }
                _init(idx, _data);
            });
            _init(_pidOfStakingTur, _dataOfStakingTur);

            function _init(_pid, _data) {
                if (!_data) return false;
                $(`#apr-${_pid}`).html(`${ coreHelper.numberWithCommas(_data.apy,2) }%`);
                $(`#tvl-${_pid}`).html(`$${ coreHelper.formatBalance(_data.tvl,2) }`);
                $(`#vl-${_pid}`).html(`$${ coreHelper.formatBalance(_data.vol,2) }`);
                $(`#price-${_pid}`).html(`$${ coreHelper.formatBalance(_data.price * _data.prize, 6) }`);
                $(`#ticket-${_pid}`).html(`${ coreHelper.formatBalance(_data.totalTickets,2) }`);
                $(`#blc-${_pid}`).html(`${ coreHelper.formatBalance(_data.uWantShare, 2) }`);
            }


            function hidePool(pid) {
                $(`.pool-${pid}`).hide()
            }

            function showPool(pid) {
                $(`.pool-${pid}`).show()
            }

            setTimeout(function() {
                self.initDashboardInterface(_pidOfStakingTur);
            }, 3000);
        },

        initHomePageInterface(_pid) {
            let self = this;
            let _pools = self._getPools();
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};

            _pools.forEach(item => {
                let _data = _dFarm[item.contract] ? _dFarm[item.contract] : null;
                if (item.type == "turing_venus_lp_pool" && _data) {
                    arrayTuringSwapPoolTradingVols[item.pid] = _data.vol
                }
                if (_data) {
                    arrayTuringSwapPoolTVLs[item.pid] = _data.tvl

                }
            })

            setTimeout(function() {
                self.initHomePageInterface(_pid);
                self.getTuringSwapPoolsTotalTVL()
                self.getTuringSwapPoolsTotalTradeVol()

            }, 3000);

        },

        getTuringSwapPoolsTotalTVL() {
            var totalTuringSwapPoolsTVL = 0;
            for (var key in arrayTuringSwapPoolTVLs) {
                totalTuringSwapPoolsTVL += arrayTuringSwapPoolTVLs[key];
            }
            $(`#total-system-tvl`).html(`$${coreHelper.formatBalance(totalTuringSwapPoolsTVL, 2)}`)
        },

        getTuringSwapPoolsTotalTradeVol() {
            var totalTuringSwapPoolsTradeVol = 0;
            for (var key in arrayTuringSwapPoolTradingVols) {
                totalTuringSwapPoolsTradeVol += arrayTuringSwapPoolTradingVols[key];
            }
            $(`#total-trading-vol`).html(`$${coreHelper.formatBalance(totalTuringSwapPoolsTradeVol, 2)}`)
        },

        getTimeCountDown(time) {
            if (time < 0) {
                return {
                    "day": dealNum(0),
                    "hour": dealNum(0),
                    "min": dealNum(0),
                    "sec": dealNum(0)
                }
            }
            return {
                "day": dealNum((time / (24 * 60 * 60))),
                "hour": dealNum((time % (24 * 60 * 60)) / (60 * 60)),
                "min": dealNum((time % (60 * 60)) / 60),
                "sec": dealNum(time % 60)
            };
        },
        initFarmDetailInterface(_pid) {
            let _self = this;
            let _pool = this._getPool(_pid);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _data = _dFarm[_pool.contract];
            if (_data) {
                console.log(_data)
                let now = parseInt(Date.now() / 1000);
                let timeOfWillBeAwarded = _self.getTimeCountDown(_data.endLoteryTime - now);

                $(`.apy`).html(`${ coreHelper.numberWithCommas(_data.apy, 2) }%`);
                $(`.apy-turing`).html(`${coreHelper.numberWithCommas(_data.turingRewardAPY)}% TURING`)
                $(`.apy-cake`).html(`${coreHelper.numberWithCommas(_data.wantRewardAPY)}% VVS`)
                $(`.apy-bnb`).html(`${coreHelper.numberWithCommas(_data.ibBNBAPY)}% BNB`)
                $(`.apy-alpaca`).html(`${coreHelper.numberWithCommas(_data.alpacaAPY)}% ALPACA`)
                $(`.apy-trade`).html(`${coreHelper.numberWithCommas(_data.tradeAPY)}% TRADING`)
                $(`.apy-venus`).html(`${coreHelper.numberWithCommas(_data.venusAPY)}% VENUS`)
                $(`.tvl`).html(`$${ coreHelper.formatBalance(_data.tvl, 2) }`);
                $(`.u-share`).html(`${ coreHelper.numberWithCommas(_data.maxWithDraw, 8) }`);
                $(`.u-want-bal`).html(`${ coreHelper.numberWithCommas(_data.uWantBal, 8) }`);
                $(`.u-pending-tur`).html(`${ coreHelper.numberWithCommas(_data.uTuringPending, 8) }`);
                $(`.u-pending-vvs`).html(`${ coreHelper.numberWithCommas(_data.uVVSPending, 8) }`);
                $(`.u-ticket`).html(`${ coreHelper.numberWithCommas(_data.uTickets, 8) }`);
                $(`.u-odds`).html(`${coreHelper.numberWithCommas(_data.uTickets*100 / _data.totalTickets, 2)}%`)
                $(`.price`).html(`$${ coreHelper.numberWithCommas(_data.price * _data.prize, 6) }`);
                $(`.will-be-awarded`).html(`${timeOfWillBeAwarded.day} DAY ${timeOfWillBeAwarded.hour} HR ${timeOfWillBeAwarded.min} MIN ${timeOfWillBeAwarded.sec} SEC`);
                $(`.players`).html(`${ coreHelper.numberWithCommas(_data.totalPlayer, 2) }`);
                $(`.total-tickets`).html(`${ coreHelper.numberWithCommas(_data.totalTickets, 2) }`);
                $(`.total-deposits`).html(`${ coreHelper.numberWithCommas(_data.totalDeposits, 2) }`);

                if (_data.uWantBal == 0) {
                    $(`.btn-deposit`).prop('disabled', true);
                } else {
                    $(`.btn-deposit`).prop('disabled', false);
                }
                if (_data.uWantShare == 0) {
                    $(`.btn-withdraw`).prop('disabled', true);
                } else {
                    $(`.btn-withdraw`).prop('disabled', false);
                }

                prizeHistory.forEach((item, idx) => {
                    let time = item.time > 0 ? _self.formatTime(item.time * 1000) : '-';
                    let winner = item.winner;
                    let startAddress = winner.slice(0, 5);
                    let endAddress = winner.slice(-5);
                    $(`.time-pool-no-${idx + 1}`).html(time);
                    $(`.prize-busd-pool-no-${idx + 1}`).html(`$${coreHelper.formatBalance((item.prize * _data.price), 2)}`);
                    $(`.prize-cake-pool-no-${idx + 1}`).html(coreHelper.formatBalance(item.prize, 2));
                    $(`.prize-tickets-pool-no-${idx + 1}`).html(coreHelper.formatBalance(item.totalTickets, 2));
                    $(`.winner-pool-no-${idx + 1}`).html(`${startAddress}...${endAddress}`);
                });
            }

            setTimeout(function() {
                _self.initFarmDetailInterface(_pid);
            }, 3000);
        },

        formatTime(timestamp) {
            var date = moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss');
            var stillUtc = moment.utc(date).toDate();
            return moment(stillUtc).local().format('MMM Do');
        },

        _loadPrizeHistory() {
            let self = this
            let _abi = abiHelper.getVVSNoLossPoolABI();
            let _pool = self._getPool(setting.pids);
            let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let promises = [];
            for (let idx = 0; idx < 5; idx++) {
                promises.push(_readContract.methods.historyList(idx).call());
            }
            return new Promise((resolve, reject) => {
                Promise
                    .all(promises)
                    .then(_result => {
                        let _data = [];
                        for (let idx = 0; idx < 5; idx++) {
                            _data.push({
                                time: parseInt(_result[idx].time),
                                prize: coreHelper.parseFloatNumber(parseInt(_result[idx].wonAmt) / 1e18, 18) + coreHelper.parseFloatNumber(parseInt(_result[idx].performanceFee) / 1e18, 18),
                                totalTickets: coreHelper.parseFloatNumber(parseInt(_result[idx].totalTickets) / 1e18, 18),
                                winner: _result[idx].winner || _result[idx].user
                            });
                        }
                        _data = coreHelper.sortArray(_data, 'time', false);
                        prizeHistory = _data;
                        return resolve();
                    })
                    .catch((e) => reject(e));
            });
        },

        initTuringStakingInterface(_pids) {
            let _self = this;
            let _pools = _self._getPools(_pids);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _dataOfStakingTur = {
                apy: 0,
                totalShare: 0,
                totalVoteTuring: 0,
                uWantBal: 0,
                uWantShare: 0,
                uTuringPending: 0,
                tvl: 0,
                averageStakeTime: 0,
                price: 0
            };
            _pools.forEach(item => {
                let _data = _dFarm[item.contract] ? _dFarm[item.contract] : null;
                if (item.type == 'turing_stake' && _data) {
                    _dataOfStakingTur.apy += _data.apy;
                    _dataOfStakingTur.totalShare += _data.totalShare;
                    _dataOfStakingTur.uWantShare += _data.uWantShare;
                    _dataOfStakingTur.uTuringPending += _data.uTuringPending;
                    _dataOfStakingTur.uWantBal = _data.uWantBal;
                    _dataOfStakingTur.price = _data.price;
                    _dataOfStakingTur.totalVoteTuring = _data.totalVoteTuring;
                    _dataOfStakingTur.tvl += _data.totalShare * _data.price;
                    _dataOfStakingTur.averageStakeTime += _data.totalShare * item.rateToCalculateAverageStakeTime;
                    // init interface
                    $(`.pool-${item.pid}-total-staked`).html(coreHelper.numberWithCommas(_data.totalShare, 6));
                    $(`.pool-${item.pid}-apy`).html(`${coreHelper.numberWithCommas(_data.apy, 6)}%`);
                }
            });
            if (_dataOfStakingTur.totalShare > 0) {
                _dataOfStakingTur.averageStakeTime = _dataOfStakingTur.averageStakeTime / _dataOfStakingTur.totalShare;
            }
            if (turingData &&
                turingData.totalSupply &&
                turingData.totalSupply > 0) {
                $(`.percent-of-all-turing`).html(
                    `${coreHelper.numberWithCommas(
                        (_dataOfStakingTur.totalShare * 100 / turingData.circulatingSupply), 2)}`)
            }
            console.log("_dataOfStakingTur.uWantBal", _dataOfStakingTur.uWantBal)
            $(`.u-want-bal`).html(coreHelper.numberWithCommas(_dataOfStakingTur.uWantBal, 6));
            $(`.total-staked`).html(coreHelper.numberWithCommas(_dataOfStakingTur.totalShare, 6));
            $(`.total-vote-turing`).html(coreHelper.numberWithCommas(_dataOfStakingTur.totalVoteTuring, 6));
            $(`.average-stake-time`).html(coreHelper.numberWithCommas(_dataOfStakingTur.averageStakeTime, 2));

            setTimeout(function() {
                _self.initTuringStakingInterface(_pids);
            }, 3000);
        },
        /**
         * use for turing staking page
         */
        initVoteTuringEstimate(_pid, _value = 0) {
            let _pool = this._getPool(_pid);
            _value = parseFloat(_value);
            _value = isNaN(_value) ? 0 : _value;
            _value = _value * _pool.speed;
            $(`.vote-turing-estimate`).html(coreHelper.numberWithCommas(_value, 6));
        },
        getPidOfDepositForTuringStaking() {
            return $('input[type=radio][name=pid-of-deposit]:checked').val();
        },
        getPidOfWithdrawForTuringStaking() {
            return $('input[type=radio][name=pid-of-withdraw]:checked').val();
        },
        getPoolsJoined() {
            let _user = coreHelper.getUserAccount();
            return uPoolsJoined[_user];
        },
        onTuringStakingClickMaxDeposit() {
            let _self = this;
            $(`.max-deposit`).click(function(e) {
                e.preventDefault();
                let _pid = _self.getPidOfDepositForTuringStaking();
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _farmInfoOf = storeHelper.getValue('farmInfoOf');
                let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
                let _data = _dFarm[_pool.contract] ? _dFarm[_pool.contract] : null;
                let _amount = _data ? _data.uWantBal : 0;
                $(`input[type=number][name=deposit_amt]`).val(_amount);
                _self.initVoteTuringEstimate(_pid, _amount);
            });
        },
        onTuringStakingClickMaxWithdraw() {
            let _self = this;
            $(`.max-withdraw`).click(function(e) {
                e.preventDefault();
                let _pid = _self.getPidOfDepositForTuringStaking();
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _farmInfoOf = storeHelper.getValue('farmInfoOf');
                let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
                let _data = _dFarm[_pool.contract] ? _dFarm[_pool.contract] : null;
                let _amount = _data.uWantShare ? _data.uWantShare : 0;
                $(`input[type=number][name=withdraw_amt]`).val(_amount);
            });
        },
        onChangeDepositTuringStakingPool() {
            let _self = this;
            $(`input[type=radio][name=pid-of-deposit]`).change(function() {
                let _pid = this.value;
                let _pool = _self._getPool(_pid);
                $(`.pool-speed`).html(_pool.speed);
                let _amount = $(`input[type=number][name=deposit_amt]`).val();
                _self.initVoteTuringEstimate(_pid, _amount);
            });
        },
        onChangeWithdrawTuringStakingPool() {
            let _self = this;
            $(`input[type=radio][name=pid-of-withdraw]`).change(function() {
                let _pid = this.value;
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _farmInfoOf = storeHelper.getValue('farmInfoOf');
                let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
                let _data = _dFarm[_pool.contract] ? _dFarm[_pool.contract] : null;
                let _amount = _data ? _data.uWantShare : 0;
                $(`.u-share-by-pool`).html(coreHelper.numberWithCommas(_amount, 6));
            });
        },
        onTuringStakingChangeDepositAmount() {
            let _self = this;
            $(`input[type=number][name=deposit_amt]`).on('input', function(e) {
                let _pid = _self.getPidOfDepositForTuringStaking();
                _self.initVoteTuringEstimate(_pid, this.value);
            });
        },
        async _initPoolOf(_pool) {
            // console.log("_pool", _pool)
            if (!_pool) {
                return true;
            }
            if (_pool.type == 'vvs_lp_pool') {
                return this._initVVSLPPool(_pool);
            }

            if (_pool.type == 'vvs_no_loss_pool') {
                return this._initVVSNoLossPool(_pool);
            }
            if (_pool.type == 'vvs_pool') {
                return this._initVVSPool(_pool);
            }
            if (_pool.type == "turing_cro_lp_pool") {
                return this._initTuringCroLPPool(_pool);
            }
            // if (_pool.type == 'turing_lp_pool') {
            //     return this._initTuringLPPool(_pool);
            // }
            // if (_pool.type == 'turing_venus_lp_pool') {
            //     return this._initTuringVenusLPPool(_pool);
            // }
            // if (_pool.type == 'turing_stake') {
            //     return this._initTuringStakePool(_pool);
            // }
            // if (_pool.type == 'turing_alpaca_farm_bnb') {
            //     return this._initTuringAlpacaFarmBNBPool(_pool);
            // }
            return true;
        },
        async _initTuringCroLPPool(_pool) {
            let _decimals = 10 ** _pool.wantDecimals;
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringCroLPPoolABI();
            let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = {};
            _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[0]) / _decimals, 1e18), 18);
            _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e18, 18);
            _data.uWantShare = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[5]) / _decimals, 1e18), 18);
            _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r[6]) / _decimals, 18);
            _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r[1]) / 1e18, 18);
            _data.turingRewardAPY = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e2, 2);
            _data.apy = _data.turingRewardAPY;
            _data.price = _pool.price;
            _data.tvl = _data.totalShare * _data.price
            _data.maxWithDraw = _data.uWantShare;
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;

        },
        async _initVVSLPPool(_pool) {
            let _decimals = 10 ** _pool.wantDecimals;
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSLPPoolABI();
            let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = {};
            _data.miningSpeed = parseInt(_r[0]);
            _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[1]) / _decimals, 1e18), 18);
            _data.uCROBal = coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 18);
            _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.uWantShare = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[8]) / _decimals, 1e18), 18);
            _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r[9]) / _decimals, 18);
            _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 18);
            _data.totalWantRewardPerDay = coreHelper.parseFloatNumber(parseInt(_r[5]) / _decimals, 18);
            _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.vvsPrice = coreHelper.parseFloatNumber(parseInt(_r[10]) / 1e18, 18);
            _data.uVVSPending = coreHelper.parseFloatNumber(parseInt(_r[3]) / _decimals, 18);
            _data.turingRewardAPY = 0;
            _data.wantRewardAPY = 0;
            _data.price = _pool.price;
            _data.tvl = _data.totalShare * _pool.price;
            _data.maxWithDraw = _data.uWantShare;
            if (_data.tvl > 0) {
                _data.turingRewardAPY = _data.totalMintPerDay * _data.turingPrice * 36500 / (_data.tvl);
                _data.wantRewardAPY = _data.totalWantRewardPerDay * _data.vvsPrice * 36500 / (_data.tvl);

            }
            _data.apy = _data.turingRewardAPY + _data.wantRewardAPY;
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;
        },
        async _initVVSNoLossPool(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSNoLossPoolABI();
            let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = {};
            _data.miningSpeed = parseInt(_r[0]);
            // userDataInCakeNoLossPool.userWant = parseFloatNumber(parseInt(_result[1]) / 1e18, 18);
            _data.uTickets = coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e18, 18);
            _data.uWantCanWithdraw = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[3]) / 1e18, 1e18), 18);
            _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 18);
            _data.uTuringBal = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.uCROBal = coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 18);
            _data.prize = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.turingRewardAPY = coreHelper.parseFloatNumber(parseInt(_r[8]) / 1e2, 2);
            _data.totalTickets = coreHelper.parseFloatNumber(parseInt(_r[9]) / 1e18, 18);
            _data.totalDeposits = coreHelper.parseFloatNumber(parseInt(_r[9]) / 1e18, 18);
            _data.price = coreHelper.parseFloatNumber(parseInt(_r[10]) / 1e6, 6);
            _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r[11]) / 1e6, 6);
            _data.endLoteryTime = parseInt(_r[12]);
            _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r[13]) / 1e18, 18);
            _data.tvl = _data.totalShare * _data.price;
            _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[14]) / 1e18, 1e18), 18);
            _data.totalPlayer = parseInt(_r[15]);
            _data.uWantShare = _data.uTickets;
            _data.apy = _data.turingRewardAPY;
            _data.maxWithDraw = _data.uWantCanWithdraw;
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;
        },
        async _initVVSPool(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSPoolABI();
            let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
            let _r = await _readContract.methods.getData(_user).call();
            let _data = {};
            _data.miningSpeed = parseInt(_r[0]);
            _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[1]) / 1e18, 1e18), 18);
            _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r[2]) / 1e6, 6);
            _data.price = coreHelper.parseFloatNumber(parseInt(_r[3]) / 1e6, 6);
            _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r[4]) / 1e18, 18);
            _data.totalWantRewardPerDay = coreHelper.parseFloatNumber(parseInt(_r[5]) / 1e18, 18);
            _data.uCROBal = coreHelper.parseFloatNumber(parseInt(_r[6]) / 1e18, 18);
            _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r[7]) / 1e18, 18);
            _data.uWantShare = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r[8]) / 1e18, 1e18), 18);
            if (parseInt(_r[9]) > 0) {
                _data.turingRewardAPY = coreHelper.parseFloatNumber(parseInt(_r[9]) / 1e2, 2);
            } else {
                _data.turingRewardAPY = 0;
            }
            if (parseInt(_r[10]) > 0) {
                _data.wantRewardAPY = coreHelper.parseFloatNumber(parseInt((_r[10] / 1e2) * 699) / 1e3, 2);
            } else {
                _data.wantRewardAPY = 0;
            }
            _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r[11]) / 1e18, 18);
            _data.tvl = _data.totalShare * _data.price;
            _data.apy = _data.turingRewardAPY + _data.wantRewardAPY;
            _data.maxWithDraw = _data.uWantShare;
            await this._initUserData(_user, _pool.contract, _data, _pool.pid);
            return true;
        },
        // async _initTuringLPPool(_pool) {
        //     let _user = coreHelper.getUserAccount();
        //     let _abi = abiHelper.getTuringLPPoolABI();
        //     let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
        //     let _r = await _readContract.methods.getData(_user).call();
        //     let _data = {};
        //     _data.miningSpeed = parseInt(_r.miningSpeed_);
        //     _data.uTuringBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r.userTuringBal_) / 1e18, 1e18), 18); // turing LP
        //     _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r.userWantBal_) / 1e18, 1e18), 18);
        //     _data.uCROBal = coreHelper.parseFloatNumber(parseInt(_r.userBNBBal_) / 1e18, 18);
        //     _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r.userTuringPending_) / 1e18, 18);
        //     _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r.totalMintPerDay_) / 1e18, 18);
        //     _data.uWantShare = coreHelper.parseFloatNumber(parseInt(_r.userTuringShare_) / 1e18, 18); // turing LP
        //     _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r.tvl_) / 1e18, 18);
        //     _data.price = _pool.price;
        //     _data.tvl = _data.totalShare * _data.price;
        //     _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r.turingPrice_) / 1e18, 18);
        //     _data.turingRewardAPY = 0;

        //     if (_data.tvl > 0) {
        //         _data.turingRewardAPY = _data.totalMintPerDay * _data.turingPrice * 36500 / (_data.tvl);
        //     }

        //     if (_data.uWantShare <= 0) {
        //         _data.uTuringPending = 0;
        //     }
        //     _data.apy = _data.turingRewardAPY;
        //     await this._initUserData(_user, _pool.contract, _data, _pool.pid);
        //     return true;
        // },
        // async _initTuringVenusLPPool(_pool) {
        //     let _user = coreHelper.getUserAccount();
        //     let _abi = abiHelper.getTuringVenusLPPoolABI();
        //     let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
        //     let _r = await _readContract.methods.getData(_user).call();
        //     let _data = {};
        //     _data.miningSpeed = parseInt(_r.miningSpeed_);
        //     _data.uWantBal = coreHelper.parseFloatNumber(coreHelper.roundDownFloat(parseInt(_r.userWantBal_) / 1e18, 1e18), 18);
        //     _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r.userTuringPending_) / 1e18, 18);
        //     _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r.totalMintPerDay_) / 1e18, 18);
        //     _data.uWantShare = coreHelper.parseFloatNumber(parseInt(_r.userWantShare_) / 1e18, 18); // turing LP
        //     _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r.tvl_) / 1e18, 18);
        //     _data.vol = coreHelper.parseFloatNumber(parseInt(_r.vol_) / 1e18, 18);
        //     _data.turingPrice = coreHelper.parseFloatNumber(parseInt(_r.turingPrice_) / 1e18, 18);
        //     _data.tradeAPY = coreHelper.parseFloatNumber(parseInt(_r.tradeAPY_) / 1e10, 10);
        //     _data.supplyAPY = coreHelper.parseFloatNumber(parseInt(_r.supplyAPY_) / 1e10, 10);
        //     _data.xvsAPY = coreHelper.parseFloatNumber(parseInt(_r.xvsAPY_) / 1e10, 10);
        //     _data.turingRewardAPY = 0;
        //     _data.price = _pool.price;
        //     _data.tvl = _data.totalShare * _data.price;
        //     if (_data.tvl > 0) {
        //         _data.turingRewardAPY = _data.totalMintPerDay * _data.turingPrice * 36500 / (_data.tvl);
        //     }

        //     if (_data.uWantShare <= 0) {
        //         _data.uTuringPending = 0;
        //     }
        //     _data.apy = _data.turingRewardAPY + _data.tradeAPY + _data.supplyAPY + _data.xvsAPY;
        //     _data.venusAPY = _data.supplyAPY + _data.xvsAPY
        //     await this._initUserData(_user, _pool.contract, _data, _pool.pid);
        //     return true;
        // },
        // async _initTuringStakePool(_pool) {
        //     let _user = coreHelper.getUserAccount();
        //     let _abi = abiHelper.getTuringStakeABI();
        //     let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
        //     let _r = await _readContract.methods.getData(_user).call();
        //     let _data = {};
        //     _data.miningSpeed = parseInt(_r.miningSpeed_),
        //         _data.withdrawTime = parseInt(_r.withdrawTime_) * 1000,
        //         _data.voteTuringBal = coreHelper.parseFloatNumber(parseInt(_r.userVoteTuring_) / 1e18, 18),
        //         _data.uWantBal = coreHelper.parseFloatNumber(parseInt(_r.userTuringBal_) / 1e18, 18),
        //         _data.uWantShare = coreHelper.parseFloatNumber(parseInt(_r.userTuringShare_) / 1e18, 18),
        //         _data.price = coreHelper.parseFloatNumber(parseInt(_r.turingPrice_) / 1e18, 18),
        //         _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r.totalMintPerDay_) / 1e18, 18),
        //         _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r.totalShare_) / 1e18, 18),
        //         _data.totalVoteTuring = coreHelper.parseFloatNumber(parseInt(_r.totalVoteTuring_) / 1e18, 18),
        //         _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r.userTuringPending_) / 1e18, 18),
        //         _data.rewardAPY = coreHelper.parseFloatNumber(parseInt(_r.turingRewardAPY_) / 1e2, 2),
        //         _data.tvl = coreHelper.parseFloatNumber(parseInt(_r.tvl_) / 1e18, 18)
        //     _data.apy = _data.rewardAPY;
        //     await this._initUserData(_user, _pool.contract, _data, _pool.pid);
        //     return true;
        // },
        // async _initTuringAlpacaFarmBNBPool(_pool) {
        //     let _user = coreHelper.getUserAccount();
        //     let _abi = abiHelper.getTuringAlpacaFarmBNBABI();
        //     let _readContract = cronosContractHelper.getReadContract(_pool.contract, _abi, setting.chainId);
        //     let _r = await _readContract.methods.getData(_user).call();
        //     let _data = {};
        //     _data.uWantBal = coreHelper.parseFloatNumber(parseInt(_r.userBNBBal_) / 1e18, 18);
        //     _data.uWantShare = coreHelper.parseFloatNumber(parseInt(_r.userBNBShare_) / 1e18, 18);
        //     _data.price = coreHelper.parseFloatNumber(parseInt(_r.bnbPrice_) / 1e18, 18);
        //     _data.totalMintPerDay = coreHelper.parseFloatNumber(parseInt(_r.totalMintPerDay_) / 1e18, 18);
        //     _data.totalShare = coreHelper.parseFloatNumber(parseInt(_r.totalShare_) / 1e18, 18);
        //     _data.uTuringPending = coreHelper.parseFloatNumber(parseInt(_r.userTuringPending_) / 1e18, 18);
        //     _data.turingAPY = coreHelper.parseFloatNumber(parseInt(_r.turingAPY_) / 1e2, 2);
        //     _data.alpacaAPY = coreHelper.parseFloatNumber(parseInt(_r.alpacaAPY_) / 1e10, 10);
        //     _data.ibBNBAPY = coreHelper.parseFloatNumber(parseInt(_r.supplyAPY_) / 1e10, 10);
        //     _data.tvl = coreHelper.parseFloatNumber(parseInt(_r.tvl_) / 1e18, 18);
        //     _data.apy = _data.turingAPY + _data.alpacaAPY + _data.ibBNBAPY;

        //     await this._initUserData(_user, _pool.contract, _data, _pool.pid);
        //     return true;
        // },
        async _initUserData(_user, _contract, _data, _pid) {
            // console.log(_pid);
            // console.log("_data", _data)

            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            _farmInfoOf = _farmInfoOf ? _farmInfoOf : {};
            _farmInfoOf[_user] = _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            _farmInfoOf[_user][_contract] = _farmInfoOf[_user][_contract] ? _farmInfoOf[_user][_contract] : {};
            _farmInfoOf[_user][_contract] = _data;
            storeHelper.setVaule('farmInfoOf', _farmInfoOf);
            storeHelper.setVaule('tvlOf', _data[_contract]);
            let _uPoolsJoined = uPoolsJoined[_user] ? uPoolsJoined[_user] : [];
            if (_data.uWantShare > 0 && _uPoolsJoined.includes(_contract) == false) {
                _uPoolsJoined.push(_contract);
            }
            uPoolsJoined[_user] = _uPoolsJoined;
        },
        _getPool(_pid) {
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _farmsObj = _contractsObj.farms ? _contractsObj.farms : {};
            return _farmsObj[_pid];
        },
        _getPools(_pids = null) {
            let _data = [];
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _farmsObj = _contractsObj.farms ? _contractsObj.farms : {};
            if (setting.pids.length <= 0) {
                for (let _pid in _farmsObj) {
                    if (_farmsObj[_pid].isActive == true) {

                        _data.push(_farmsObj[_pid]);

                    }
                }
            } else {
                setting.pids.forEach(item => {
                    let _pool = _farmsObj[item];
                    if (_pool) {
                        if (_pids == null) {
                            _data.push(_pool);
                        } else if (_pids.includes(item) == true) {
                            _data.push(_pool);
                        }
                    }
                });
            }
            return _data;
        }
    };
}(jQuery));