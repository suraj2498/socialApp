import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getUserPageInfo } from '../redux/actions/dataActions';

function User (props) {

    const { getUserPageInfo, data: {posts, loading} } = props;

    const [profile, setProfile] = useState(null);
    const [postIdParam, setPostIdParam] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const handle = props.match.params.handle;
                getUserPageInfo(handle);
                const res = await axios.get(`/user/${handle}`);
                setProfile(res.data.user)
            } catch (err) {
                console.error(err);
            }
        }
        const postId = props.match.params.postId;
        if(postId) setPostIdParam(postId);
        getData();
    }, [ props.match.params.handle, props.match.params.postId, getUserPageInfo]);

    const postsMarkup = loading ? (
        <p>Loading</p>
    ) : (
        posts === null ? (
            <p>This user has made no posts yet</p>
        ) : (
            !postIdParam ? (
                posts.map((post) => <Post key={post.postId} post={post} />)
            ) : (
                posts.map(post => {
                    if(post.postId !== postIdParam)
                        return <Post key={post.postId} post={post} />
                    else 
                        return <Post key={post.postId} post={post} openDialog={true} />
                })
            )
        )
    )

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item md={4} xs={12}>
                    {profile === null ? ( <p>Loading...</p> ) : (<StaticProfile profile={profile}/>)}
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
});

User.propTypes = {
    getUserPageInfo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getUserPageInfo })(User);
