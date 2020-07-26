import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getPost } from '../redux/actions/dataActions';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { CircularProgress } from '@material-ui/core';


const styles = {
    invisibleSeperator: {
        border: 'none',
        margin: 4
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
    }
}

function PostDialog(props) {

    const[open, setOpen] = useState(false);
    const { classes, getPost, postId, post, UI: { loading } } = props;

    const handleOpen = () => {
        setOpen(true);
        getPost(postId)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinner}>
            <CircularProgress size={100} thickness={2} color="secondary" className={classes.spinner}/>
        </div>
    ) : (
        <Grid container spacing={4}>
            <Grid item sm={5}>
                <img src={post.userImage} alt="user" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7} className={classes.text}>
                <Typography component={Link}
                color="secondary"
                variant="h5"
                to={`users/${post.userHandle}`}>
                    @{post.userHandle}
                </Typography>
                
                <hr className={classes.invisibleSeperator}/>

                <Typography variant="body2" color="primary">
                    {dayjs(post.createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>

                <hr className={classes.invisibleSeperator}/>

                <Typography variant="body1">
                    {post.body}
                </Typography>
            </Grid>
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
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
})

export default connect(mapStateToProps, { getPost })(withStyles(styles)(PostDialog));
