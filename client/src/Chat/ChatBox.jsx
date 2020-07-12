import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import socketIOClient from 'socket.io-client';
import { deepOrange } from '@material-ui/core/colors';
import { authenticationService } from '../Services/authenticationService';

import {
    useGetGlobalMessages,
    useSendGlobalMessage,
    useGetConversationMessages,
    useSendConversationMessage,
} from '../Services/chatService';

const useStyles = makeStyles(theme => ({
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    root: {
        height: '100%',
    },
    headerRow: {
        maxHeight: 60,
        zIndex: 5,
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.palette.secondary.dark,
    },
    messageContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
      },
      
    messagesRow: {
        maxHeight: '70vh',
        overflowY: 'auto',
    },
    newMessageRow: {
        width: '100%',
        padding: theme.spacing(0, 2, 1),
    },
    inputRow: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    form: {
        width: '100%',
    },
    avatar: {
        margin: theme.spacing(1, 1.5),
    },
    listItem: {
        width: '80%',
    },
}));

const ChatBox = props => {
    const [currentUser] = useState(authenticationService.currentUserValue);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);

    const getGlobalMessages = useGetGlobalMessages();
    const sendGlobalMessage = useSendGlobalMessage();
    const getConversationMessages = useGetConversationMessages();
    const sendConversationMessage = useSendConversationMessage();

    let chatBottom = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        reloadMessages();
        scrollToBottom();
    }, [lastMessage, props.scope, props.conversationId]);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_URL);
        socket.on('messages', data => setLastMessage(data));
    }, []);

    const reloadMessages = () => {
        if (props.scope === 'Global Chat') {
            getGlobalMessages().then(res => {
                setMessages(res);
            });
        } else if (props.scope !== null && props.conversationId !== null) {
            getConversationMessages(props.user._id).then(res =>
                setMessages(res)
            );
        } else {
            setMessages([]);
        }
    };

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = e => {
        e.preventDefault();
        if (props.scope === 'Global Chat') {
            sendGlobalMessage(newMessage).then(() => {
                setNewMessage('');
            });
        } else {
            sendConversationMessage(props.user._id, newMessage).then(res => {
                setNewMessage('');
            });
        }
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.headerRow}>
                <Paper className={classes.paper} square elevation={2}>
                    <Typography color="inherit" variant="h6">
                        {props.scope}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.messageContainer}>
                    <Grid item xs={12} className={classes.messagesRow}>
                        {messages && (
                            <List>
                                {messages.map(m => (
                                    <ListItem
                                        key={m._id}
                                        className={classes.listItem}
                                        alignItems="flex-start"
                                    >
                                        <ListItemAvatar
                                            className={classes.avatar}
                                        >
                                            <Avatar  src="data:image/png;base64,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" />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={m.fromObj[0].username}
                                            secondary={
                                                <React.Fragment>
                                                    {m.body}
                                                </React.Fragment>
                                        }   
                                        />
                                    </ListItem>
                                ))
                                }
                            </List>
                        )}
                        <div ref={chatBottom} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputRow}>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid
                                container
                                className={classes.newMessageRow}
                                alignItems="flex-end"
                            >
                                <Grid item xs={11}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        value={newMessage}
                                        onChange={e =>
                                            setNewMessage(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton type="submit">
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ChatBox;



