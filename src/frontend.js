document.addEventListener("DOMContentLoaded", _ => {
	rapidJS.useEndpoint()
		.then(res => {
			bind(res);

			const appScript = document.createElement("script");
			appScript.setAttribute("src", "https://www.google-analytics.com/analytics.js");
			document.head.appendChild(appScript);
		});
});

function bind(id) {
	ga = ga || (_ => {(ga.q = ga.q || []).push(arguments);});
	ga.l = +(new Date());

	scriptHasLoaded = true;

	ga("create", config.trackingId, {
		"storage": "none",
		"storeGac": false,
		"clientId": id
	});
	ga("set", "anonymizeIp", true);
	ga("send", "pageview");

	calls.forEach(call => {
		console.log(call);
		ga(call.key, call.value, call.options);
	});
}


let ga;
let scriptHasLoaded = false;

const calls = [];
const restrictedKeys = ["create", "set", "send"];


PUBLIC = (key, value, options) => {
	if(restrictedKeys.includes(key)) {
		return;
	}

	if(scriptHasLoaded) {
		ga(key, value, options);

		return;
	}

	calls.push({
		key,
		value,
		options
	});
};