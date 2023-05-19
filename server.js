const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const chatApp = require('./chat-app');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    };

    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    };

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    };

    const sid = sessions.addSession(username);
    users.setUserStatus(username, true);
    res.cookie('sid', sid);

    // here sending extra data to avoid multiple service calls
    res.json({
        offlineUsers: users.getOfflineUsers(),
        loggedInUsers: users.getLoggedInUsers(),
        messages: chatApp.getMessages(),
    });
});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    };

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
        // check if user logout, remove the login status from the user list
        const isLoggedIn = sessions.checkUserLoginStatus(username);
        users.setUserStatus(username, isLoggedIn);
    };

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ username });
});

// chatData
app.get('/api/v1/chats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    };

    res.json({
        offlineUsers: users.getOfflineUsers(),
        loggedInUsers: users.getLoggedInUsers(),
        messages: chatApp.getMessages(),
    });
});

app.post('/api/v1/chats', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    };

    const { message } = req.body;
    
    if (!message) {
        res.status(400).json({ error: 'required-message' });
        return;
    };

    if (!users.isValidMessage(message)) {
        res.status(400).json({ error: 'invalid-message' });
        return;
    };

    const id = chatApp.addMessage({ sender: username, message });
    res.json(chatApp.getMessage(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
