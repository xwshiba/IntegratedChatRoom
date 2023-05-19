const uuid = require('uuid').v4;

// These are hardcoded initial state when we restart the server
const id1 = uuid();
const id2 = uuid();

const chatApp = {};

const messages = {
    // The below syntax lets you use a variable value as the key
    // if the value of id1 is "asdf", the property is "asdf", not "id1"
    [id1]: {
        id: id1,
        message: 'Welcome to the chat room!',
        sender: 'admin',
        date: Date.now(),
    },
    [id2]: {
        id: id2,
        message: "How's your day going?",
        sender: 'admin',
        date: Date.now(),
    },

};

chatApp.getMessages = function getMessages() {
    return messages;
};

chatApp.getMessage = function getMessage(id) {
    return messages[id];
};

chatApp.addMessage = function addMessage({ sender, message }) {
    const id = uuid();
    messages[id] = {
        id,
        sender,
        message,
        date: Date.now(),
    };
    return id;
};

module.exports = chatApp;