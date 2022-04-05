$.TURRING_VENUS_LP_INFO = function() {};
$.TURRING_VENUS_LP_INFO.prototype = (function() {
    var setting = {
        chainId: 56
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
                let _abi = abiHelper.getTuringVenusLPInfoABI();
                let _contractsObj = configHelper.getContracts(setting.chainId);
                let _contract = _contractsObj.swap.pool.venus.info.pairs;
                let _readContract = bscContractHelper.getReadContract(_contract, _abi);
                let _pairs = _contractsObj.swap.pool.venus.pairs;
                let _lps = _pairs.map(item => item.contract);
                let _user = coreHelper.getUserAccount();
                let _r = await _readContract.methods.getData(_user, _lps).call();
                let _data = [];
                let _liquidityOfTuringVenusLps = {};
                for (let idx = 0; idx < _r.length; idx++) {
                    // base alway is busd
                    let _base = _pairs[idx].base;
                    let _token = _pairs[idx].token;
                    let _baseReserve = parseInt(_r[idx]['baseReserve']) / 1e18;
                    let _tokenReserve = parseInt(_r[idx]['tokenReserve']) / 1e18;
                    let _uBaseAllowed = parseInt(_r[idx]['uBaseAllowed']) / 1e18;
                    let _uTokenAllowed = parseInt(_r[idx]['uTokenAllowed']) / 1e18;
                    _liquidityOfTuringVenusLps[_base] = _liquidityOfTuringVenusLps[_base] ? _liquidityOfTuringVenusLps[_base] : 0;
                    _liquidityOfTuringVenusLps[_token] = _liquidityOfTuringVenusLps[_token] ? _liquidityOfTuringVenusLps[_token] : 0;
                    _liquidityOfTuringVenusLps[_base] += _baseReserve;
                    _liquidityOfTuringVenusLps[_token] += _tokenReserve;
                    let _allowedOf = {};
                    _allowedOf[_base] = _uBaseAllowed;
                    _allowedOf[_token] = _uTokenAllowed;
                    _data.push({
                        "contract": _pairs[idx].contract,
                        "base": _base,
                        "token": _token,
                        "baseReserve": _baseReserve,
                        "tokenReserve": _tokenReserve,
                        "uLPBal": parseInt(_r[idx]['uLPBal']) / 1e18,
                        "uBaseAllowed": _uBaseAllowed,
                        "uTokenAllowed": _uTokenAllowed,
                        "allowedOf": _allowedOf
                    });
                }
                storeHelper.setVaule('turingVenusLps', _data);
                storeHelper.setVaule('liquidityOfTuringVenusLps', _liquidityOfTuringVenusLps);
                self.initInterface(_data, _liquidityOfTuringVenusLps);
                self.reloadData();
            } catch (e) {
                console.log("INIT::TURRING_VENUS_LP_INFO::FALSE", e);
                self.reloadData();
            }
        },
        async reloadData() {
            let self = this;
            setTimeout(function() {
                self.initData();
            }, 3000);
        },
        async initInterface(_turingVenusLps, _liquidityOfTuringVenusLps) {
            let total = 0
            for (let token in _liquidityOfTuringVenusLps) {
                total += _liquidityOfTuringVenusLps[token]
            }
            for (let _token in _liquidityOfTuringVenusLps) {
                $(`.swap-liquidity-${_token}`).html(`
                    ${coreHelper.displayBalance(_liquidityOfTuringVenusLps[_token], 2)} &nbsp
                    (${coreHelper.numberWithCommas(_liquidityOfTuringVenusLps[_token] * 100 / total, 2)}%)`);

            }
        }
    };
}(jQuery));