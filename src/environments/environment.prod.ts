export const environment = {
    production: true,
    auth0: {
        clientID: "mcVwIhh03QjPT60sR4tL5lQ200b9OFcy",
        domain: "shusson.au.auth0.com",
        responseType: "token id_token",
        audience: "https://shusson.au.auth0.com/userinfo",
        redirectUri: "https://custom-auth-d9c94.firebaseapp.com",
        scope: "openid"
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
