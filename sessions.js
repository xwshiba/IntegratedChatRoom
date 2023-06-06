const uuid = require('uuid').v4;

const sessions = {};

/**
 * Generates a new session ID and adds a session for the specified username.
 *
 * @param {string} username - The username associated with the session.
 * @returns {string} The generated session ID.
 */
function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
};

/**
 * Retrieves the username associated with the specified session ID.
 *
 * @param {string} sid - The session ID.
 * @returns {string|undefined} The username associated with the session ID, or undefined if not found.
 */
function getSessionUser(sid) {
    return sessions[sid]?.username;
};

function deleteSession(sid) {
    delete sessions[sid];
};

/**
 * Checks if the specified username has an active session.
 *
 * @param {string} username - The username to check.
 * @returns {boolean} True if the username has an active session, false otherwise.
 */
function checkUserLoginStatus(username) {
    for (let sid in sessions) {
        if (sessions[sid].username === username) {
            return true;
        }
    }
    return false;
};

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    checkUserLoginStatus,
};
