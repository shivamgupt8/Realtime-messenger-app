import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AvatarMui from '@material-ui/core/Avatar';
import LanguageIcon from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';
import Avatar from 'react-avatar';
import { useGetConversations } from '../Services/chatService';
import { authenticationService } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: theme.palette.secondary.dark,
    },
    subheaderText: {
        color: theme.palette.secondary.dark,
    },
    list: {
        maxHeight: '80vh',
        overflowY: 'auto',
    },
}));

const Conversations = props => {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const [newConversation, setNewConversation] = useState(null);
    const getConversations = useGetConversations();

    // Returns the recipient name that does not
    // belong to the current user.
    const handleRecipient = recipients => {
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i].username !==
                authenticationService.currentUserValue.username
            ) {
                return recipients[i];
            }
        }
        return null;
    };

    useEffect(() => {
        getConversations().then(res => setConversations(res));
    }, [newConversation]);

    useEffect(() => {
        let socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('messages', data => setNewConversation(data));

        return () => {
            socket.removeListener('messages');
        };
    }, []);

    return (
        <List className={classes.list}>
            <ListItem
                classes={{ root: classes.subheader }}
                onClick={() => {
                    props.setScope('Global Chat');
                }}
            >
                <ListItemAvatar>
                    <AvatarMui className={classes.globe}>
                    <LanguageIcon />
                    </AvatarMui>
                </ListItemAvatar>
                <ListItemText
                    className={classes.subheaderText}
                    primary="Global Chat"
                />
            </ListItem>
            <Divider />

            {conversations && (
                <React.Fragment>
                    {conversations.map(c => (
                        <ListItem
                            className={classes.listItem}
                            key={c._id}
                            button
                            onClick={() => {
                                props.setUser(handleRecipient(c.recipientObj));
                                props.setScope(
                                    handleRecipient(c.recipientObj).name
                                );
                            }}
                        >
                            <ListItemAvatar>
                            <Avatar name={handleRecipient(c.recipientObj).name} size="40" round="20px" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={handleRecipient(c.recipientObj).username}
                                secondary={
                                    <React.Fragment>
                                        {c.lastMessage}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Conversations;
