import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { send } from 'q';

const useExpStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

function SimpleExpansionPanel ( {data, deleteTest} : { data: Array<Object>, deleteTest: any } ) {
  const classes = useExpStyles();
  
  return (
    <div className={classes.root}>
     {data.map((item : any) => (
        <ExpansionPanel key={item._id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{item.body}</Typography>
            <Button onClick={() => deleteTest(item._id)} color="inherit">X</Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

const useTextStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function TextFields({ sendTest } : { sendTest : any }) {
  const classes = useTextStyles();
  const [values, setValues] = React.useState({
    title: '',
    body: '',
  });

  const handleChange = ( name : any ) => ( event : any ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="title"
        label="Title"
        className={classes.textField}
        value={values.title}
        onChange={handleChange('title')}
        margin="normal"
      />
      <TextField
         id="body"
         label="Body"
         className={classes.textField}
         value={values.body}
         onChange={handleChange('body')}
         margin="normal"
      />
      <Button onClick={() => sendTest(values)} >Submit</Button>
    </form>
  );
}

const OtherPage = () => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(setData : any) {
    const results = await axios(
      'http://localhost:8080/api/test/all',
    );
    setIsLoading(false);
    setData(results);
  }

  async function sendTest(data : any) {
    const results = await axios({
      method: 'post',
      url: 'http://localhost:8080/api/test/new',
      data: data
    });
  }

  async function deleteTest(_id : any) {
    const results = await axios({
      method: 'delete',
      url: 'http://localhost:8080/api/test/delete',
      data: {_id}
    });
    const newData = { data: data.data.filter((item : any) => item._id !== _id) };
    setData(newData)
  }


  useEffect(() => {
    fetchData(setData);
  }, []);

  return(
    <div>
      {
        isLoading ?
        <span>
          Loading!
        </span> :
        <div>
          <h1>Other</h1>
          <SimpleExpansionPanel data={data.data} deleteTest={deleteTest} />
          <TextFields sendTest={sendTest}/>
        </div>
      }
    </div>
  )
}

export default OtherPage
