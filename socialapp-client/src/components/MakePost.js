import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { makePost } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';

const styles = {
    formContainer: {
        textAlign: 'center'
    },
    dialog: {
        position: 'relative'
    },
    textField: {
        marginBottom: '20px'
    },
    button: {
        float: 'right'
    },
    spinner: {
        fontSize: '0.6rem'
    },
    closeButton: {
        postition: 'absolute',
        right: '10%',
        top: '10%'
    }
}


function MakePost(props) {

    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');
    const [UIErrors, setUIErrors] = useState({});

    const { makePost, classes, UI: { loading } } = props;

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setBody('');
        setUIErrors({});
    }

    const handleChange = (e) => {
        setBody(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(body === ''){
            setUIErrors({
                body: 'Post body must not be empty'
            })
        }
        else{
            console.log(body);
            makePost({ 
                body: body 
            });
            setOpen(false);
            setBody('');
            setUIErrors({});
        }
    }

    return (
        <Fragment>
            <MyButton tip="Make A Post" onClick={handleOpen}>
                <AddIcon color="secondary"/>
            </MyButton>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className={classes.dialog}>
                <DialogTitle>
                    Make A new Post
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name="body" 
                            type="text" 
                            label="Your Post" 
                            multiline rows="4" 
                            placeholder="Anything On Your Mind?"
                            error={UIErrors.body ? true : false} 
                            helperText={UIErrors.body}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth/>
                        
                        
                        <Button 
                            variant="container"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                            onClick={handleClose}>
                                Cancel
                        </Button>
                        <Button type="submit" 
                            variant="container"
                            color="secondary"
                            className={classes.button}
                            disabled={loading}>
                            {loading ? <circularProgress size={20} className={classes.spinner}/> : 'Submit'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

MakePost.propTypes = {
    makePost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { makePost })(withStyles(styles)(MakePost));
