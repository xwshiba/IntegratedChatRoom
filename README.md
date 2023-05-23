# IntegratedChatRoom

This app is a single page application that involves multiple logged in users. Users can send messages, view logged in users, and receive messages without refreshing the page.
This project demonstrates understanding for web fundamentals.

### Details
- The HTML will load a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view/use the chat
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- Every message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time. The username only shows up once in the list of users regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of
  - Because we are only counting explicit "logout" actions, this app will consider a user that left the app (closing the tab or navigating to another page) as still "logged in" - that is fine for this assignment
- Multiple users can be logged in at once and can send and see messages from one another

### Running Instructions
- The app is usable by running `npm install` (once only), `npm run build`, `npm start`
- main branch - CSS for appearance
- tailwind branch - tailwind for appearance

### Tech Stacks
- RESTful services using express
- Call RESTful services in front end JS using fetch
- Maintaining persistent state on the server and using services to load and update client state
- Using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Using RESTful services for authentication/authorization
- Implement Basic polling feature to check the server for updates and update client state
  - Not using websockets or long polling, just a simple time-based loop
- Using Tailwind CSS (including [Flowbite, MIT License](https://flowbite.com/docs/getting-started/license/)) in Tailwind branch

### Security

- No password involved at all as this app is not focus on cyber security
- User "dog" will be rejected with a 403 error on login (we use this check instead of checking for password)
- Services that require authorization will respond with the appropriate Status Codes (401, 403) if the request does not have a valid sid cookie value
- Use allowlist to sanitize the username
- Use allowlist to sanitize the message, which is not ideal, may use library later
- All service calls that return lists of users or lists of messages require authorization
- The services never trusts the user input to decide which user is sending a message (That is, the username will not be input for service calls to send messages - instead, use the sid to find what username that session belongs to and use that)

### Code Review Highlights

- Follow the best practices for JS, CSS, HTML, services, and file structures
- The services follow the REST requirements
- The service urls are in an `/api/` path
- The service urls have a version in their path
- No paginate yet
- Use Semantic HTML
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
