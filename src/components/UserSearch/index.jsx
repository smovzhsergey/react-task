//Core
import React, { Component } from 'react';

//Instruments
import Styles from '../../styles.less';
import { func } from 'prop-types';

export default class UserSearch extends Component {
	static propTypes = {
		getUserName: func.isRequired
	}

	constructor () {
		super ();

		this.handleSubmitForm = this._handleSubmitForm.bind(this);
		this.clearWarnStyle = this._clearWarnStyle.bind(this);		
	}

	_clearWarnStyle (event) {		
		const input = document.querySelector('.userName');

		if (event.type === 'focus') 
			input.classList.remove('warn');

		if(event.type === 'change' && input.value.length === 1)	
			input.classList.remove('warn');		
	}
	
	_handleSubmitForm (event) {
		const input = document.querySelector('.userName');
		const val = input.value.toLowerCase()
		event.preventDefault();			

		if (val) {
			this.props.getUserName(val);					
		} else {
			input.classList.add('warn');
		}
	}

	render () {
		return (
			<form className = 'userSearch'>
				<input
					type = 'text'
					className = 'userName'
					placeholder = 'Username'
					onFocus = { this.clearWarnStyle } 
					onChange = { this.clearWarnStyle }
				/>
				<input
					type = 'submit'
					value = 'Search'
					onClick = { this.handleSubmitForm }
				/>
			</form>
		)		
	}
}