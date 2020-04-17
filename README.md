# CIL - Customer Interaction Log

## Overiew

The goal of this project was to build a simple web application which gives a team or indiviudal an ability to record interactions with a client in a "timeline format".

## Features

- Login - authentication and authorisation for a team
- Ability to create new clients
- Ability to update client name
- Ability to dynamically add timeline "cards" for each client
- Ability to update the timeline card title, description and date
- Fully responsive to mobile/desktop/tablet screens

## Architecture

This project currently uses 
- Express/Node.js backend
- Vue.js frontend
- Firebase for authentication, authorisation and database storage
- Docker for deployment
- Heroku for deployment

## Project setup

Assuming you are happy with the above architecture, running this application is quite simple.

You will need to create a local file at the root directory called .env which will initialise two environment variables.

- FIREBASE_KEY - This is simply the web API key 
- SERVICE_ACCOUNT_KEY - firebase console > relevant project > settings > service accounts > generate new private key

NOTE : the service account key will need to be converted to a string (simply add "" around the ENTIRE JSON obj) - see login.js for further details

Run

```
npm install
```

```
npm run build
```

```
npm run dev 
OR
npm run start
```

You can find further details within this project for the difference between 'dev' and 'start' within the `package.json` file. By default the application will now run and accessed on `localhost:3001`.

## Running with Docker

Running the docker instance is quite simple, execute the following commands from the terminal.

```
docker build -t mn-cli-local
docker run -p 3000:3000 mn-cli-local
```
## Example

Login view.
![](demo/login.png)

Clients view.
![](demo/clients.png)

Timeline view.
![](demo/timeline.png)