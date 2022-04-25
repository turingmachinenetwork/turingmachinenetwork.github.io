$.TURRING_FARM = function() {};
$.TURRING_FARM.prototype = (function() {
    var setting = {
        chainId: 25,
        pid: 1
    };
    var transactions = {};
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
            this.initAllowTransferOf();
        },
        async initAllowTransferOf() {
            let _self = this;
            let _pool = _self._getPool();
            let _contract = _self._getAllowTransferContractToReedData();
            let _user = coreHelper.getUserAccount();
            let _tokensAddr = [_pool.want];
            let _r = await _contract.methods.getData(_user, _pool.contract, _tokensAddr).call();
            // Set data
            let _allowsTransferOf = storeHelper.getValue('allowsTransferOf');
            _allowsTransferOf = _allowsTransferOf ? _allowsTransferOf : {};
            _allowsTransferOf[_user] = _allowsTransferOf[_user] ? _allowsTransferOf[_user] : {};
            for (let idx = 0; idx < _r.length; idx++) {
                _allowsTransferOf[_user][_r[idx]['token']] = parseInt(_r[idx]['amount']) / 1e18;
            }
            setTimeout(function() {
                _self.initAllowTransferOf();
            }, 3000);
        },

        async checkAllowce(BTNApprove, BTNDeposit) {
            let _self = this;
            let _pool = _self._getPool();
            let _user = coreHelper.getUserAccount();
            let _token = _self._getTokenContract(_pool.want);
            if (!_token) {
                return false;
            }
            if (!_user) {
                return false;

            }
            _token.methods.allowance(_user, _pool.contract).call().then(r => {
                if (r == 0) {
                    $(`.${BTNDeposit}`).hide();
                    $(`.${BTNApprove}`).show();
                } else {
                    $(`.${BTNApprove}`).hide();
                    $(`.${BTNDeposit}`).show();
                }
            })

            setTimeout(() => {
                _self.checkAllowce(BTNApprove, BTNDeposit);
            }, 3000);
        },

        async approve(_classBTN, _isTuringStaking = false) {
            let _self = this;
            $(`.${_classBTN}`).click(function(e) {
                let _pid = null;
                if (_isTuringStaking == true) {
                    _pid = turingFarmInfoHelper.getPidOfDepositForTuringStaking();
                }
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _token = _self._getTokenContract(_pool.want);
                if (!_token) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                _token
                    .methods
                    .approve(
                        _pool.contract,
                        coreHelper.getAmountAllow()
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            });
        },
        async deposit(_classBTN, _inputKey, _isTuringStaking = false) {
            let _self = this;
            $(`.${_classBTN}`).click(function(e) {
                let _pid = null;
                if (_isTuringStaking == true) {
                    _pid = turingFarmInfoHelper.getPidOfDepositForTuringStaking();
                }
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _contract = _self._getFarmContract(_pool);
                let _decimals = _pool.wantDecimals;

                if (!_contract) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                let _amount = _self._getAmountByInputKey(_inputKey);
                if (_amount <= 0) {
                    return false;
                }
                _contract
                    .methods
                    .deposit(
                        coreHelper.toBN(_amount, _decimals)
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                        $('input[name=deposit_amt]').val('');
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            });
        },
        async withdraw(_classBTN, _inputKey, _isTuringStaking = false) {
            let _self = this;
            $(`.${_classBTN}`).click(function(e) {
                let _pid = null;
                if (_isTuringStaking == true) {
                    _pid = turingFarmInfoHelper.getPidOfDepositForTuringStaking();
                }
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _contract = _self._getFarmContract(_pool);
                let _decimals = _pool.wantDecimals;

                if (!_contract) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                let _amount = _self._getAmountByInputKey(_inputKey);
                if (_amount <= 0) {
                    return false;
                }
                _contract
                    .methods
                    .withdraw(
                        coreHelper.toBN(_amount, _decimals)
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                        $('input[name=withdraw_amt]').val('');
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            });
        },
        async harvest(_classBTN, _isTuringStaking = false) {
            let _self = this;
            let _pool = await _self._getPool();
            $(`.${_classBTN}`).click(function(e) {
                let _user = coreHelper.getUserAccount();
                let _contract = _self._getFarmContract(_pool);
                let _uPoolsJoined = turingFarmInfoHelper.getPoolsJoined();
                if (!_contract) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                let _params = _user;
                if (_isTuringStaking == true) {
                    _contract = _self._getTuringHarvestMachineContract();
                    _params = _uPoolsJoined;
                }
                _contract
                    .methods
                    .harvest(
                        _params
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            });
        },

        async harvestAll(_classBTN) {
            let _self = this;
            $(`.${_classBTN}`).click(function(e) {
                let _user = coreHelper.getUserAccount();
                let _contract = _self._getTuringHarvestMachineContract();
                let _uPoolsJoined = turingFarmInfoHelper.getPoolsJoined();
                if (!_contract) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                _contract
                    .methods
                    .harvest(
                        _uPoolsJoined
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            });
        },

        async sync(_classBTN) {
            let _self = this;
            $(`.${_classBTN}`).click(function(e) {
                let _contract = _self._getOrclePriceContract();
                let _user = coreHelper.getUserAccount();
                let _token = '0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03'
                if (!_contract) {
                    return false;
                }
                if (!_user) {
                    return false;
                }
                _contract
                    .methods
                    .syncPrice(
                        _token
                    )
                    .send({
                        from: _user
                    })
                    .on('transactionHash', (hash) => {
                        coreHelper.showPopup('confirm-popup');
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('receipt', (receipt) => {
                        _self._showSuccessPopup(receipt);
                    })
                    .on('error', (err, receipt) => {
                        console.log(err);
                    });
            })
        },

        _getAllowTransferContractToReedData() {
            let _abi = abiHelper.getAllowTransferABI();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.info.getAllowTransfer;
            return cronosContractHelper.getReadContract(_contract, _abi, setting.chainId);
        },
        _getAmountByInputKey(_inputKey) {
            let _amount = $(`${_inputKey}`).val();
            _amount = parseFloat(_amount);
            return isNaN(_amount) ? 0 : _amount;
        },
        _showSuccessPopup(receipt, _inputKey = null) {
            if (receipt.status == true && !transactions[receipt.transactionHash]) {
                if (_inputKey) {
                    $(`${_inputKey}`).val('');
                }
                transactions[receipt.transactionHash] = true;
                coreHelper.hidePopup('confirm-popup', 0);
                coreHelper.showPopup('success-confirm-popup');
                coreHelper.hidePopup('success-confirm-popup', 10000);
            }
        },
        _getPool(_pid = null) {
            if (_pid == null) _pid = setting.pid;
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _farmsObj = _contractsObj.farms ? _contractsObj.farms : {};
            return _farmsObj[_pid];
        },
        _getTuringHarvestMachineContract() {
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _abi = abiHelper.getTuringHarvestMachineABI();
            return cronosContractHelper.getMainContract(_contractsObj.harvestMachine, _abi);
        },
        _getOrclePriceContract() {
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _abi = abiHelper.getOrclePriceABI();
            return cronosContractHelper.getMainContract(_contractsObj.orclePriceContract, _abi);
        },
        _getTokenContract(_token) {
            let _abi = abiHelper.getTokenABI();
            return cronosContractHelper.getMainContract(_token, _abi);
        },
        _getFarmContract(_pool) {
            if (!_pool) {
                return null;
            }
            if (_pool.type == 'vvs_lp_pool') {
                return this._getVVSLPPoolContract(_pool);
            }
            if (_pool.type == 'vvs_no_loss_pool') {
                return this._getVVSNoLossPoolContract(_pool);
            }
            if (_pool.type == 'vvs_pool') {
                return this._getVVSPoolContract(_pool);
            }
            if (_pool.type == "turing_cro_lp_pool") {
                return this._getTuringCroLPPoolContract(_pool);
            }
            // if (_pool.type == 'turing_lp_pool') {
            //     return this._getTuringLPPoolContract(_pool);
            // }
            // if (_pool.type == 'turing_venus_lp_pool') {
            //     return this._getTuringVenusLPPoolContract(_pool);
            // }
            // if (_pool.type == 'turing_stake') {
            //     return this._getTuringStakePoolContract(_pool);
            // }
            // if (_pool.type == 'turing_alpaca_farm_bnb') {
            //     return this._getTuringAlpacaFarmBNBPoolContract(_pool);
            // }
            return null;
        },
        _getTuringCroLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringCroLPPoolABI();
            let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getVVSLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSLPPoolABI();
            let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getVVSNoLossPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSNoLossPoolABI();
            let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getVVSPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getVVSPoolABI();
            let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getTuringLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringLPPoolABI();
            let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },


        async onchangeMaxWantBall() {
            let _self = this;
            let _pool = _self._getPool(setting.pid);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _data = _dFarm[_pool.contract];
            if (_data) {
                let _outputAmt = _data.uWantBal;
                $(`.max-want-bal`).on("click", () => {
                    $(`input[name=deposit_amt]`).val(_outputAmt)
                })
            }
            setTimeout(() => {
                _self.onchangeMaxWantBall()
            }, 3000)
        },
        async onchangeMaxShare() {
            let _self = this;
            let _pool = _self._getPool(setting.pid);
            let _user = coreHelper.getUserAccount();
            let _farmInfoOf = storeHelper.getValue('farmInfoOf');
            let _dFarm = _farmInfoOf && _farmInfoOf[_user] ? _farmInfoOf[_user] : {};
            let _data = _dFarm[_pool.contract];
            if (_data) {
                let _outputAmt = _pool.type == "vvs_pool" ? _data.maxWithDraw * 1.0002 : _data.maxWithDraw;
                $(`.max-share`).on("click", () => {
                    $(`input[name=withdraw_amt`).val(_outputAmt);
                })
            }
            setTimeout(() => {
                _self.onchangeMaxShare()
            })
        }
        //     _getTuringVenusLPPoolContract(_pool) {
        //         let _user = coreHelper.getUserAccount();
        //         let _abi = abiHelper.getTuringVenusLPPoolABI();
        //         let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
        //         return _contract;
        //     },
        //     _getTuringStakePoolContract(_pool) {
        //         let _user = coreHelper.getUserAccount();
        //         let _abi = abiHelper.getTuringStakeABI();
        //         let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
        //         return _contract;
        //     },
        //     _getTuringAlpacaFarmBNBPoolContract(_pool) {
        //         let _user = coreHelper.getUserAccount();
        //         let _abi = abiHelper.getTuringAlpacaFarmBNBABI();
        //         let _contract = cronosContractHelper.getMainContract(_pool.contract, _abi);
        //         return _contract;
        //     },
    };
}(jQuery));