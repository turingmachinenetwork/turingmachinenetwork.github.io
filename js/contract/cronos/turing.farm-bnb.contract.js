$.TURRING_FARM_BNB = function() {};
$.TURRING_FARM_BNB.prototype = (function() {
    var setting = {
        chainId: 56,
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
                console.log("click");
                let _pid = null;
                if (_isTuringStaking == true) {
                    _pid = turingFarmInfoHelper.getPidOfDepositForTuringStaking();
                }
                let _pool = _self._getPool(_pid);
                let _user = coreHelper.getUserAccount();
                let _contract = _self._getFarmContract(_pool);
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

                    )
                    .send({
                        from: _user,
                        value: coreHelper.toBN(_amount, 18)
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
                        coreHelper.toBN(_amount, 18)
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
        _getAllowTransferContractToReedData() {
            let _abi = abiHelper.getAllowTransferABI();
            let _contractsObj = configHelper.getContracts(setting.chainId);
            let _contract = _contractsObj.info.getAllowTransfer;
            return bscContractHelper.getReadContract(_contract, _abi, setting.chainId);
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
            return bscContractHelper.getMainContract(_contractsObj.harvestMachine, _abi);
        },
        _getTokenContract(_token) {
            let _abi = abiHelper.getTokenABI();
            return bscContractHelper.getMainContract(_token, _abi);
        },
        _getFarmContract(_pool) {
            if (!_pool) {
                return null;
            }
            if (_pool.type == 'cake_lp_pool') {
                return this._getCakeLPPoolContract(_pool);
            }
            if (_pool.type == 'cake_no_loss_pool') {
                return this._getCakeNoLossPoolContract(_pool);
            }
            if (_pool.type == 'cake_pool') {
                return this._getCakePoolContract(_pool);
            }
            if (_pool.type == 'turing_lp_pool') {
                return this._getTuringLPPoolContract(_pool);
            }
            if (_pool.type == 'turing_venus_lp_pool') {
                return this._getTuringVenusLPPoolContract(_pool);
            }
            if (_pool.type == 'turing_stake') {
                return this._getTuringStakePoolContract(_pool);
            }
            if (_pool.type == 'turing_alpaca_farm_bnb') {
                return this._getTuringAlpacaFarmBNBPoolContract(_pool);
            }
            return null;
        },
        _getCakeLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getCakeLPPoolABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getCakeNoLossPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getCakeNoLossPoolABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getCakePoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getCakePoolABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getTuringLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringLPPoolABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getTuringVenusLPPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringVenusLPPoolABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getTuringStakePoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringStakeABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
        _getTuringAlpacaFarmBNBPoolContract(_pool) {
            let _user = coreHelper.getUserAccount();
            let _abi = abiHelper.getTuringAlpacaFarmBNBABI();
            let _contract = bscContractHelper.getMainContract(_pool.contract, _abi);
            return _contract;
        },
    };
}(jQuery));