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
			window.ga(_ => {
				// Public to private reference "toggle"
				ga = window.ga;
				delete window.ga;

				// Fundamental calls
				ga("create", $this.SHARED.trackingId, {
					"storage": "none",
					"storeGac": false,
					"clientId": id
				});
				ga("set", "anonymizeIp", true);

				// Hardcoded (serialized) calls
				$this.SHARED.serializedEvents
				.forEach(event => {
					infGa(event.event, event.key, event.value || null);
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
let ga;	// To be assigned (global/window to private module reference)
window.ga = window.ga || function() { (window.ga.q = window.ga.q || []).push(arguments) };
window.ga.l = +(new Date());;

/**
 * Perform a custom GA event call.
 * @param {String} event Event name (e.g. "send")
 * @param {String} key Affected key
 * @param {*} [value] Value
 */
function infGa(event, key, value) {
	if(config.restrictedCalls.includes(`${event}:${key}`)) {
		// Restricted key
		throw new SyntaxError(`Restricted interface call (event: '${event}', key: '${key}')`);
	}
	
	// GA lib already loaded (instant call)
	(ga || window.ga)(event, key, value);
}


$this.PUBLIC = infGa;