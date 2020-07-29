import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'; 

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
    commentImage: {
        maxWidth: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginLeft: '15px'
    },
    commentData: {
        marginLeft: '20px',
        marginBottom: '10px'
    },
    mainGrid: {
        display: 'flex',
        alignItems: 'center'
    }
}

function Comments(props) {

    const { comments, classes } = props;

    return (
        <Fragment>
            <Grid container>
                {comments && comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12} className={classes.mainGrid}>
                                <Grid container>
                                   <Grid item sm={3}>
                                       <img src={userImage} alt="user" className={classes.commentImage}/>
                                   </Grid>
                                   <Grid item sm={9} className={classes.mainGrid}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5"
                                                component={Link}
                                                to={`users/${userHandle}`}
                                                color="secondary">
                                                    {userHandle}
                                            </Typography>

                                            <Typography variant="body2"
                                                color="secondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}                                                    
                                            </Typography>

                                            <hr className={classes.invisibleSeperator}/>

                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                   </Grid>
                                </Grid>
                            </Grid>
                            {(index !== comments.length - 1) && (
                                <hr className={classes.visibleSeperator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid> 
        </Fragment>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
