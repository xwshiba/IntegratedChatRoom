// Constants benefits
// - reduces risk of typos (IDE can code-complete)
// - easier to confirm it is correct (easier to check properties than strings)
// - If a value changes, you can change it in one place and the rest of the code can continue to use the constant

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message',
    INVALID_MESSAGE: 'invalid-message',
};

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    NO_SESSION: 'no-session',
};

export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_MISSING]: `You may have logged out or your session has expired. Please try login again`,
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (1 to 20 letters and/or numbers) username',
    [SERVER.REQUIRED_MESSAGE]: `Message can't be empty. Please enter your message.`,
    [SERVER.INVALID_MESSAGE]: `Your message is invalid. We only support English sentences at the current moment. Sorry for the inconvenience.`,
    default: 'Something went wrong.  Please try again',
};
