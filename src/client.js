const config = {
	restrictedCalls: [
		"set:anonymizeIp"
	]
};


/**
 * Insert analytics script tag once DOM is ready.
 * Use server-side generated client id for tracking.
 */
document.addEventListener("DOMContentLoaded", _ => {
	$this.endpoint()
		.then(id => {
			ga = ga || (_ => {(ga.q = ga.q || []).push(arguments);});
			ga.l = +(new Date());

			ga("create", $this.SHARED.trackingId, {
				"storage": "none",
				"storeGac": false,
				"clientId": id
			});
			ga("set", "anonymizeIp", true);

			/**
			 * GA lib load listener.
			 */
			ga(_ => {
				// Perform queued event calls
				callsQueue.forEach(call => {
					ga(call.key, call.value, call.options);
				});
			});

			const appScript = document.createElement("script");
			appScript.setAttribute("src", "https://www.google-analytics.com/analytics.js");
			document.head.appendChild(appScript);
		});
});


/**
 * Google Analytics interface object.
 */
let ga;
/**
 * Custom GA event calls to be passed through to the interface
 * once has loaded. Work as a queue.
 */
const callsQueue = [];


/**
 * Perform a custom GA event call.
 * @param {String} event Event name (e.g. "send")
 * @param {String} key Affected key
 * @param {*} value Value
 */
$this.PUBLIC = (event, key, value) => {
	if(config.restrictedKeys.includes(`${event}:${key}`)) {
		// Restricted key
		throw new SyntaxError(`Restricted interface call (event: '${event}', key: '${key}')`);
	}

	if(!ga) {
		// GA lib already loaded (instant call)
		ga(event, key, value);

		return;
	}

	// Queue call as GA lib not yet loaded (deferred call)
	callsQueue.push({
		event,
		key,
		value
	});
};