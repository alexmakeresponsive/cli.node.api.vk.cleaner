import { log } from '../../utils/log.js';
import axios from 'axios';
import { userConf, vkConf, urlsConf } from '../../config/group/config.js';
import { timerStart, timerStop, timerTimePassed } from '../../utils/simpleTimer.js';

export default (dataEntry) => {
    let store = {
        dataEntryPrepare: [],
        dataEntryPrepareNext: []
    };

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

    let URLwallAddPostSingle = (dataString) => urlConstructor( urlsConf.wallAddPostSingle.method, urlsConf.wallAddPostSingle.parameters, dataString );


    // log(URLwallAddPostSingle(data));
    let addPost = (postText) => {
        //Returned Promise
        return axios.post( URLwallAddPostSingle(postText) )
            .then( (response) => {
                // log( 'Success: post added' );
                log(response.data);
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };

    let addPosts = (arrEntry) => {
        timerStart();

        let arr = arrEntry.map(function (post) {
            return addPost(post.message);
        });

        return Promise.all( arr )
            .then(results => {
                timerStop();
                log('Add: posts added');
                addPostsStarter();
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });

        /*setTimeout(function() {
            timerStop();
            log('Add: posts added');
            addPostsStarter();
        }, 5000);*/
    };

    let addPostsStarter = () => {
        let delay;

        if ( timerTimePassed < 1000 && timerTimePassed !== 0 ) {
            delay = 1000 - timerTimePassed + 100;
        } else if ( timerTimePassed === 0 ) {
            delay = 0;
        } else {
            delay = timerTimePassed % 1000 + 100;
        }

        if ( store.dataEntryPrepareNext.length === 0 ) {
             store.dataEntryPrepareNext = dataEntry;
        } else {
             store.dataEntryPrepareNext = store.dataEntryPrepareNext.slice(4 , store.dataEntryPrepareNext.length);
        }
             store.dataEntryPrepare     = store.dataEntryPrepareNext.slice(0,4);

        log( 'Starter: dataEntryPrepare:' );
        log( store.dataEntryPrepare );

        if ( store.dataEntryPrepare.length > 0 ) {
            log( 'Starter: delay = ' + delay );
            setTimeout(function() {
                addPosts(store.dataEntryPrepare);
            }, delay);
        } else {
            log( 'Starter: Posts not found' );
        }
    };


    if ( typeof dataEntry === 'string' ) {
        addPost(dataEntry);
    } else {
        addPostsStarter();
    }
}