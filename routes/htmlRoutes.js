//dependencies
// path gets us the correct file path for html
const path = require('path');

//routing
//html GET requests, the following will direct user to desired page
module.exports = function(appExpress) {
//takes us to the survey
appExpress.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
});

//if no matching route is found, default to home
appExpress.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'))
})
};
