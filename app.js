import express from 'express';
import axios from 'axios';
import { URLwallGetPostsCount } from './config/config.js';
import { log } from './utils/log.js';
import prompt from 'prompt';
import colors from 'colors/safe';

import wallAddPostSingle from './actions/wallAddPostSingle.js';
import wallDeletePostAll from './actions/wallDeletePostAll.js';

import dataPosts from './data/posts.js';


prompt.start();

prompt.get({
    properties: {
        choice: {
            description: colors.green(
                `\n What you want?` +
                `\n 1 - delete all posts from wall` +
                `\n 2 - add single post to wall` +
                `\n 3 - add multi posts to wall` +
                `\n 4 - get posts count on wall` +
                `\n 5 - exit`
            )
        }
    }
}, function (err, result) {
    // log(colors.cyan("You said: " + result.choice));

    switch (+result.choice) {
        case 1:
            wallDeletePostAll();
            break;
        case 2:
            prompt.get({
                properties: {
                    text: {
                        description: colors.green("Type text of message")
                    }
                }
            }, function (err, result) {
                wallAddPostSingle(result.text);
            });
            break;
        case 3:
            // log(dataPosts());

            dataPosts().forEach(function (post) {
                wallAddPostSingle(post.message);
            });
            break;
        case 4:
            log('Show posts count on wall');
            break;
        case 5:
            log('See you later!');
            break;
        default:
            log('See you later!');
            break;
    }
});





// const app = express();
//
// app.get('/', (req, res) => {
//     axios.get( URLwallGetPostsCount )
//         .then( (response) => {
//             log( 'Success: Get response from API' );
//             return response.data;
//         })
//         .then( (data) => {
//             log( 'Success: Send response to browser' );
//             res.send(data);
//         })
//         .catch( (error) => {
//             // handle error
//             log( 'Error:' );
//             log(error);
//         });
// });
//
//
//
// const port = 3000;
// const server = app.listen(port, () => {
//     log('app started on http//localhost:' + port);
// });