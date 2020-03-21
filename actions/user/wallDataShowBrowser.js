import express from 'express';
import axios from 'axios';
const app = express();
import { userConf, vkConf, urlsConf } from '../../config/user/config.js';
import { log } from '../../utils/log.js';


export default () => {
    let urlConstructor = ( method, parameters, data ) => {
        let parametersParsed = '';

        for (let key in parameters) {
            parametersParsed += key + '=' + parameters[key] + '&';
        }

        let string = '';

        string = string + vkConf.query;
        string = string + method + '?';
        string = string + parametersParsed;
        string = string + 'access_token=' + vkConf.accessToken + '&' + 'v=' + vkConf.apiVersion;

        return string;
    };

    let URLwallGetPostsCount = (data) => urlConstructor( urlsConf.wallGetPostsCount.method, urlsConf.wallGetPostsCount.parameters, data );


    // log('URLwallGetPostsCount = ' + URLwallGetPostsCount(''));
    app.get('/', (req, res) => {
        axios.get( URLwallGetPostsCount('') )
            .then( (response) => {
                log( 'Success: Get response from API' );
                return response.data;
            })
            .then( (data) => {
                log( 'Success: Send response to browser' );
                res.send(data);
            })
            .catch( (error) => {
                // handle error
                log( 'Error:' );
                log(error);
            });
    });

    const port = 3000;
    const server = app.listen(port, () => {
        log('app started on http//localhost:' + port);
    });
}