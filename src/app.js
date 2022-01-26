/**
 * Plug-in providing Google Analytics functionality (via Tag) bypassing the
 * implicit use of cookies.
 * Interesting for pages to be EU GDPR compliant without the need of explicit
 * notification.
 * 
 * (c) Thassilo Martin Schiepanski
 */


const crypto = require("crypto");


$this.clientModule("./client", {
	trackingId: $this.pluginConfig.trackingId,
	serializedEvents: $this.pluginConfig.serializedEvents || []
});


$this.endpoint((_, req) => {
	const validityInterval = Math.round(new Date() / 1000 / 3600 / 24 / ($this.pluginConfig.validity || 7));
	const clientIdSource = `${req.ip};${validityInterval}`;
	
	return crypto
	.createHash("md5")
	.update(clientIdSource)
	.digest("hex");
});