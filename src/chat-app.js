import { SERVER, CLIENT } from './constants';
import state, {
    login,
    logout,
    setError,
    setChatApp,
} from './state';
import { 
    fetchSession, 
    fetchChatData, 
} from './services';
import {
    renderFeed,
    renderControl,
} from './render';
import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToSendMessage,
    pollRefreshedData,
} from './listeners';

const appEl = document.querySelector('#app');
const feedEl = document.querySelector('.main__feed');
const controlEl = document.querySelector('.main__control');
renderFeed({ state, appEl, feedEl });
addAbilityToLogin({ state, appEl, feedEl, controlEl });
addAbilityToLogout({ state, appEl, feedEl, controlEl });
addAbilityToSendMessage({ state, appEl, feedEl, controlEl });
checkForSession();

//////////

function checkForSession() {
    fetchSession()
        .then(session => { // The returned object from the service call
            login(session.username); // We do not have messages yet
            renderFeed({ state, feedEl }); // Show we are logged in but don't have any messages
            renderControl({ state, controlEl });
            return fetchChatData(); // By returning this promise we can chain the original promise
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
            };
            return Promise.reject(err); // Pass any other error unchanged
        })
        .then(chatData => {
            setChatApp(chatData);
            renderFeed({ state, feedEl });
            renderControl({ state, controlEl });
            setTimeout(pollRefreshedData, 5000, { state, feedEl, controlEl });
        })
        .catch(err => {
            if (err?.error == CLIENT.NO_SESSION) { // expected "error"
                logout(); // No longer waiting, set to logged out case
                renderFeed({ state, feedEl });
                renderControl({ state, controlEl });
                return;
            };
            // For unexpected errors, report them
            setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
            renderFeed({ state, feedEl });
            renderControl({ state, controlEl });
        });
};
