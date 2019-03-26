import React, {Component} from 'react';

// Import custom components
import Home from '../../components/home';
import HomeHeader from '../../components/common/homeHeader';
import './home.style.css';

class HomeContainer extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<React.Fragment>
				<HomeHeader />
				<div className="home__container">
					<Home />
				</div>
			</React.Fragment>
		);
	}

}

export default HomeContainer;
