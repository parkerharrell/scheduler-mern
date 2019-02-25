import React, {Component} from 'react';
import Header from '../common/header';
import Locations from '../locations';

const Dashboard = (props) => {
  return (
    <div>
      <Header />
      <main>
          <Locations />
      </main>
    </div>
  )
}

export default Dashboard;
