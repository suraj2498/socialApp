import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getPost } from '../../redux/actions/dataActions';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments'
import CommentForm from './CommentForm';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat'
import { CircularProgress } from '@material-ui/core';


const styles = {
    invisibleSeperator: {
        border: 'none',
        margin: 4
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },
    profileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    DialogContent: {
        padding: 20,
        position: 'relative'
    },
    spinner: {
        textAlign: 'center'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    }
}

function PostDialog(props) {

    const[open, setOpen] = useState(false);
    const[oldPath, setOldPath] = useState('')

    const { classes, getPost, postId, userHandle, authenticated, UI: { loading }, 
            post: { createdAt, userImage, body, likeCount, commentCount, comments }} = props;

    useEffect(() => {
        console.log(props.openDialog);
        if(props.openDialog)
            handleOpen();
        // eslint-disable-next-line
    }, [])

    const handleOpen = () => {

        setOldPath(window.location.pathname);
        const newPath = `/users/${userHandle}/post/${postId}`;

        if(oldPath === newPath)
            setOldPath(`/users/${userHandle}`);

        window.history.pushState(null, null, newPath);
        setOpen(true);
        getPost(postId);
    }

    const handleClose = () => {
        window.history.pushState(null, null, oldPath);
        setOpen(false);
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinner}>
            <CircularProgress size={100} thickness={2} color="secondary" className={classes.spinner}/>
        </div>
    ) : (
        <Grid container spacing={4}>
            <Grid item sm={5}>
                <img src={userImage} alt="user" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7} className={classes.text}>
                <Typography component={Link}
                color="secondary"
                variant="h5"
                to={`users/${userHandle}`}>
                    @{userHandle}
                </Typography>
                
                <hr className={classes.invisibleSeperator}/>

                <Typography variant="body2" color="primary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>

                <hr className={classes.invisibleSeperator}/>

                <Typography variant="body1">
                    {body}
                </Typography>

                <div className={classes.flex}>
                    <LikeButton postId={postId}/> 
                    { likeCount } Likes
                    <MyButton tip="comment">
                        <ChatIcon color="secondary" />
                    </MyButton>
                    {commentCount} Comments 
                </div>
            </Grid>
            {!authenticated && (
                <hr className={classes.visibleSeperator}/>
            )}
            <CommentForm postId={postId} />
            <Comments comments={comments} />
        </Grid>
    )

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="See Post Info" tipClassName={classes.expandButton}>
                <UnfoldMore color="secondary" className={classes.expandButton}/>
            </MyButton>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" className={classes.dialog}>
                <DialogContent className={classes.DialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    userHandle: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.data.post,
    authenticated: state.user.authenticated,
    UI: state.UI
})

export default connect(mapStateToProps, { getPost })(withStyles(styles)(PostDialog));
