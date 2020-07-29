import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { editUserDetails } from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';


const styles = {
    formContainer: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px 0'
    },
    textField: {
        marginBottom: '20px'
    },
    button: {
        float: 'left'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    spinner: {
        fontSize: '0.6rem'
    },
}


const EditDetails = (props) => {

    const [details, setDetails] = useState({
        newBio: '',
        newWebsite: '',
        newLocation: '',
        open: false
    });


    const { classes, editUserDetails, credentials: { bio, website, location } } = props;
    const { newBio, newWebsite, newLocation, open } = details;

    useEffect(() => {
        setDetails({
            newBio: bio ? bio : '',
            newWebsite: website ? website : '',
            newLocation: location ? location : ''
        });
        // eslint-disable-next-line
    }, []);

    const openDialog = () => {
        setDetails({
            ...details,
            open: true
        });
    }

    const closeDialog = () => {
        setDetails({
            ...details,
            open: false
        });
    }

    const onChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        const userDetails = {
            bio: newBio,
            website: newWebsite,
            location: newLocation
        };
        editUserDetails(userDetails);
    }

    return (
        <Fragment>
            <MyButton tip="Edit Details" onClick={openDialog} btnClassName={classes.button}>
                    <EditIcon color="secondary" />
            </MyButton>

            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <form>

                        <TextField 
                        name="newBio" 
                        type="text" 
                        label="Bio" 
                        multiline 
                        rows="4" 
                        placeholder="A short Bio about yourself" 
                        className={classes.textField}
                        value={newBio}
                        onChange={onChange}
                        fullWidth />

                        <TextField 
                        name="newWebsite" 
                        type="text" 
                        label="Website" 
                        placeholder="Your website" 
                        className={classes.textField}
                        value={newWebsite}
                        onChange={onChange}
                        fullWidth />

                        <TextField 
                        name="newLocation" 
                        type="text" 
                        label="Location" 
                        placeholder="Your Location" 
                        className={classes.textField}
                        value={newLocation}
                        onChange={onChange}
                        fullWidth />

                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary">Cancel</Button>
                    <Button onClick={onSubmit} color="secondary">Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

EditDetails.propTypes = {
    credentials: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
