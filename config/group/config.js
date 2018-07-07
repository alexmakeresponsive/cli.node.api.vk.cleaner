let userConf = {
    userId: '',
    groupId: '-',
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
            owner_id: userConf.groupId,
            friends_only: 0,
            from_group: 0,
            message: ''
        }
    },
    wallGetPostsCount: {
        method: 'wall.get',
        parameters: {
            owner_id: userConf.groupId,
            count: 1
        }
    },
    wallGetPosts: {
        method: 'wall.get',
        parameters: {
            owner_id: userConf.groupId,
            count: ''
        }
    },
    wallDeletePost: {
        method: 'wall.delete',
        parameters:  {
            owner_id: userConf.groupId,
            post_id: '',
        }
    }
};

export { userConf, vkConf, urlsConf };