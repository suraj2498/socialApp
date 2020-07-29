import React from 'react';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

function LikeButton(props) {

    const { postId, user: { likes, authenticated } } = props;

    const likedPost = () => {
        if (likes  && likes.find((like) => like.postId === postId))
            return true;
         else return false;
    }

    const likePost = () => {
        props.likePost(postId);
    }

    const unlikePost = () => {
        props.unlikePost(postId);
    }

    return (
    authenticated ? (
            likedPost() ? (
                <MyButton tip="Unlike" onClick={unlikePost}>
                    <Favorite color="secondary" /> 
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={likePost}>
                    <FavoriteBorder color="secondary" />
                </MyButton>
            )
        ) : (
            <Link to='/login'>
                <MyButton tip="Like">    
                        <FavoriteBorder color="secondary" />
                </MyButton>
            </Link>
        )
    )
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { likePost, unlikePost })(LikeButton)
