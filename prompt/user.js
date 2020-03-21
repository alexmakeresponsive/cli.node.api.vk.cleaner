import prompt from 'prompt';
import colors from 'colors/safe';

import wallAddPostSingle from '../actions/user/wallAddPostSingle.js';
import wallDeletePostAll from '../actions/user/wallDeletePostAll.js';
import wallDataShowBrowser from '../actions/user/wallDataShowBrowser.js';

import dataPosts from '../data/posts.js';

export default () => {
    return prompt.get({
        properties: {
            choice: {
                description: colors.green(
                    `\n Select action for user:` +
                    `\n 1 - delete all posts from wall` +
                    `\n 2 - add single post to wall` +
                    `\n 3 - add multi posts to wall` +
                    `\n 4 - ` +
                    `\n 5 - show data through browser` +
                    `\n 6 - exit`
                )
            }
        }
    }, function (err, result) {
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
                wallDataShowBrowser();
                break;
            case 6:
                log('See you later!');
                break;
            default:
                log('See you later!');
                break;
        }
    });
}