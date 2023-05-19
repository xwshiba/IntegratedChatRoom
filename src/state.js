import { MESSAGES } from './constants';

const state = {
    // We store these as an object because we will access by id
    loggedInUsers: [],
    offlineUsers: [],
    messages: {},
    isLoggedIn: false,
    isLoginPending: true, // We start with our login status unknown
    isMessagesPending: false,
    username: '',
    error: '',
};

export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.loggedInUsers = [],
    state.offlineUsers = [],
    state.messages = {};
    state.error = '';
};

export function waitOnMessages() {    
    state.isMessagesPending = true;
    state.error = '';
};

export function setChatApp(chatData) {
    state.loggedInUsers = chatData.loggedInUsers;
    state.offlineUsers = chatData.offlineUsers;
    state.messages = chatData.messages;
    state.isMessagesPending = false;
    state.error = '';
};

export function addMessage(message) {
    const { id } = message;
    state.messages[id] = message;
    state.error = '';
    state.isMessagesPending = false;
};

export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = '';
};

export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = '';
    state.loggedInUsers = [];
    state.offlineUsers = [];
    state.messages = {},
    state.error = '';
};

export function setError(error) {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    if (!error) {
        state.error = '';
        return;
    };
    state.error = MESSAGES[error] || MESSAGES.default;
};

export default state;