let db = {
    posts: [
        {
            userHandle: 'user',
            body: 'post body',
            createdAt: 'Date ISO String',
            likeCount: 5,
            commentCount: '3'
        }
    ],
}; 

// This is part of a larger object
const comments = [
    {
        userHandle: 'user',
        postId: 'kljfslkdjfsdf',
        body: 'This is a comment body',
        createdAt: 'ISOString'
    }
]

const notifications = [
    {
        recipient: 'user',
        sender: 'personWhoLikes',
        read: 'true|false',
        postId: 'adflkjsdlkajsd',
        type: 'like/comment',
        createdAt: 'ISO String date'
    }
]

const userDetails = {
    // Redux Data
    credentials: {
        userId: 'asdasdasd',
        email: 'email@me.com',
        handle: 'user',
        createdAt: 'ISOString',
        imageURL: 'image.png/asjkrdfghaskjdha',
        bio: 'Hello I am user',
        website: 'google.com',
        location: 'Planet Earth'
    },
    likes: [
        {
            userHandle: 'user',
            postId: 'klashjdlkasjd'
        },
        {
            userHandle: 'user',
            postId: 'jfhksdflikhf'
        }
    ]
}