import { log } from '../utils/log.js';

export default () => {
    log('Deleting all posts');


    let store = {
        postsCount: 0,
        posts: [],
        postsId: []
    };



    axios.get( URLwallGetPostsCount )
        .then( (response) => {
            log( 'Success: Get response from API' );
            return response.data;
        })
        .then( (data) => {
            if ( data.response.count > 0 ) {
                log('Wall: count of posts = ' + data.response.count);
            } else {
                log( 'Posts not found' )
            }
        })
        .catch( (error) => {
            log( 'Error:' );
            log(error);
        });
}