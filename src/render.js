export function renderFeed({ state, feedEl }) {
  const feedHtml = `
        <p 
          class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Welcome ${state.username}! This is Your Instant Chat App :)
        </p>
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
  if (state.error) {
    return `
      <div class="status p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">Error alert!</span> ${state.error}
      </div>
    `;
  };

  return ``;
};

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting status p-4 my-4 text-sm text-blue-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">Loading Your Chat App...</span>
      </div>
    `
  };

  if (state.isLoggedIn) {
    return ``;
  };

  return `
    <form class="forms__login" action="#/login" method="POST">
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input type="text" id="username" class="login__username bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username" required>
        <input type="hidden" name="authenticity_token" value="<%= form_authenticity_token %>">
        </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
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
                 <div class="login__waiting status p-4 my-4 text-sm text-blue-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span class="font-medium">Loading Your Chat App...</span>
                </div>
            </div>`;
  };

  return `
      <div class="content w-full">
        ${generateControlsHtml()}
        <div class="content__chat flex flex-col md:flex-row">
            <ul class="users min-w-fit break-all flex flex-col items-start mr-4 pb-8">
                <span class="user__info pb-4">
                    All Users
                </span>
                ${generateUsersHtml(state)}
            </ul>
            <ol class="messages break-all flex flex-col">
                <span class="messages__info pb-4">
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
        <div class="controls mb-8">
          <button type="button" class="controls__logout text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
        </div>`;
};

function generateUsersHtml(state) {
  const loggedInUsersHtml = Object.values(state.loggedInUsers).map(user => { // this is an array
    return `
      <li class="user list-square">
        <span
          class="user__username--logged-in text-green-400">
            ${user}
        </span> 
      </li>
    `;
  }).join('') || `<p>No Online Friends yet, add one!</p>`;

  const offlineUsersHtml = Object.values(state.offlineUsers).map(user => {
    return `
        <li class="user">
          <span
            class="user__username--logged-out text-gray-600">
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
          <li class="message flex flex-row items-start mb-4 ${sender === state.username ? `message-self` : ``}" data-id=${id}>
            <div class="message__sender min-w-fit flex flex-col items-start pr-12 mr-8 border-r-gray-500 border-r-2">
                <img class="avatar h-14 mb-2 border-2 rounded border-indigo-500/75" src="./images/avatar-default.jpg" alt="Default avatar">
                <span class="username">${sender}</span>
            </div>
            <div class="message__content flex flex-col ${sender === state.username ? `message__self text-green-500` : ``}">
                <span class="message__text">${message}</span>
                <span class="message__time text-gray-500">${formattedDate}</span>
            </div>
          </li>
        `;
  }).join('') || `<p>No Messages yet, start chat!</p>`;

  return messagesHtml;
};

function generateAddMessageHtml(state) {
  return `
      <div class="my-10 outgoing">
        <form class="outgoing__forms" action="#/chats" method="POST">
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-center pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <input id="chat" rows="1" class="outgoing__message block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."/ >
                  <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    <span class="sr-only">Send message</span>
                  </button>
            </div>
        </form>
      </div>`
};
