<img src="https://raw.githubusercontent.com/talkrz/mynotes/master/src/logo.png" width="180">

My notes is a simple sticky notes app created to learn web development tech
stack (react, redux etc.) and make an useful thing as a side effect.

This repo contains client-side code.

Look at the `mynotes-server` repository for the server-side code.

<img src="https://raw.githubusercontent.com/talkrz/mynotes/master/src/screenshot.png" width="640">

## How to set up the development environment

Make sure you have node installed (for now it is only tested with version 7).
Clone this repository and enter it's directory.

Type:
```
npm install
npm start
```

Done! The app (in development mode) should run at http://localhost:3000

### Changing the server URL

You can configure the server URL for app running in dev mode without modifying
actual configuration file.
Just create .env file in the project root with following env variable:
```
REACT_APP_SERVER_URL="http://your.server.url"
```

## Demo

Demo is available at: https://talkrz.github.io

Login: `test@example.com`

Password: `test`
