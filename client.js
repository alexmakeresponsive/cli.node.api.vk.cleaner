let log = (d) => {
    console.log(d)
};


let userConf = {
    userId: '37858560'
};

let vkConf = {
    query: 'https://api.vk.com/method',
    accessToken: 'b018e96c46c4adddcd115994ddc7182136c8eb972f16e85998429137d176782726ac572fc1bdc595129f5',
    apiVersion: '5.52'
};

let urlsConf = {
    wallGetPostsCount: {
        method: 'wall.get',
        parameters: 'count='
    },
    wallGetPosts: {
        method: 'wall.get',
        parameters: 'count='
    },
    wallDeleteSingle: {
        method: 'wall.delete',
        parameters: 'owner_id=' + userConf.userId + '&post_id='
    }
};

let store = {
    postsCount: 0,
    posts: [],
    postsId: []
};

let urlConstructor = ( method, parameters, id ) => {
    let string = '';

    string = string + vkConf.query + '/';
    string = string + method + '?';
    string = string + parameters + id + '&';
    string = string + 'user_id=' + userConf.userId + '&' + 'access_token=' + vkConf.accessToken + '&' + 'v=' + vkConf.apiVersion;

    return string;
};

/*
let fetchOptions = {
    method: 'GET',
    // mode:   'cors',
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'multipart/form-data'

    }
};


fetch( urlConstructor( urlsConf.wallGetPostsCount.method, urlsConf.wallGetPostsCount.parameters , 1 ), fetchOptions )
    .then((response) => {
        log( 'headers = ' + response.headers.get('Content-Type')); // application/json; charset=utf-8
        log( 'status = ' + response.status); // 200

        if (!response.ok) {
            throw Error(response.statusText);
        }


        return response.json();
    })
    .then((data) => {
        log(data); // iliakan
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: ', error);
    });*/

// log( urlConstructor( urlsConf.wallGetPostsCount.method, urlsConf.wallGetPostsCount.parameters , 1 ) );


let axiosURL = urlConstructor( urlsConf.wallGetPostsCount.method, urlsConf.wallGetPostsCount.parameters , 1 );

axios.get(axiosURL)
    .then(function (response) {
        // handle success
        log('Response from vk = ');
        log(response);
    })
    .catch(function (error) {
        // handle error
        log(error);
    })
    .then(function () {
        // always executed
    });


