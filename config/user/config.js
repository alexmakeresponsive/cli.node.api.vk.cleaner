let userConf = {
    userId: '37858560'
};

let vkConf = {
    query: 'https://api.vk.com/method/',
    accessToken: '0cd58d32e0b356b0d6f0c82ba24f76d78fd6d5d42f15378786b797f6446fb2f45f8141cdcf21f861c21f7',    // my page
    accessGroupToken: 'fa378b46a26316251ff100f0250db49b9b8422498fdd4ef5c7bde58e1050a2320e6348ff06a58f1314df1',       //https://vk.com/public156594346
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