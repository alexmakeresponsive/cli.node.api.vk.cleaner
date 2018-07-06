import { log } from '../utils/log.js';
import axios from 'axios';
import { userConf, vkConf, urlsConf } from '../config/config.js';

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
        postsCount: 0,
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
                log('Delete: posts end');
        });
    };







    let getPostsId = () => {
        axios.get( URLwallGetPosts(4) )
            .then( (response) => {
                log( 'Success: Get post for process' );
                return response.data;
            })
            .then( (data) => {
                data.response.items.forEach(function (item, index) {
                    store.postsId[index] = item.id;
                });
            })
            .then( () => {
                log('Store: posts ID = ' + store.postsId);
            })
            .then( () => {
                log('Delete: posts started');
                deletePosts();
            })
            .catch( (error) => {
                log( 'Error:' );
                log(error);
            });
    };


    axios.get( URLwallGetPostsCount(1) )
        .then( (response) => {
            log( 'Success: Get response from API' );
            return response.data;
        })
        .then( (data) => {
            if ( data.response.count > 0 ) {
                store.postsCount = data.response.count;
            } else {
                log( 'Posts not found' );
            }
        })
        .then( () => {
            log('Store: count of posts = ' + store.postsCount);
        })
        .then( () => {
            getPostsId();
        })
        .catch( (error) => {
            log( 'Error:' );
            log(error);
        });
}