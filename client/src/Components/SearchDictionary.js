import React, { useState, useEffect, memo } from "react";


import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import { Fab } from "@material-ui/core";

import { Add } from "@material-ui/icons";

import Button from "@material-ui/core/Button";

import * as dictActions from "../redux/actions/actionDic";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import { Grid, TextField, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles((theme) => ({
  modal: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "100%",
  },
}));

const Dictionary = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({
    heading: "",
    shortDefinitions: [],
    pronunciations: [],
    examples: [],
  });

  const [title, settitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [postData, setPostData] = useState("");
  const [newWord, setNewWord] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const allData = useSelector((state) => state.dictionaryData.allData);

  const handleClose = () => {
    setOpenDialog(false);
    setNewWord("");
  };
  const fetchAllData = async () => {
    try {
      await dispatch(dictActions.fetchAll());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [searchMode]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(dictActions.postData({ title: newWord }));
    } catch (err) {
      console.log(err);
      alert(" Oops,  Invalid Word or api call issue..!! Please try again");
    } finally {
      setOpenDialog(false);
      setNewWord("");
    }
  };
  const handleInput = (e) => {
    setNewWord(e.target.value);
  };
  const wordSearch = async (e) => {
    try {
      await dispatch(dictActions.fetchSearchData(e.target.value));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchIconClick = () => {
    setSearchMode(true);
  };
  const handleCloseIconClick = () => {
    setSearchMode(false);
  };

  const handleCardClick = (data) => {
    console.log("dddddd", data);
    setOpen(true);
    setModalData({
      ...modalData,
      heading: data.word,
      shortDefinitions: data.shortDefinitions,
      pronunciations: data.pronunciations,
      examples: data.examples,
    });
  };

  return (
    <>
      <Grid container style={{ backgroundColor: "purple", lineHeight: 4 }}>
        {searchMode ? (
          <>
            <Grid
              item
              xs={10}
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              <TextField
                id="standard-basic"
                placeholder="search"
                textColor='white'
                // aria-placeholder='hi'
                
                style={{ display: "flex", flexGrow: 1, color: "white" }}
                onChange={wordSearch}
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleCloseIconClick}>
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              xs={10}
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              <div style={{ marginTop: -10 }}>
                <h8 style={{ color: "white" }}>Vocab</h8>
              </div>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleSearchIconClick}>
                <SearchIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="baseline"
                  >
                    <Grid item xs={1}>
                      <IconButton onClick={handleCloseModal}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <h1 id="transition-modal-title">{modalData.heading}</h1>

                      <h4>shortDefinitions</h4>
                      <p id="transition-modal-description">
                        {modalData.shortDefinitions[0]}
                      </p>
                      <br />

                      <h4>pronunciations</h4>
                      <p id="transition-modal-description">
                        audioFile:
                        {modalData.pronunciations.length > 0
                          ? modalData.pronunciations[0].audioFile
                          : ""}
                      </p>
                      <p id="transition-modal-description">
                        phoneticNotation:
                        {modalData.pronunciations.length > 0
                          ? modalData.pronunciations[0].phoneticNotation
                          : ""}
                      </p>
                      <p id="transition-modal-description">
                        phoneticSpelling:
                        {modalData.pronunciations.length > 0
                          ? modalData.pronunciations[0].phoneticSpelling
                          : ""}
                      </p>
                      <p id="transition-modal-description">
                        dialects:
                        {modalData.pronunciations.length > 0
                          ? modalData.pronunciations[0].dialects[0]
                          : ""}
                      </p>

                      <br />

                      <h4>examples</h4>
                      <ol>
                        {modalData.examples &&
                          modalData.examples.map((item, index) => {
                            return (
                              <li key={index}>
                                <p>{item.text}</p>
                              </li>
                            );
                          })}
                      </ol>
                    </Grid>
                  </Grid>
                </div>
              </Fade>
            </Modal>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent style={{ borderRadius: "2rem" }}>
              {allData &&
                allData.map((data) => {
                  return (
                    <div onClick={() => handleCardClick(data)}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {data.word}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {data.definition}
                        </Typography>
                      </CardContent>
                    </div>
                  );
                })}

              <Fab
                className=""
                color="primary"
                aria-label="add"
                onClick={() => setOpenDialog(true)}
                style={{
                  position: "fixed",

                  bottom: 0,
                  right: 0,
                  zIndex: "3000",

                  overflow: "auto",
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Add />
              </Fab>
              <Dialog
                open={openDialog}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
              >
                <DialogTitle>Add to Dictionary</DialogTitle>
                <DialogContent dividers>
                  <TextField
                    id="standard-basic"
                    label="Please input"
                    onChange={handleInput}
                    value={newWord}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>

                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Dictionary);
