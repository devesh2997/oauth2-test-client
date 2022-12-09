import Cors from 'cors'
import { TokenRequest, BaseTokenRequestHandler,AuthorizationServiceConfiguration, FetchRequestor } from '@openid/appauth';
import $ from "jquery"
import { getToken } from '../../lib/auth';
import { redirect } from 'next/dist/server/api-utils';
global.$ = $ 


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
    origin: true
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req,
    res,
    fn
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            console.log("fffff")
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(
    req,
    res
) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    const token = await getToken(req.query.code)

    console.log(token)
    
    redirect(res, "/")
}