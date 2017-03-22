import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: 'signup',
			showSignInUp: '',
			email: '',
			password: '',
			confirm: ''
		};
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentDidMount(){
		console.log(this.props.loginState);
	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signup(e) {
		e.preventDefault();
		if (this.state.password === this.state.confirm){
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((userData) => {
					console.log('user');
					alert(userData);
					// if(userData.code ===){}
				}).catch((err) => {
					alert(err.message);
				})
		}else{
			alert('passwords dont match');
		}
	}
	login(e) {
		e.preventDefault();
		firebase.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((userData) => {
		}).catch((err) => {
			alert(err.message);
		});
		console.log(this.props.loginState)
	}
	logout(e){
		e.preventDefault();
		firebase.auth().signOut();
	}
	render() {
		let loginForm = '';
		let loginOptions = '';
		let user = firebase.auth().currentUser;
		if (user){
			loginOptions = (
				<form onSubmit={this.logout} className="user-form">
					{/* display username */}
					<button>Log Out</button>
				</form>
			);
		}else{
			loginOptions = (
				<nav id="loginNav">
					<ul>
						<li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
						<li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
					</ul>
				</nav>
			);
		}
		if (user){
			this.state.formToShow = "logout";
			if(this.state.formToShow === "logout") {
			}
		}else{
			if(this.state.formToShow === 'signup') {
				loginForm = (
					<form onSubmit={this.signup} className="user-form">
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" onChange={this.handleChange} required />
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" onChange={this.handleChange} required />
						<label htmlFor="confirm">Confirm Password:</label>
						<input type="password" name="confirm" onChange={this.handleChange} required />
						<button className="loginButton">Sign Up</button>
					</form>
				);
			}
			else if(this.state.formToShow === "login") {
				loginForm = (
					<form onSubmit={this.login} className="user-form">
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" onChange={this.handleChange}/>
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" onChange={this.handleChange}/>
						<button className="loginButton">Log In</button>
					</form>
				);
			}
		}
		return (
			<div id="loginContainer">
				{loginOptions}
				{loginForm}
			</div>
		)
	}
}
