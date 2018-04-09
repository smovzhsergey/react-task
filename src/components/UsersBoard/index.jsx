//Core
import React, { Component } from 'react';

//Instruments
import Styles from '../../styles.less';

//Components
import UserSearch from '../UserSearch/';
import UserProfile from '../UserProfile/';
import UserRepos from '../UserRepos/';

export default class UsersBoard extends Component {

	constructor () {
		super ();
		this.getUser = this._getUser.bind(this);
		this.getUserName = this._getUserName.bind(this);
		this.getRepositories = this._getRepositories.bind(this);		

		this.state = {
			currentUserName: 'octocat',
	        user: 			 {},
	        loaded: 		 false,
	        repos:           []        
	    };
	}	

    componentDidMount () {  
    	this.getUser(this.state.currentUserName);    	
    }

    _getUserName (value) {

    	const { currentUserName } = this.state; 

    	if (value !== currentUserName && value !== undefined) {
    		this.setState({
    			currentUserName: value    			
    		});		

    		this.getUser(value)
    	}
    }

    _getUser (name) {

    	fetch ( `http://localhost:8080/users/${name}`, {
            method: 'GET'
        })
        .then (( result ) => {

            if (result.status !== 200) {
            	this.setState({
		        	user:   {},
		        	loaded: false,
		        	repos:  []
		        });
                throw new Error('User not found');
            }

            const currentUser = result.json();

            return currentUser;
        })
        .then (( currentUser ) => {
            	
        	this.setState({
	        	user:   currentUser,
	        	loaded: true
	        });

        	this.getRepositories(name);
        })       
        .catch (({ message }) => console.log( message ));    
    }

    _getRepositories (name) {
    	
    	fetch( `http://localhost:8080/users/${name}/repos`, {
            method: 'GET'
        })
        .then(( result ) => {

            if (result.status !== 200) {            	
                throw new Error(`Repositories ${name} not found`);
            }

            const userRepos = result.json();

            return userRepos;
        })
        .then(( userRepos ) => {
            	
        	this.setState({
	        	repos: [...userRepos]
	        });
        })
        .catch(({ message }) => console.log( message ));    
    }    

	render () {

		const { user, loaded, currentUserName, repos } = this.state;
		const renderProfile = !loaded ?
			<p className = 'notFound' >User not found</p> :
			<UserProfile user = { user }/>;

		return (
			<section className = 'page'>
				<header>
					<h1>Github user info</h1>
					<UserSearch getUserName = { this.getUserName }/>
				</header>
				{ renderProfile }
				<UserRepos repos = { repos } />
			</section>
		)
	}
}


