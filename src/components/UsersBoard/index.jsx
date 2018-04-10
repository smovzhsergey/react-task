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
		this.fetchingStart = this._fetchingStart.bind(this);
		this.fetchingStop = this._fetchingStop.bind(this);
		this.printUserInfo=this._printUserInfo.bind(this);

		this.state = {
			currentUserName: 'octocat',
			isFetching: 	 false,
	        loaded: 		 false,
	        repos:           [],
	        user: 			 {}
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

    	this.setState({
		    loaded: false
		});
    	fetch ( `http://localhost:8080/users/${name}`, {
            method: 'GET'
        })
        .then (( result ) => {

            if (result.status !== 200) {
            	this.setState({
		        	user:   {},
		        	loaded: true,
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

    	this.fetchingStart();
    	fetch( `http://localhost:8080/users/${name}/repos`, {
            method: 'GET'
        })
        .then(( result ) => {

            if (result.status !== 200) {            	
                throw new Error(`Repositories ${name} not found`);
                this.fetchingStop();
            }

            const userRepos = result.json();

            return userRepos;
        })
        .then(( userRepos ) => {
            	
        	this.setState({
	        	repos: [...userRepos]
	        });
	        this.fetchingStop();
        })
        .catch(({ message }) => console.log( message ));    
    }  

    _fetchingStart () {
    	this.setState({
    		isFetching: true
    	});
    }

    _fetchingStop () {
    	this.setState({
    		isFetching: false
    	});
    }  

    _printUserInfo () {
    	const { currentUserName, isFetching, loaded, repos, user } = this.state;
    	
		const renderProfile = !loaded ?
			null :
			currentUserName === 'octocat' || currentUserName === 'brendaneich' ? 				
				(<section>
					<UserProfile user = { user }/>
					<UserRepos isFetching = { isFetching } repos = { repos } />
				</section>) :
				<p className = 'notFound' >User not found</p>;		

		return renderProfile;					
    }

	render () {

		const print = this.printUserInfo();

		return (
			<section className = 'page'>
				<header>
					<h1>Github user info</h1>
					<UserSearch getUserName = { this.getUserName }/>
				</header>
				{ print }
			</section>
		)
	}
}


