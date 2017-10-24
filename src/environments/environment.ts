// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    auth0: {
        clientID: 'mcVwIhh03QjPT60sR4tL5lQ200b9OFcy',
        domain: 'shusson.au.auth0.com',
        responseType: 'token id_token',
        audience: 'https://shusson.au.auth0.com/userinfo',
        redirectUri: 'http://localhost:4200',
        scope: 'openid'
    },
    firebase: {
        apiKey: "AIzaSyCMQNwxeO9jtR-aedfVjYF4iwz4Opwczp8",
        authDomain: "custom-auth-d9c94.firebaseapp.com",
        databaseURL: "https://custom-auth-d9c94.firebaseio.com",
        projectId: "custom-auth-d9c94",
        storageBucket: "custom-auth-d9c94.appspot.com",
        messagingSenderId: "710858655867"
    }
};
