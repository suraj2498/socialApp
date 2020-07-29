import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';  
import PropTypes from 'prop-types';

// Components
import Post from '../components/post/Post';
import { Container } from '@material-ui/core';
import Profile from '../components/profile/Profile'

class home extends Component {

    async componentDidMount(){
        try {
            this.props.getPosts();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        
        const { posts, loading } = this.props.data;

        let recentPostsMarkup = !loading ? (posts.map(post => <Post id="post" key={post.postId} post={post}/> )) : <p>Loading...</p>

        return (
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item md={8} xs={12}>
                        {recentPostsMarkup}
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data  
})

export default connect(mapStateToProps, { getPosts })(home);
