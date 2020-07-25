import React, { Fragment, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { deletePost } from '../redux/actions/dataActions'

// Mui Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MyButton from '../util/MyButton';

const styles = {
    red: {
        color: 'red'
    },
    deleteButton: {
        position: 'absolute',
        bottom: '7px',
        right: '7px'
    }
}

function DeletePost(props) {

    const [open, setOpen] = useState(false);
    const { classes, postId } = props; 

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deletePost = () => {
        props.deletePost(postId);
        setOpen(false);
    }

    return (
        <Fragment>
            <MyButton tip="Delete Post" onClick={handleOpen} btnClassName={classes.deleteButton}>
                {/* eslint-disable-next-line */}
                <DeleteOutline className={classes.red} />
            </MyButton>
            <Dialog open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm">

                <DialogTitle>
                    Are you sure you want to delete this post?
                    <br/>
                    <small>This action is not reversible</small>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deletePost} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
