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

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    // What happens on the submit action
    onSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,  
        }

        this.props.loginUser(userData, this.props.history);
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
        const { email, password} = this.state;
        return (
            
            <Grid container className={classes.formContainer}>
                <Grid item md></Grid>
                <Grid item md>
                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                    <form onSubmit={onSubmit}>

                        <TextField id="email" name="email" type="email" label="Email" 
                        className={classes.textField} 
                        value={email}
                        onChange={onChange}
                        helperText={errors.email}
                        error={errors.email ? true : false} fullWidth />
                        
                        <TextField id="password" name="password" type="password" label="Password" 
                        className={classes.textField} 
                        value={password}
                        onChange={onChange}
                        helperText={errors.password}
                        error={errors.password ? true : false} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" 
                        color="secondary"
                        disabled={loading}
                        className={classes.button}>
                            {loading ? <CircularProgress size={20} className={classes.spinner}/> : 'Login'}
                        </Button>

                        <small>Don't Have an account? <Link to='/register'>Register Now</Link></small>

                    </form>
                </Grid>
                <Grid item md></Grid>
            </Grid>
           
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
