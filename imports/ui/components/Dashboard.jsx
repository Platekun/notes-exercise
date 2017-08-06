import React, { Component } from 'react';
import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import { createContainer } from 'meteor/react-meteor-data';

const Dashboard = props =>
  <div>
    <PrivateHeader title="Dashboard" history={props.history} />
    <NoteEditor history={props.history} />
    <div className="wrapper">
      <NoteList />
    </div>
  </div>;

export default Dashboard;
