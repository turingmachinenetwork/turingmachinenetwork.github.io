$.CRONOSCONTRACTBASE = function() {};
$.CRONOSCONTRACTBASE.prototype = (function() {
    var setting = {
        chainId: 25
    };
    var _readContracts = {};
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        getWeb3ToReadData(_chainId = null) {
            _chainId = _chainId ? _chainId : setting.chainId;
            let croRpcEndPoint = 'https://evm-cronos.crypto.org'
            if (_chainId != 25) {
                // croRpcEndPoint = 'https://cronos-testnet-3.crypto.org:8545'
                croRpcEndPoint = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

            }
            return new Web3(croRpcEndPoint);
        },
        getReadContract(_addr, _abi, _chainId = null) {
            if (!_readContracts[_addr]) {
                let _web3 = this.getWeb3ToReadData(_chainId);
                _readContracts[_addr] = new _web3.eth.Contract(_abi, _addr);
            }
            return _readContracts[_addr];
        },
        getMainContract(_addr, _abi) {
            let _provider = this.getProvider();
            let _web3 = new Web3(_provider);
            return new _web3.eth.Contract(_abi, _addr);
        },
        getProvider() {
            return window.ethereum;
        }
    };
}(jQuery));