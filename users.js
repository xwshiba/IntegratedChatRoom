const users = {
    admin: true, // username: isLoggedIn
};

function isValidUsername(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]{1,20}$/);
    return isValid;
};

function setUserStatus(username, status) {
    users[username] = status;
};

function getOfflineUsers() {
    const offlineUsers = [];
    for (let user in users) {
        if (!users[user]) {
            offlineUsers.push(user);
        };
    };
    return offlineUsers;
};

function getLoggedInUsers() {
    const LoggedInUsers = [];
    for (let user in users) {
        if (users[user]) {
            LoggedInUsers.push(user);
        };
    };
    return LoggedInUsers;
};

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
