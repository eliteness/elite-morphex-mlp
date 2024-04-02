
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};
window.addEventListener('load',async function()
{
	console.log("waitin for 3 secs..");
	$("cw_m").innerHTML = "Connecting.. Please wait."
	setTimeout(async () => { await basetrip(); }, 3000);
}, false);




async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" id="btn-connect">Retry?</button>`;
	}
	if(Number(window.ethereum.chainId) != null &&(window.ethereum.chainId!=CHAINID))
	{
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		decimals: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		window.location.reload
	}
	//DrefreshFarm()
	//arf()
	cw()
	dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}

async function cw()
{
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2()
{
	if(!(window.ethereum)){$("cw_m").innerHTML="Metamask not detected! Trying a refresh";console.log("Metamask not found!");window.location.reload();return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){$("cw_m").innerHTML="Wrong network detected! Please switch to chain ID", CHAINID, "and refresh this page.";return(0)}
	if(typeof provider == "undefined"){$("cw_m").innerHTML="Provider not detected! Trying a refresh";console.log("Provider not found!");window.location.reload();return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
}



async function dexstats() {
	_BASE = new ethers.Contract(BASE, LPABI, provider);
	_WRAP = new ethers.Contract(WRAP, LPABI, provider);
	_ds = await Promise.all([
		_BASE.totalSupply(),
		_WRAP.totalSupply(),
	])
	$("tvl-usd").innerHTML = `
		<b>${(Number(_ds[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:2})} ${WRAP_NAME}</b>
		<br>
		(${((Number(_ds[1])/1e18)/(Number(_ds[0])/1e18)*100).toLocaleString(undefined,{maximumFractionDigits:4})}% Dominance)
	`;

}

async function gubs() {
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);

	_ubs = await Promise.all([
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);
	$("ub-mint").innerHTML = (Number(_ubs[0])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("ub-redeem").innerHTML = (Number(_ubs[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
}

LPABI = ["function balanceOf(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function totalSupply() public view returns(uint)"]

async function quote() {
	return;
}

async function mint() {
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);
	_SMART_MANAGER = new ethers.Contract(SMART_MANAGER, ["function deposit(uint)","function withdraw(uint)"],signer);

	_oamt = $("man-inp-mint").value;
	if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid ${BASE_NAME} amount!`); return;}
	_oamt = BigInt(_oamt * 1e18)

	al = await Promise.all([
		_BASE.allowance(window.ethereum.selectedAddress, SMART_MANAGER),
		_BASE.balanceOf(window.ethereum.selectedAddress)
	]);

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${_oamt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${BASE_NAME}.`);}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${BASE_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _BASE.approve(SMART_MANAGER,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${BASE_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Minting ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} to Deposit: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Expected: <b>${fornum(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _SMART_MANAGER.deposit(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<br><h4>Minting ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Depositing: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Expecting: <b>${fornum(_oamt,18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Deposited: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Received: <b>${fornum(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function redeem() {
	_MANAGER = new ethers.Contract(MANAGER, ["function deposit(uint)","function withdraw(uint)"],signer);
	_oamt = $("man-inp-redeem").value;
	if(!isFinite(_oamt)){notice(`Invalid ${WRAP_NAME} amount!`); return;}
	_oamt = BigInt(_oamt * 1e18)

	al = await Promise.all([
		_WRAP.allowance(window.ethereum.selectedAddress, SMART_MANAGER),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAP_NAME}.`);}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${BASE_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _BASE.approve(SMART_MANAGER,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${WRAP_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Redeeming ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} to Redeem: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expected: <b>${fornum(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _SMART_MANAGER.withdraw(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<br><h4>Redeeming ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeeming: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expecting: <b>${fornum(_oamt,18)}</b><br>
		<br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeemed: <b>${fornum(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Received: <b>${fornum(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}