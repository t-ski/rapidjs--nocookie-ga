/**
 * Plug-in providing dynamic content loading functionality for dynamic page environments.
 * 
 * (c) Thassilo Martin Schiepanski
 */


const crypto = require("crypto");


function generateId(ip) {
	const validityInterval = Math.round(new Date() / 1000 / 3600 / 24 / 4);
	const clientIdSource = `${ip};${validityInterval}`;
    
	return crypto.createHash("md5").update(clientIdSource).digest("hex");
}


module.exports = rapidJS => {
	// Initialize feature frontend module
	rapidJS.initFrontendModule("./frontend", {
		trackingId: rapidJS.readConfig("trackingId")
	});

	// Add POST route to retrieve specific content
	rapidJS.setEndpoint((_, req) => {
		return generateId(req.ip);
	});
};