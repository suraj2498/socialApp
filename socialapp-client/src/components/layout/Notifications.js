import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI Stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

function Notifications(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const { notifications, markNotificationsRead } = props;
    dayjs.extend(relativeTime);


    const handleOpen = (e) => {
        setAnchorEl(e.target);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onMenuOpened = () => {
        let unreadNotificationIds = notifications.filter((not) => !not.read).map(not => not.notificationId);
        markNotificationsRead(unreadNotificationIds);
    }

    let notificationIcon;
    if(notifications && notifications.length > 0){

        notifications.filter(not => not.read === false).length > 0 ? (
            notificationIcon = (<Badge badgeContent={notifications.filter(not => not.read === false).length}
                                color="secondary" style={{color: 'white'}}> <NotificationsIcon /> </Badge>)
        ) : (
            notificationIcon = <NotificationsIcon color="secondary"/>
        )
    }
    else {
        notificationIcon = <NotificationsIcon color="secondary"/>
    }

    let notificationsMarkup = notifications && notifications.length > 0 ? (
        notifications.map(not => {
            const verb = not.type === 'like' ? 'liked' : 'commented on';
            const time  = dayjs(not.createdAt).fromNow();
            const iconColor = not.read ? 'primary' : 'secondary';
            const icon = not.type === 'like' ? (
                <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
            ) : (
                <ChatIcon color={iconColor} style={{marginRight: 10}} />
            )

            return (
                <MenuItem key={not.createdAt} onClick={handleClose}>
                    {icon}
                    <Typography
                        component={Link}
                        color={iconColor}
                        variant="body1"
                        to={`/users/${not.recipient}/post/${not.postId}`}>
                            {not.sender} {verb} your Post {time}
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            You Have No New Notifications
        </MenuItem>
    )

    return (
        <Fragment>
            <Tooltip placement="right" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                           aria-haspopup="true"
                           onClick={handleOpen}>
                               
                               {notificationIcon}

                </IconButton> 
            </Tooltip>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onEntered={onMenuOpened}>
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
