import React, {Component} from 'react';
import HomeHeader from '../common/homeHeader';
import Locations from '../locations';

const Home = (props) => {
  return (
    <div>
      <HomeHeader />
      <main>
          <Locations />
      </main>
    </div>
  )
}

export default Home;
