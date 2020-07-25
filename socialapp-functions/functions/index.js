const functions = require('firebase-functions');
const express = require('express');
const auth = require('./util/auth');
const { db } = require('./util/admin');
const { getPosts, createPost, getPost, makeComment, likePost, unlikePost, deletePost } = require('./routes/posts');
const { register, login, uploadImage, addUserDetails, getUser, getUserDetails, markNotificationsRead } = require('./routes/users');
const app = express();

// SOCIAL APP POSTS ROUTES
app.get('/posts', getPosts);// Get all posts
app.post('/posts', auth, createPost); // Post a new post
app.get('/posts/:postId', getPost); // get info about a single post
app.delete('/posts/:postId', auth, deletePost); // delete a post
app.get('/posts/:postId/like', auth, likePost) // Like a post
app.get('/posts/:postId/unlike', auth, unlikePost) // Like a post
app.post('/posts/:postId/comment', auth, makeComment); // Make a comment on a post

// SOCIAL APP USERS ROUTES 
app.post('/register', register); //sign up route
app.post('/login', login); // Login route
app.post('/user/image', auth, uploadImage); // upload an image
app.post('/user', auth, addUserDetails); // Add user details
app.get('/user', auth, getUser); // get info about user
app.get('/user/:handle', getUserDetails);
app.post('/notifications', auth, markNotificationsRead)

exports.createNotificationOnlike = functions.firestore.document('/likes/{id}').onCreate(async (snapshot) => {
    try {
        const doc = await db.doc(`/posts/${snapshot.data().postId}`).get(); // we have access to user handle via the likes route
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
             // the id of the like is the same as the id of the notification that pertains to the like
            return await db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'like',
                read: false,
                postId: doc.id
            });
        }    
    } catch (err) {
        console.error(err);
    }
});

exports.removeNotificationOnUnlike = functions.firestore.document('likes/{id}').onDelete( async (snapshot, context) => {
    try {
        return await db.doc(`notifications/${snapshot.id}`).delete();   
    } catch (err) {
        console.error(err);
    }
})

exports.createNotificationForComments = functions.firestore.document('comments/{id}').onCreate(async (snapshot) => {
    try {
        const doc = await db.doc(`posts/${snapshot.data().postId}`).get();
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'comment',
                read: false,
                postId: doc.id
            });
        }
    } catch (err) {
        console.error(err);
    }
});

// Update corresponding collections when user changes their user image
exports.onUserImageChanges = functions.firestore.document('/users/{userId}').onUpdate(async (change) => {
    console.log(change.before.data().imageURL);
    console.log(change.after.data().imageURL);
    try {
        if(change.before.data().imageURL !== change.after.data().imageURL){
            console.log('image Has changed');
            const batch = db.batch();
            const data = await db.collection('comments').where('userHandle', '==', change.before.data().handle).get();
            data.forEach(doc => {
                const comment = db.doc(`/comments/${doc.id}`);
                batch.update(comment, {userImage: change.after.data().imageURL});
            });

            const posts = await db.collection('posts').where('userHandle', '==', change.after.data().handle).get();
            posts.forEach(post => {
                const postEdited = db.doc(`/posts/${post.id}`);
                batch.update(postEdited, {userImage: change.after.data().imageURL});
            });
            batch.commit();
        } else {
            return true;
        }  
    } catch (err) {
        console.error(err);
    }
})

// auto turn the app into base route url/api
exports.api = functions.https.onRequest(app);
