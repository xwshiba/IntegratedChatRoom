const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const chatApp = require('./chat-app'); // contains the chat relates functions
const sessions = require('./sessions'); // contains session relates functions
const users = require('./users'); // contains user relates functions

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());



/************* helper functions *************/

/**
 * Retrieves the session details from the request.
 *
 * @param {Object} req - The request object.
 * @returns {Object} An object containing the session ID and username.
 */
function getSessionDetails(req) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    return { sid, username };
};


/**
 * Sends an error response with the specified status code and error message.
 *
 * @param {Object} res - The response object.
 * @param {number} statusCode - The status code of the error response.
 * @param {string} errorMessage - The error message.
 */
function sendError(res, statusCode, errorMessage) {
    res.status(statusCode).json({ error: errorMessage });
};



/************* handle sessions *************/

/**
 * Handles the GET request for '/api/v1/session'.
 * Retrieves the session user's username and sends it as a response.
 * If the session is invalid or the username is not valid, returns an error response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/api/v1/session', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    // Check if session or username is invalid.
    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    // Send the session user's username as a response.
    res.json({ username });
});


/**
 * Handles the POST request for '/api/v1/session'.
 * Authenticates the user, creates a session, and sends a response with additional data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    // validates the username
    if (!users.isValidUsername(username)) {
        return sendError(res, 400, 'required-username');

    };

    // if username is dog, return 403 forbidden to show auth failed.
    if (username === 'dog') {
        return sendError(res, 403, 'auth-insufficient');
    };

    // Add a session for the authenticated user
    const sid = sessions.addSession(username);
    users.setUserStatus(username, true);
    res.cookie('sid', sid);

    // Sends a JSON response with additional data to avoid an extra request.    
    res.json({
        offlineUsers: users.getOfflineUsers(), /** @type {Array<string>} - List of offline users. */ 
        loggedInUsers: users.getLoggedInUsers(), /** @type {Array<string>} - List of logged-in users. */
        messages: chatApp.getMessages(), /** @type {Array<string>} - List of chat messages. */
    });
});


/**
 * Handles the DELETE request for '/api/v1/session'.
 * Clears the session cookie, deletes the session, and updates the user's login status.
 * The response contains the username of the session, if it exists.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.delete('/api/v1/session', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    // Clear the session cookie if the session ID exists.
    if (sid) {
        res.clearCookie('sid');
    };

    // Delete the session and update the user's login status if the username exists.
    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
        // check if user logout, remove the login status from the user list
        const isLoggedIn = sessions.checkUserLoginStatus(username);
        users.setUserStatus(username, isLoggedIn);
    };


    // Send a JSON response with the username of the session, if it exists.
    // Don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});



/************* handle chats *************/

/**
 * Handles the GET request for '/api/v1/chats'.
 * Retrieves the session user's username and sends additional data as a response.
 * If the session is invalid or the username is not valid, returns an error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/api/v1/chats', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    // Check if the session ID or username is invalid.
    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    // Sends a JSON response with additional data to avoid an extra request.  
    res.json({
        offlineUsers: users.getOfflineUsers(), /** @type {Array<string>} - List of offline users. */
        loggedInUsers: users.getLoggedInUsers(), /** @type {Array<string>} - List of logged-in users. */
        messages: chatApp.getMessages(), /** @type {Array<string>} - List of chat messages. */
    });
});


/**
 * Handles the POST request for '/api/v1/chats'.
 * Adds a new message to the chat, if the session and message are valid.
 * Returns the added message as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the message.
 * @param {string} req.body.message - The message to be added.
 * @param {Object} res - The response object.
 */
app.post('/api/v1/chats', (req, res) => {
    const { sid, username } = getSessionDetails(req);

    // Check if the session ID or username is invalid.
    if (!sid || !users.isValidUsername(username)) {
        return sendError(res, 401, 'auth-missing');
    };

    const { message } = req.body;

    // Check if the message is missing.
    if (!message) {
        return sendError(res, 400, 'required-message');
    };

    // Check if the message is invalid.
    if (!users.isValidMessage(message)) {
        return sendError(res, 400, 'invalid-message');
    };

    // Add the message to the chat and get its ID.
    const id = chatApp.addMessage({ sender: username, message });

    // Send the added message as a response.
    res.json(chatApp.getMessage(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
