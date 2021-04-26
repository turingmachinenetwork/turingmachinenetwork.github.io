$(document).ready(function() {
    initWeb3();
    initContract();
    try {
    	loadTuringData();
    } catch(e) {
    	reloadTuringData
    	();
    }
});

function getWeb3ToReadData() {
    const BSC_RPC_END_POINT = 'https://bsc-dataseed1.binance.org:443';
    // const BSC_RPC_END_POINT = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    const MyWeb3 = new Web3(BSC_RPC_END_POINT);
    return MyWeb3;
}

function  initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
}

let turingDataContract;
let turingData = {};

const TURING_DATA_ADDR = '0xbBEcDC80416d5365Bc0507Dac95aBFc2D194ef14'; 
const TURING_DATA_API = [
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "circulatingSupply_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxSupply_",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
function  getCurrentAddress() {
    if (!window) return null;
    if (!window.ethereum) return null;
    if (window.ethereum.selectedAddress == '') return null;
    return window.ethereum.selectedAddress;
}
function parseFloatNumber(value, decimals) {
    return parseFloat(value.toFixed(decimals));
}
function numberWithCommas(x, decimals = 3) {
    if (isNaN(x) == true) x = 0;
    x = Math.floor(x * 10 ** decimals) / 10 ** decimals;
    x = parseFloat(x).toFixed(decimals);
    x = parseFloat(x).toString();
    x  = x.split(".");
    x[0] = x[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    x = x.join('.');
    return x;
}
function formatBalance (labelValue, decimals = 2) {
    return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 100) / 100 + "T"
        : Math.abs(Number(labelValue)) >= 1.0e+9
            ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 100) / 100 + "B"
            : Math.abs(Number(labelValue)) >= 1.0e+6
                ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 100) / 100 + "M"
                : Math.abs(Number(labelValue)) >= 1.0e+3
                  	? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 100) / 100 + "K"
                  	: numberWithCommas(labelValue, decimals);
}
function initContract() {
	if (!turingDataContract) {
		const _web3 = getWeb3ToReadData();
		turingDataContract = new _web3.eth.Contract(TURING_DATA_API, TURING_DATA_ADDR);
	}
	setTimeout(function(){ 
		initContract();
	}, 3000);
}

function reloadTuringData() {
	setTimeout(function(){ 
		loadTuringData();
	}, 3000);
}

function loadTuringData() {
	if (!turingDataContract) {
		return reloadTuringData();
	}
	let userAddr = getCurrentAddress();
	if (!userAddr) {
		return reloadTuringData();
	}
	
	turingDataContract
		.methods
		.getData()
		.call()
		.then(_updateTuringData)
		.catch(_error);
	function _updateTuringData(_result) {
		turingData.circulatingSupply = parseFloatNumber(parseInt(_result.circulatingSupply_) / 1e18, 18);
		turingData.totalSupply = parseFloatNumber(parseInt(_result.totalSupply_) / 1e18, 18);
		turingData.maxSupply = parseFloatNumber(parseInt(_result.maxSupply_) / 1e18, 18);
		turingData.price = parseFloatNumber(parseInt(_result.price_) / 1e18, 18);
		_drawUI();
	}	
	function _drawUI() {
		$('.turing-token-circulating-supply').html(formatBalance((turingData.circulatingSupply), 2));
		$('.turing-token-max-supply').html(formatBalance((turingData.maxSupply), 2));
		$('.turing-token-price').html(formatBalance((turingData.price), 2));

		return reloadTuringData();
	}
	function _error(_e) {
		return reloadTuringData();
	}	
}
