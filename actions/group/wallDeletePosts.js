import { log } from '../../utils/log.js';
import { timerStart, timerStop, timerTimePassed } from '../../utils/simpleTimer.js';
import axios from 'axios';
import { userConf, vkConf, urlsConf } from '../../config/group/config.js';
import colors from 'colors/safe';

export default () => {
    let urlConstructor = ( method, parameters, number ) => {
        let parametersParsed = '';

        for (let key in parameters) {
            if (key === 'count') {
                parametersParsed += key + '=' + number + '&';
                continue;
            }
            if (key === 'post_id') {
                parametersParsed += key + '=' + number + '&';
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

    let URLwallGetPostsCount = (countOfPosts) => urlConstructor( urlsConf.wallGetPostsCount.method, urlsConf.wallGetPostsCount.parameters, countOfPosts );
    let URLwallGetPosts      = (countInProcess) => urlConstructor( urlsConf.wallGetPosts.method, urlsConf.wallGetPosts.parameters, countInProcess );
    let URLwallDeletePost    = (postId) => urlConstructor( urlsConf.wallDeletePost.method, urlsConf.wallDeletePost.parameters, postId );


    let store = {
        posts: [],
        postsId: []
    };


    let deletePost = (postId) => {
        //Returned Promise
        return axios.post( URLwallDeletePost(postId) )
            .then( (response) => {
                log( 'Success: post ID = ' + postId + ' deleted' );
                log(response.data);
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };


    let deletePosts = () => {
        let arr = store.postsId.map(function (postId) {
            return deletePost(postId);
        });

        return Promise.all( arr )
            .then(results => {
                timerStop();
                log('Delete: posts end');
                deletePostsStarter();
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };


    let getPostsId = () => {
        // log( URLwallGetPosts(4) );

        axios.get( URLwallGetPosts(4) )
            .then( (response) => {
                log( 'getPostsId: Get 4 posts from API' );
                if ( response.data.response.items.length === 0 ) {
                    log(response);
                    throw new Error("Items not found");
                }
                return response.data;
            })
            .then( (data) => {
                data.response.items.forEach(function (item, index) {
                    store.postsId[index] = item.id;
                });
            })
            .then( () => {
                log('getPostsId: posts ID = ' + store.postsId);
            })
            .then( () => {
                log('getPostsId: posts delete started');
                timerStart();
                deletePosts();
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };


    let deletePostsStarter = () => {
        let delay;

        if ( timerTimePassed < 1000 && timerTimePassed !== 0 ) {
            delay = 1000 - timerTimePassed + 100;
        } else if ( timerTimePassed === 0 ) {
            delay = 0;
        } else {
            delay = timerTimePassed % 1000 + 100;
        }

        //Check post from API
        axios.get( URLwallGetPostsCount(1) )
            .then( (response) => {
                if(response.data.response) {
                    log( 'deletePostsStarter: get count posts from API' );
                } else {
                    // log(response.data);
                    throw new Error(response.data.error.error_msg);
                }
                return response.data;
            })
            .then( (data) => {
                if ( data.response.count > 0 ) {
                    log( 'deletePostsStarter: delay = ' + delay );

                    setTimeout(function() {
                        getPostsId();
                    }, delay);
                } else {
                    log( 'deletePostsStarter: Posts not found' );
                }
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };


    axios.get( URLwallGetPostsCount(1) )
        .then( (response) => {
            if(response.data.response) {
                log( 'get count posts from API' );
            } else {
                // log(response.data);
                throw new Error(response.data.error.error_msg);
            }
            return response.data;
        })
        .then( (data) => {
            if ( data.response.count > 0 ) {
                log('count of posts = ' + data.response.count);
            } else {
                log( 'Posts not found' );
            }
        })
        .then( () => {
            deletePostsStarter();
        })
        .catch( (error) => {
            log( 'Error:' );
            log(error);
        });
}