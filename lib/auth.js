import {TokenRequest, BaseTokenRequestHandler, FetchRequestor, AuthorizationNotifier, AuthorizationRequest, AuthorizationServiceConfiguration, RedirectRequestHandler } from '@openid/appauth';

const configuration = new AuthorizationServiceConfiguration({
    authorization_endpoint: "http://localhost:9000/identity/v1/authorize",
    token_endpoint: "http://localhost:9000/identity/v1/token",
    revocation_endpoint: "string",
})

const clientID = "222222"
const redirectURI = "http://localhost:3000/login"

export const login = () => {
    const notifier = new AuthorizationNotifier();
    // uses a redirect flow
    const authorizationHandler = new RedirectRequestHandler();
    // set notifier to deliver responses
    authorizationHandler.setAuthorizationNotifier(notifier);
    // set a listener to listen for authorization responses
    notifier.setAuthorizationListener((request, response, error) => {
        console.log('Authorization request complete ', request, response, error);
        if (response) {
            const code = response.code;
            console.log(`Authorization Code ${response.code}`);
        }
    });
    // create a request
    let request = new AuthorizationRequest({
        client_id: clientID,
        redirect_uri: redirectURI,
        response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
    }, undefined, false);

    // make the authorization request
    authorizationHandler.performAuthorizationRequest(configuration, request);
}

export const getToken = async (code) => {
    console.log("jjjj")
    const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());

    // use the code to make the token request.
    let request = new TokenRequest({
        client_id: clientID,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
        code: code,
    });

    try {
        const response = await tokenHandler.performTokenRequest(configuration, request)
        return response
    } catch (error) {
        console.log(error)
    }

    return null
}