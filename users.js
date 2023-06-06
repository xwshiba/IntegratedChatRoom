const users = {
    admin: true, // username: isLoggedIn (boolean)
};


/**
 * Checks if a username is valid.
 *
 * @param {string} username - The username to validate.
 * @returns {boolean} True if the username is valid, false otherwise.
 */
function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]{1,20}$/);
    return isValid;
};

/**
 * Sets the login status of a user.
 *
 * @param {string} username - The username of the user.
 * @param {boolean} status - The login status to set.
 */
function setUserStatus(username, status) {
    users[username] = status;
};

/**
 * Retrieves a list of offline users.
 *
 * @returns {Array<string>} An array of offline usernames.
 */
function getOfflineUsers() {
    const offlineUsers = [];
    for (let user in users) {
        if (!users[user]) {
            offlineUsers.push(user);
        }
    }
    return offlineUsers;
};

/**
 * Retrieves a list of logged-in users.
 *
 * @returns {Array<string>} An array of logged-in usernames.
 */
function getLoggedInUsers() {
    const loggedInUsers = [];
    for (let user in users) {
        if (users[user]) {
            loggedInUsers.push(user);
        }
    }
    return loggedInUsers;
};

/**
 * Checks if a message text is valid.
 *
 * @param {string} text - The message text to validate.
 * @returns {boolean} True if the message text is valid, false otherwise.
 */
function isValidMessage(text) {
    let isValid = true;
    isValid = isValid && text.match(/^[A-Za-z,.' ?!]{1,}$/);
    return isValid;
};

module.exports = {
    isValidUsername,
    setUserStatus,
    isValidMessage,
    getOfflineUsers,
    getLoggedInUsers,
};
