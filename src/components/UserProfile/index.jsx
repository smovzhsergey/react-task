//Core
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Instruments
import Styles from '../../styles.less';
import { object } from 'prop-types';
import format from 'date-fns/format';

export default class UserProfile extends Component {

	static propTypes = {
		user: object.isRequired,
	}

	render () {

		const {
			avatar_url,
			name,
			html_url,
			blog,
			location,
			public_repos,
			public_gists,
			created_at,
			updated_at
		} = this.props.user;

		const created = format(created_at, 'DD.MM.YYYY'); 
    	const updated = format(updated_at, 'DD.MM.YYYY');
    	const realLocation = location === null ? 'unknown' : location

		return (

			
			<section className = 'userProfile'>
				<div className = 'userData'>
					<div>
						<img src = { avatar_url } />
					</div>
					<div className = 'userInfo'>
						<p>
							<span>{ name }</span>
							<a href = { html_url }>Github</a>
							<a href = { blog }>Blog</a>							
						</p>
						<p className = 'location'>{ realLocation }</p>
						<table>
							<tbody>
								<tr>
									<td>Created:</td>
									<td><strong>{ created }</strong></td>
								</tr>
								<tr>
									<td>Updated:</td>
									<td><strong>{ updated }</strong></td>
								</tr>
							</tbody>
						</table>						
					</div>
				</div>
				<div className = 'userStats'>					
					<div className = 'column repos orange'>
						<span>{ public_repos }</span>
						<span>repos</span>
					</div> 
					<div className = 'column gists'>
						<span>{ public_gists }</span>
						<span>gists</span>
					</div>
				</div>
			</section>
		);	
	}	
}