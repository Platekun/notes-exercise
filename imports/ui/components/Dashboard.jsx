import React, { Component } from 'react';
import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import { createContainer } from 'meteor/react-meteor-data';

const Dashboard = props =>
  <div>
    <PrivateHeader title="Notes" history={props.history} />
    <div className="wrapper">
      <div className="wrapper__sidebar">
        <NoteList />
      </div>
      <div className="wrapper__main">
        <NoteEditor history={props.history} />
      </div>
    </div>
  </div>;

export default Dashboard;
