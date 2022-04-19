/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';


class HeightUpdater extends Component {
	constructor(props){
		super(props);

		this.onWindowResize = this.onWindowResize.bind(this);
	}

	onWindowResize(){
		const height = window.innerHeight;
		if(height !== this.props.height){
			this.props.onHeightChange(height);
		}
	}

	componentDidMount(){
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.onWindowResize);
	}

	render(){
		return null;
	}
}

HeightUpdater.propTypes = {
	height: PropTypes.number,
	onHeightChange: PropTypes.func
};

export default HeightUpdater;
