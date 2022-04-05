$.Core = function() {
};
function dealNum (val) {
    var str = Math.floor(val)
    return (str < 10 ? '0' : '') + str
}
$.Core.prototype = (function() {
	var setting = {
        
	};
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			setting = $.extend({}, setting, options);
		},
		getWeb3ToReadDataOnMainnet() {
		    let BSC_RPC_END_POINT = 'https://bsc-dataseed1.defibit.io';
		    return new Web3(BSC_RPC_END_POINT);
		},
		getWeb3ToReadDataOnTestnet() {
		    let BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
		    return new Web3(BSC_RPC_END_POINT);
		},
		numberWithCommas(x, decimals = 3) {
		    if (isNaN(x) == true) x = 0;
		    x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
		    x = parseFloat(x).toFixed(decimals);
		    x = parseFloat(x).toString();
		    x  = x.split(".");
		    x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    x = x.join('.');
		    return x;
		},
 		formatBalance (labelValue, decimals = 2) {
		    return Math.abs(Number(labelValue)) >= 1.0e+12
		        ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
		        : Math.abs(Number(labelValue)) >= 1.0e+9
		            ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
		            : Math.abs(Number(labelValue)) >= 1.0e+6
		                ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
		                : Math.abs(Number(labelValue)) >= 1.0e+3
		                  	? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
		                  	: core.numberWithCommas(labelValue, decimals);
		},
  		getCurrentAddress() {
		    if (!window) return null;
		    if (!window.ethereum) return null;
		    if (window.ethereum.selectedAddress == '') return null;
		    return window.ethereum.selectedAddress;
		},
		toBN(amount, tokenDecimal = 18) {
		    amount = amount * 10 ** tokenDecimal;
		    amount = Math.round(amount);
		    amount = bigInt(amount).toString();
		    return amount;
		},
		roundDownFloat(value, decimals) {
			return Math.floor(value * decimals) / decimals;
		},
		parseFloatNumber(value, decimals) {
		    return parseFloat(value.toFixed(decimals));
		},
		formatDate(_timestamp, _format = 'DD-MMM-YYYY hh:mm:ss') {
		    var date = moment.utc(_timestamp).format('YYYY-MM-DD HH:mm:ss');
			var stillUtc = moment.utc(date).toDate();
			return moment(stillUtc).local().format(_format);
		},
		sortArray(array, key, isAsc = true, isValueString = false) {
		    array.sort(function(a, b){
			    if (isValueString == true) {
			        var valueA = a[key].toUpperCase(); 
			        var valueB = b[key].toUpperCase(); 
			        if (isAsc == true) {
			            if (valueA < valueB) {
			                return -1;
			            }
			        } else {
			            if (valueB < valueA) {
			                return -1;
			            }
			        }
			                
			    } else {
			        if (isAsc == true) {
			            return a[key] - b[key] //sort by date ascending
			        } else {
			            return b[key] - a[key] //sort by date ascending
			        }
			    }
		    });
		    return array;
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
		showPopup(id) {
			$(`#${id}`).show();
		},
		hidePopup(id, time = 10000) {
			setTimeout(() => {
				$(`#${id}`).hide();
			}, time);
		}

	};
}(jQuery));