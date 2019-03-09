import React, {Component} from 'react';

// Import custom components
import Home from '../../components/home';
import HomeHeader from '../../components/common/homeHeader';


class HomeContainer extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<React.Fragment>
				<HomeHeader />
				<div style={{ paddingTop: 100 }}>
					<Home />
				</div>
			</React.Fragment>
		);
	}

}

export default HomeContainer;
