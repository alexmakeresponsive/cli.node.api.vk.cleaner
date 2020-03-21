// import { URLwallGetPostsCount } from './config/user/config.js';
import { log } from './utils/log.js';
import prompt from 'prompt';
import colors from 'colors/safe';

import promptUser from './prompt/user.js';
import promptGroup from  './prompt/group.js';


prompt.start();

prompt.get({
    properties: {
        choice: {
            description: colors.green(
                `\n Are you use api for user or group?` +
                `\n 1 - for user` +
                `\n 2 - for group` +
                `\n`
            )
        }
    }
}, function (err, result) {
    switch (+result.choice) {
        case 1:
            log('work with user API');
            promptUser();
            break;
        case 2:
            log('work with group API');
            promptGroup();
            break;
        default:
            log('work with group API');
            promptGroup();
            break;
    }
});