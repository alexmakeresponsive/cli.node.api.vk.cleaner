import { log } from '../../utils/log.js';
import axios from 'axios';
import { userConf, vkConf, urlsConf } from '../../config/user/config.js';

export default (data) => {
    let urlConstructor = ( method, parameters, data ) => {
        let parametersParsed = '';

        for (let key in parameters) {
            if (key === 'message') {
                parametersParsed += key + '=' + data + '&';
                continue;
            }
            parametersParsed += key + '=' + parameters[key] + '&';
        }

        let string = '';

        string = string + vkConf.query;
        string = string + method + '?';
        string = string + parametersParsed;
        string = string + 'access_token=' + vkConf.accessToken + '&' + 'v=' + vkConf.apiVersion;

        return string;
    };

    let URLwallAddPostSingle = (data) => urlConstructor( urlsConf.wallAddPostSingle.method, urlsConf.wallAddPostSingle.parameters, data );


    // log(URLwallAddPostSingle(data));
    axios.get( URLwallAddPostSingle(data) )
        .then( (response) => {
            log( 'Success: Post response from API' );
            return response.data;
        })
        .then( (data) => {
            log(data);
        })
        .catch( (error) => {
            log( 'Error:' );
            log(error);
        });
}