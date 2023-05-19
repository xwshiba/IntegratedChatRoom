export function renderFeed({ state, feedEl }) {
  const feedHtml = `
        <p class="instruction">Welcome ${state.username}! This is Your Instant Chat App :)</p>
        ${generateStatusHtml(state)}
        ${generateLoginHtml(state)}
        ${generateContentHtml(state)}
    `;
  feedEl.innerHTML = feedHtml;
};

export function renderControl({ state, controlEl }) {
  let controlHtml = ``;

  if (!state.isLoggedIn) {
    controlHtml = ``;
  } else {
    controlHtml = `${generateAddMessageHtml(state)}`;
  };
  controlEl.innerHTML = controlHtml;
};

function generateStatusHtml(state) {
  return `
      <div class="status">${state.error}</div>
  `;
};

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading Your Chat App...</div>
    `
  };

  if (state.isLoggedIn) {
    return ``;
  };

  return `
      <div class="login">
        <form class="forms forms__login" action="#/login">
          <label class="forms__label">
            <span class="forms__tag">Username:</span>
            <input 
                class="forms__input login__username" 
                type="text"
                name="username"
                value="" />
          </label>
          <button class="forms__btn btn" type="submit">Login</button>
        </form>
      </div>
  `;
};

function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return ``;
  };

  if (state.isMessagesPending) {
    return `
            <div class="content">
                ${generateControlsHtml()}
                <div class="chat-app__waiting">Loading Your Chat App...</div>
            </div>`;
  };

  return `
      <div class="content">
        ${generateControlsHtml()}
        <div class="content__chat">
            <ul class="users">
                <span class="user__info">
                    All Users
                </span>
                ${generateUsersHtml(state)}
            </ul>
            <ol class="messages">
                <span class="messages__info">
                    Received Messages
                </span>
                ${generateMessagesHtml(state)}
            </ol>
        </div>
      </div>
  `;
};

function generateControlsHtml() {
  return `
        <div class="controls">
          <button class="controls__logout btn">Logout</button>
        </div>`;
};

function generateUsersHtml(state) {
  const loggedInUsersHtml = Object.values(state.loggedInUsers).map(user => { // this is an array
    return `
      <li class="user">
        <span
          class="user__username--logged-in">
            ${user}
        </span> 
      </li>
    `;
  }).join('') || `<p>No Online Friends yet, add one!</p>`;

  const offlineUsersHtml = Object.values(state.offlineUsers).map(user => {
    return `
        <li class="user">
          <span
            class="user__username--logged-out">
              ${user}
          </span> 
        </li>
    `;
  }).join('') || ``;

  const usersHtml = `
    ${loggedInUsersHtml}
    ${offlineUsersHtml}
  `
  return usersHtml;
};

function generateMessagesHtml(state) {
  Object.entries(state.messages).sort()
  const messagesHtml = Object.entries(state.messages).sort((a, b) => b[1].date - a[1].date).map((userMessage) => {
    // every object entry array item has two keys - 0 as key, 1 as value, value is the real message
    const { id, message, sender, date } = userMessage[1];
    const formattedDate = new Date(date);

    return `
          <li class="message ${sender === state.username ? `message-self` : ``}" data-id=${id}>
            <div class="message__sender">
                <img class="avatar" alt="default avatar of ${sender}" src="images/avatar-default.jpg"/>
                <span class="username">${sender}</span>
            </div>
            <div class="message__content ${sender === state.username ? `message__self` : ``}">
                <span class="message__text">${message}</span>
                <span class="message__time">${formattedDate}</span>
            </div>
          </li>
        `;
  }).join('') || `<p>No Messages yet, start chat!</p>`;
  
  return messagesHtml;
};

function generateAddMessageHtml(state) {
  return `
      <div class="outgoing">
        <form class="forms outgoing__forms" action="#/chats" method="POST">
          <input name="text" class="forms__input outgoing__message" value="" placeholder="Enter message to send" required />
          <button type="submit" class="forms__btn btn outgoing__btn">Send</button>
        </form>
      </div>`
};
