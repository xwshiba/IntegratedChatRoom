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
export function fetchSession() {
    return fetchRequest('/api/v1/session', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
    });
};

export function fetchLogin(username) {
    return fetchRequest('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
    });
};

export function fetchLogout() {
    return fetchRequest('/api/v1/session', {
        method: 'DELETE',
    });
};

export function fetchChatData() {
    return fetchRequest('/api/v1/chats');
};

export function fetchSendMessage(message) {
    return fetchRequest('/api/v1/chats', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message }),
    });
};
