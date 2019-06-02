//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//set up server
const appExpress = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());
appExpress.use(express.static('public'))

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(appExpress);
require("./routes/htmlRoutes")(appExpress); 

//start server 
appExpress.listen(PORT, function() {
    console.log(`Listening at port ${PORT}`);
});
 
