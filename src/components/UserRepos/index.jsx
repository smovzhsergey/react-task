//Core
import React, { Component } from 'react';

//Instruments
import Styles from '../../styles.less';
import { array } from 'prop-types';

//Components
import Repo from '../Repo';

export default class UserRepos extends Component {

	static propTypes = {
		repos: array.isRequired,
	}

	render () {
		
		const { repos } = this.props;
		const reposList = repos.map((
			{
				created_at,
				description,
				forks_count,
				html_url,
				id,
				language,
				name,
				open_issues_count,
				stargazers_count,
				updated_at,
			}, index) =>
			(<Repo
				created_at = { created_at }
				description = { description !== null ? description : ''}
				forks_count = { forks_count }
				html_url = { html_url }
				key = { id }
				language = { language !== null ? language : '' }
				name = { name }
				open_issues_count = { open_issues_count }
				pos = { index + 1 }
				stargazers_count = { stargazers_count }
				updated_at = { updated_at }
			/>)
		);					

		return (
		!repos.length ?
			null :
			(<section className = 'repositories'>
				<h2>Repositories</h2>
				{reposList}				
			</section>)
		);	
	}		
}