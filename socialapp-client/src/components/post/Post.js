import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import LikeButton from './LikeButton.jsx';
import DeletePost from './DeletePost'; 
import PropTypes from 'prop-types';
import PostDialog from './PostDialog';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import MyButton from '../../util/MyButton';
 
// Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: '20px',
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: '25px',
        objectFit: 'cover'
    }
}

function Post(props) {
    const { classes, 
            post : {postId, body, userImage, createdAt, userHandle, likeCount, commentCount }, 
            user: { authenticated, credentials }} = props;
    const { handle } = credentials;
    dayjs.extend(relativeTime); // To get the From now 

    const deleteButton = ( authenticated && handle === userHandle ) ? (
        <DeletePost id="deleteIcon" postId={postId}/>
    ) : null

    return (
        // Always wrap plain text with <Typography>
        <Card className={classes.card}>
            <CardMedia className={classes.image} 
            image={userImage}
            title="Profile Image"/>
            <CardContent className={classes.content}>
                <Typography 
                variant="h5" 
                component={Link} to={`users/${userHandle}`}
                color="secondary"> {userHandle} </Typography>
                {deleteButton}

                <Typography variant="body2" color="textSecondary"> {dayjs(createdAt).fromNow()} </Typography>
                <Typography variant="body1"> {body} </Typography>

                <LikeButton postId={postId} />
                <span>{likeCount} Likes</span>
                <MyButton tip="comment">
                    <ChatIcon color="secondary" />
                </MyButton>
                <span>{commentCount} Comments</span>
                <PostDialog postId={postId} userHandle={userHandle} openDialog={props.openDialog}/>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

export default connect(mapStateToProps)(withStyles(styles)(Post)); // this gives us access to the classes object via the props
