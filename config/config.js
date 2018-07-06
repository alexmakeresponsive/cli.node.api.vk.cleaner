let userConf = {
    userId: '37858560'
};

let vkConf = {
    query: 'https://api.vk.com/method/',
    accessToken: 'b018e96c46c4adddcd115994ddc7182136c8eb972f16e85998429137d176782726ac572fc1bdc595129f5',
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

export { userConf, vkConf, urlsConf };