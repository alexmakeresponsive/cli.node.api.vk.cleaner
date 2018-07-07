let userConf = {
    userId: '37858560',
    // groupId: '-156594346',  //Test Promises
    groupId: '-156599986',      ////Test Promises 2
};

let vkConf = {
    query: 'https://api.vk.com/method/',
    accessToken: '0cd58d32e0b356b0d6f0c82ba24f76d78fd6d5d42f15378786b797f6446fb2f45f8141cdcf21f861c21f7',       //user token
    // accessToken: 'fa378b46a26316251ff100f0250db49b9b8422498fdd4ef5c7bde58e1050a2320e6348ff06a58f1314df1',       //public token
    // accessToken: 'e7e875cbe7e875cbe7e875cbd4e78d6079ee7e8e7e875cbbcd5d8a392ed2fd8274ed9ca',       //service token - for wall.get
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