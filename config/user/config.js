let userConf = {
    userId: ''
};

let vkConf = {
    query: 'https://api.vk.com/method/',
    accessToken: '',
    apiVersion: '5.52'
};

let urlsConf = {
    wallAddPostSingle: {
        method: 'wall.post',
        parameters: {
            owner_id: userConf.userId,
            friends_only: 1,
            message: ''
        }
    },
    wallGetPostsCount: {
        method: 'wall.get',
        parameters: {
            count: 1
        }
    },
    wallGetPosts: {
        method: 'wall.get',
        parameters: {
            count: ''
        }
    },
    wallDeletePost: {
        method: 'wall.delete',
        parameters:  {
            owner_id: userConf.userId,
            post_id: '',
        }
    }
};

export { userConf, vkConf, urlsConf };