const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it since we only have one instance

// These are hardcoded initial state when we restart the server
const id1 = uuid();
const id2 = uuid();

/**
 * @typedef {Object} chatApp
 * @property {function(): Object} getMessages - Retrieves all the messages.
 * @property {function(string): Object} getMessage - Retrieves a specific message by its ID.
 * @property {function({ sender: string, message: string }): string} addMessage - Adds a new message to the chat.
 */
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


/**
 * Adds a new message to the chat.
 * @param {Object} messageData - The message data containing the sender and message content.
 * @param {string} messageData.sender - The sender of the message.
 * @param {string} messageData.message - The content of the message.
 * @returns {string} The ID of the added message.
 */
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