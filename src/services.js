function fetchRequest(url, options) {
    return fetch(url, options)
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
};

// These functions all handle:
// - MAKING the service calls
// - Passing the data
// - Parsing the results
//
// But these functions DO NOT
// - change the state
// - change the DOM
//
// This makes these functions fully decoupled and reuseable

export function fetchCsrfToken() {
    return fetchRequest('/api/v2/csrf_token');
};

export function fetchSession() {
    return fetchRequest('/api/v2/session', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    });
};

export function fetchLogin(csrfToken, username) {
    return fetchRequest('/api/v2/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
    });
};

export function fetchLogout(csrfToken) {
    return fetchRequest('/api/v2/session', {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': csrfToken,
        }
    });
};

export function fetchChatData() {
    return fetchRequest('/api/v2/chats', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
};

export function fetchSendMessage(csrfToken, message) {
    return fetchRequest('/api/v2/chats', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ message }),
    });
};
