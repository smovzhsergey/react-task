//Core
import React from 'react';

//Instruments
import Styles from '../../styles.less';
import { number, string } from 'prop-types';
import format from 'date-fns/format';

const Repo = ({ pos, name, html_url, description, created_at, language, stargazers_count, forks_count, open_issues_count, updated_at}) => {

	const created = format(created_at, 'DD.MM.YYYY');		
	const updated = format(updated_at, 'DD.MM.YYYY');
	const languagePrint = language === '' ? null : <span className = 'language'>{ language }</span>;

	return (
		<div className = 'repo'>
			<div>
				<a href = { html_url } data-position = { pos } target = '_blank'>{ name }</a>	
				<div className = 'repoStats'>								
					<span className = 'stars'>{ stargazers_count }</span>
					<span className = 'forks'>{ forks_count }</span>
					<span className = 'issues'>{ open_issues_count }</span>
					{ languagePrint }
				</div>
			</div>
			<p>{ description }</p>
			<p> Created: <strong>{ created }</strong> Updated: <strong>{ updated }</strong> </p>							
		</div>		
	);
}

Repo.propTypes = {
	created_at:        string.isRequired,
	description: 	   string.isRequired,
	forks_count: 	   number.isRequired,
	html_url:          string.isRequired,
	language: 		   string.isRequired,	
	name:              string.isRequired,
	open_issues_count: number.isRequired,
	pos:               number.isRequired,	
	stargazers_count:  number.isRequired,
	updated_at: 	   string.isRequired
}

export default Repo;