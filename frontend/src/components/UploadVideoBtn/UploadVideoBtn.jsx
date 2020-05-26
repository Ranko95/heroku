import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  StylesProvider,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from 'material-ui-dropzone';
import { fetchChallengeUploadAC } from '../../redux/action-creator';
import LoadingBar from '../LoadingBar/LoadingBar';

const useStyles = makeStyles((theme) => ({
  divUpload: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(469)]: {
      marginRight: 0,
    },
  },
  btnUpload: {
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#FAA916',
    color: '#FBFFFE',
    '&:hover': {
      backgroundColor: '#96031A',
      color: '#FAA916',
    },
  },
  btnUploadName: {
    [theme.breakpoints.down(469)]: {
      display: 'none',
    },
  },
  divUploadIcon: {
    [theme.breakpoints.down(469)]: {
      marginLeft: '10px',
    },
  },
  btnCancel: {
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: '#6D676E',
    color: '#FBFFFE',
    '&:hover': {
      backgroundColor: '#96031A',
      color: '#FBFFFE',
    },
  },
}));


const UploadVideoBtn = (props) => {
  const classes = useStyles();
  const [openUploader, setOpenUploader] = useState(false);
  const [video, setVideo] = useState(null);
  const [userInput, setUserInput] = useState({
    title: '',
    description: '',
    hashtags: '',
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleUploaderOpen = () => {
    setOpenUploader(true);
  };
  const handleUploaderClose = () => {
    setOpenUploader(false);
    setVideo(null);
  };

  const handleUploading = (file) => {
    setVideo(file);
  };

  const handleUploaderSubmit = () => {
    const { original } = props;
    const userId = props.state.user._id;
    let title = '';
    props.btnName === 'Upload challenge'
      ? (title = userInput.title)
      : (title = `Answer to ${props.challengeTitle}`);
    const description = userInput.description;
    const hashtags = userInput.hashtags;
    const vid = video[0];
    const data = new FormData();
    data.append('file', vid);
    props.fetchChallengeUpload(userId, title, description, hashtags, data, handleUploaderClose, original);
  };

  const renderUploader = (
    <Dialog
      open={openUploader}
      onClose={handleUploaderClose}
      aria-labelledby="form-dialog-title"
    >
      
      <DialogTitle>{props.formTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.formDescription}</DialogContentText>
        {props.btnName === 'Upload challenge' ? (
          <TextField
            autoFocus
            margin="dense"
            label="Challenge title"
            type="text"
            fullWidth
            id="title"
            name="title"
            required
            onChange={changeInputHandler}
          />
        ) : (
          <TextField
            margin="dense"
            label="Challenge title"
            type="text"
            fullWidth
            id="title"
            name="title"
            defaultValue={props.challengeTitle}
            disabled
          />
        )}
        <TextField
          margin="dense"
          label="Desciption"
          type="text"
          id="description"
          name="description"
          fullWidth
          required
          onChange={changeInputHandler}
        />
        <TextField
          margin="dense"
          label="Hashtags"
          type="text"
          id="hashtags"
          name="hashtags"
          onChange={changeInputHandler}
          fullWidth
        />
      </DialogContent>
      <DropzoneArea onChange={handleUploading} maxFileSize={15000000}  />
      <DialogActions>
      {
        props.state.loading
          ? <LoadingBar className={classes.loader}/>
          : null
      }
        <Button onClick={handleUploaderClose} className={classes.btnCancel}>
          Cancel
        </Button>
        <Button onClick={handleUploaderSubmit} className={classes.btnUpload}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.divUpload}>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon className={classes.divUploadIcon} />}
        className={classes.btnUpload}
        onClick={handleUploaderOpen}
      >
        <Typography className={classes.btnUploadName}>
          {props.btnName}
        </Typography>
      </Button>
      {renderUploader}
    </div>
  );
};

const mapStateToProps = (state) => ( { state } );
const mapDispatchToProps = (dispatch) => ({
  fetchChallengeUpload: (userId, title, description, hashtags, data, handleUploaderClose, original) => dispatch(fetchChallengeUploadAC(userId, title, description, hashtags, data, handleUploaderClose, original))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoBtn);
