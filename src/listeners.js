import { SERVER, CLIENT } from './constants';
import {
    fetchChatData,
    fetchLogin,
    fetchLogout,
    fetchSendMessage,
} from './services';
import {
    setError,
    login,
    logout,
    addMessage,
    setChatApp,
    waitOnMessages,
    waitOnLogin,
} from './state';
import {
    renderFeed,
    renderControl,
} from './render';

let timeoutId = '';

export function addAbilityToLogin({ state, appEl, feedEl, controlEl }) {
    // Using 'submit' so we can get both submit via button-click and by "enter"
    appEl.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('forms__login')) {
            return;
        };

        const username = appEl.querySelector('.login__username').value;

        waitOnLogin();
        renderFeed({ state, feedEl }); // show loading state

        fetchLogin(username)
            .then(chatData => {
                login(username);
                setChatApp(chatData);
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
                setTimeout(pollRefreshedData, 5000, { state, feedEl, controlEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
            });
    });
};

export function addAbilityToLogout({ state, appEl, feedEl, controlEl}) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__logout')) {
            return;
        };

        logout();
        renderFeed({ state, feedEl });
        renderControl({ state, controlEl });
        clearTimeout(timeoutId);

        fetchLogout() // We don't really care about results
            .catch(err => {
                setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
            });
    });
};

export function addAbilityToSendMessage({ state, appEl, feedEl, controlEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('outgoing__forms')) {
            return;
        };

        const message = appEl.querySelector('.outgoing__message').value;

        waitOnMessages(); // Show loading state
        renderFeed({ state, feedEl });   

        fetchSendMessage(message)
            .then(messageObj => {
                addMessage(messageObj);
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
            });
    });
};

/************* helper function *************/

function refresh({ state, feedEl, controlEl }) {
    fetchChatData()
        .then(chatData => {
            setChatApp(chatData);
            renderFeed({ state, feedEl });
        })
        .catch(err => {
            clearTimeout(timeoutId);

            if (err?.error == CLIENT.NO_SESSION) { // expected "error"
                logout(); // No longer waiting, set to logged out case
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
                return;
            };

            setError(err?.error || 'ERROR');
            renderFeed({ state, feedEl });
            renderControl({ state, controlEl });
        });
};

export function pollRefreshedData({ state, feedEl, controlEl }) {
    refresh({ state, feedEl, controlEl });
    timeoutId = setTimeout( pollRefreshedData, 5000, { state, feedEl, controlEl } );
};
