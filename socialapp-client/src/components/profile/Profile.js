import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { uploadImage, logoutUser } from '../../redux/actions/userActions';
import EditDetails from './EditDetails'; 
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
// MUI Stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography  from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import Exit from '@material-ui/icons/ExitToApp';

const styles = {
    paper: {
        padding: '20px 20px 50px 20px',
        position: 'relative'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                left: '70%',
                top: '80%'
            }
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
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textaAlign: 'center',
        '& a': {
            margin: '20px 10px'
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

function Profile(props) {

    const { classes, user: {authenticated, loading}, uploadImage, logoutUser } = props;
    const { handle, createdAt, imageURL, bio, website, location } = props.user.credentials;


    // Get the selected image and create a new formData object and send that to the server
    const changeImage = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        uploadImage(formData);
    }

    // Allow the button to emulate a click on the file input
    const handleImageChange = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    const logout = (e) => {
        logoutUser();
    }

    let ProfileMarkup = (!loading) ? ( authenticated ? (
        // Not loading and is authenticated
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageURL} alt="profile"/>
                    <input type="file" id="imageInput" hidden onChange={changeImage} />

                    <MyButton tip="Edit Profile Picture" onClick={handleImageChange} btnClassName="button">
                        <EditIcon color="secondary" />
                    </MyButton>
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

                <MyButton tip="Logout" onClick={logout} btnClassName={classes.exit}>
                        <Exit color="secondary" />
                </MyButton>
                
                <EditDetails />
            </div>
        </Paper>

    ) : (
        // Not loading and unathenticated
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No Profile Found Please Login or Register Now
            </Typography>
            <div align="center" className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to='/login'>
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to='/register'>
                    Register
                </Button>
            </div>
        </Paper>
    )) : ( 
        // Loading
        <p>Loading...</p> 
    )
    return ProfileMarkup;
}

const mapStateToProps = (state) => ({
    user: state.user
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { uploadImage, logoutUser })(withStyles(styles)(Profile));