import React, {Fragment} from 'react';
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI Stuff
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = {
    paper: {
        padding: '20px 20px 50px 20px',
        position: 'relative'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#000'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    },
    ml1: {
        marginLeft: '1em'
    },
    exit: {
        display: 'block',
        position: 'absolute',
        right: '10px',
        bottom: '5px'
    }
};

function StaticProfile(props) {

    const {classes, profile: { handle, createdAt, imageURL, bio, website, location }} = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageURL} alt="profile"/>
                </div>

                <hr/>

                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color='secondary' variant="h5">
                        @{handle}
                    </MuiLink>
        

                    <hr/>

                    {bio && <Typography variant="body2">{bio}</Typography>}

                    <hr/>

                    {location && (
                        <Fragment>
                            <LocationOn color="secondary"/> <span>{location}</span>
                            <hr/>
                        </Fragment>
                    )}

                    {website && (
                        <Fragment>
                            <LinkIcon color="secondary"/>
                            <a href={website} color="primary" target="_blank" rel="noopener noreferrer">
                                {'  '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}

                    <CalendarToday color="secondary" />{'  '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
