import React from 'react';


export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: 'login',
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
			// this.props.loginState = true;
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
				<nav id="loginNav">
					<button className="logout" onClick={this.logout}>Log Out</button>
				</nav>
			);
		}else if(this.state.formToShow === 'signup') {
			loginOptions = (
				<nav id="loginNav">
					<button className="login" onClick={this.formToShow}>Log In</button>
				</nav>
			);
		}else if(this.state.formToShow === 'login') {
			loginOptions = (
				<nav id="loginNav">
					<button className="signup" onClick={this.formToShow}>Sign Up</button>
				</nav>
			);
		}
		else{
			loginOptions = (
				<nav id="loginNav">
					<button className="signup" onClick={this.formToShow}>Sign Up</button>
					<button className="login" onClick={this.formToShow}>Log In</button>
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
						<input type="email" name="email" placeholder="email@domain.com" onChange={this.handleChange} required autoFocus/>
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" placeholder="password"onChange={this.handleChange} required />
						<label htmlFor="confirm">Confirm Password:</label>
						<input type="password" name="confirm" placeholder="confirm password"onChange={this.handleChange} required />
						<button className="loginButton">Sign Up</button>
					</form>
				);
			}
			else if(this.state.formToShow === "login") {
				loginForm = (
					<form onSubmit={this.login} className="user-form">
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" placeholder="example@email.com"onChange={this.handleChange} autoFocus/>
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
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
