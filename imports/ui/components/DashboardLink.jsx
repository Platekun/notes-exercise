import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLink = props =>
  <Link {...props}>props.children</Link>;

export default DashboardLink;
