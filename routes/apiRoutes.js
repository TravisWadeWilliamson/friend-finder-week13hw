// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const path = require('path')
var friendsData = require("../data/friendsData.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (appExpress) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    appExpress.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    appExpress.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

        console.log(req.body)
        const newFriends = {
            name: req.body.name,
            photo: req.body.photo,
            scores: [
                parseInt(req.body.survey_Q1),
                parseInt(req.body.survey_Q2),
                parseInt(req.body.survey_Q3),
                parseInt(req.body.survey_Q4),
                parseInt(req.body.survey_Q5),
                parseInt(req.body.survey_Q6),
                parseInt(req.body.survey_Q7),
                parseInt(req.body.survey_Q8),
                parseInt(req.body.survey_Q9),
                parseInt(req.body.survey_Q10)
            ],
        };

        let lowestScoreDiff = 40
        let closestMatch;
        friendsData.forEach((friend, index) => {
            let tempScore = 0;
            for (let i = 0; i < newFriends.scores.length; i++) {
                tempScore += Math.abs(friend.scores[i] - newFriends.scores[i]);
            };
            if (tempScore < lowestScoreDiff) {
                lowestScoreDiff = tempScore;
                closestMatch = {
                    friend,
                    index,
                };
            }
        });

        console.log('this is your match', closestMatch)

        friendsData.push(newFriends);
        res.redirect(`/match/${closestMatch.index}`);
        res.json(closestMatch);
        console.log(closestMatch);
        console.log(`${req.body.name}, your closest match is ${closestMatch.name}`)

    });
    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
    appExpress.get('/match/:id', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/match.html'));
    });
    appExpress.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friendsData.length = 0;
        res.json({ ok: true });
    });

}
