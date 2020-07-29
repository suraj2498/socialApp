import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { submitComment } from '../../redux/actions/dataActions';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },
    button: {
        float: 'right'
    },
    textField: {
        marginBottom: '10px'
    }
}

function CommentForm(props) {

    const [body, setBody] = useState('');
    const { classes, authenticated, UI: { errors }, postId, submitComment } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        submitComment(postId, { body });
        setBody('');
    }

    const handleChange = (e) => {
        setBody(e.target.value);
    } 

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{textAlign: 'center'}}>
            <form onSubmit={handleSubmit}>
                <TextField name="body"
                type="text"
                label="Post a comment"
                error={errors.comment ? true : false}
                helperText={errors.comment}
                value={body}
                onChange={handleChange}
                sm={12}
                fullWidth
                className={classes.textField} />

                <Button type="submit"
                   color="secondary" 
                   className={classes.button} >
                       Comment
                </Button>
            </form>
            {/* <hr className={classes.visibleSeperator}/> */}
        </Grid>
    ) : null;

    return (
        <Fragment>
            {commentFormMarkup}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
