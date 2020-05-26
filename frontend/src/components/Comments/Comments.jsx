import React, { useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addCommentAC } from '../../redux/action-creator';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  btnUpload: {
    marginTop: '10px',
    padding: '5px 25px',
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#FAA916',
    color: '#FBFFFE',
    '&:hover': {
      backgroundColor: '#96031A',
      color: '#FAA916',
    },
  },
}));

const Comments = (props) => {
  const classes = useStyles();
  const [newComment, setNewComment] = React.useState(
    { textComment: '' },
  );

  const changeInputHandler = (e) => {
    const textComment = e.target.value;
    setNewComment({
      ...newComment,
      textComment,
    })
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    const userId = props.user._id;
    const { challengeId } = props;
    const textComment = newComment.textComment;
    newComment.textComment = '';
    const response = await fetch(`/challenges/newComment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, textComment, challengeId })
    });
    const result = await response.json();
    props.updateComments(result.comment, challengeId);
  }
  
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Challenger" src={props.state.user.avatar} />
        </ListItemAvatar>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleNewCommentSubmit}>
          <TextField id="textComment" name="textComment" label="Add Comment" fullWidth onChange={changeInputHandler} value={newComment.textComment} />
          <Button type="submit" className={classes.btnUpload}>
            Add
          </Button>
        </form>
      </ListItem>

      {
        !props.comments.length
          ? null
          : props.comments.slice(0).reverse().map(el => {
            return (
              <ListItem key={el._id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt='avatar' src={el.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={el.user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {el.text}
                      </Typography>
                      {`   / ` + el.date}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          })
      }

    </List>
  )
}

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => ({
  updateComments: (comment, challengeId) => dispatch(addCommentAC(comment, challengeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);


// <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Ali Connors" src="" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Ali Connors"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 — I'll be in your neighborhood doing errands this…
//               </Typography>
//               {" 11/05/2020 "}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
