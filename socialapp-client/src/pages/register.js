import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux Stuff
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px 0'
    },
    textField: {
        marginBottom: '20px'
    },
    button: {
        marginTop: '10px',
        width: '100%'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    spinner: {
        fontSize: '0.6rem'
    }
}

class register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: ''
        }
    }

    // What happens on the submit action
    onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle  
        }
        this.props.registerUser(newUser, this.props.history)
    }

    // Update the state to the value typed
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes, UI: { loading, errors } } = this.props; 
        const { onSubmit, onChange } = this;
        const { email, handle, password, confirmPassword } = this.state;
        return (
            
            <Grid container className={classes.form}>
                <Grid item md></Grid>
                <Grid item md>
                    <Typography variant="h3" className={classes.pageTitle}>Register</Typography>
                    <form onSubmit={onSubmit}>

                        <TextField id="email" name="email" type="email" label="Email" 
                        className={classes.textField} 
                        value={email}
                        onChange={onChange}
                        helperText={errors.email}
                        error={errors.email ? true : false} fullWidth />

                        <TextField id="handle" name="handle" type="text" label="Your Handle" 
                        className={classes.textField} 
                        value={handle}
                        onChange={onChange}
                        helperText={errors.handle}
                        error={errors.handle ? true : false} fullWidth />
                        
                        <TextField id="password" name="password" type="password" label="Password" 
                        className={classes.textField} 
                        value={password}
                        onChange={onChange}
                        helperText={errors.password}
                        error={errors.password ? true : false} fullWidth />

                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
                        className={classes.textField} 
                        value={confirmPassword}
                        onChange={onChange}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" 
                        color="secondary"
                        disabled={loading}
                        className={classes.button}>
                            {loading ? <CircularProgress size={20} className={classes.spinner}/> : 'Register'}
                        </Button>

                        <small>Already have an account? <Link to='/register'>Login Now</Link></small>

                    </form>
                </Grid>
                <Grid item md></Grid>
            </Grid>
           
        )
    }
}

register.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});


export default connect(mapStateToProps, { registerUser })(withStyles(styles)(register));
