/* To-Do:

- Responsive design
- log in error codes

*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import Login from './components/Login';
import NoteGrid from './components/NoteGrid';
import NewNote from './components/NewNote';
import EditNote from './components/EditNote';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyD62rD9qHqtYlcVzKWg-gT7tUCtYSgskYw",
	authDomain: "knowt-32e2a.firebaseapp.com",
	databaseURL: "https://knowt-32e2a.firebaseio.com",
	storageBucket: "knowt-32e2a.appspot.com",
	messagingSenderId: "513066424031"
};
firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
				notes: [],
				loggedin:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.editNote = this.editNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				const dbRef = firebase.database().ref(`users/${user.uid}/notes`);
				dbRef.on("value", (data) => {
					const dataBaseData = data.val();
					const itemArray = [];
					for(let itemKey in dataBaseData){
						const noteKey = dataBaseData[itemKey]
						noteKey.key = itemKey;
						itemArray.push(noteKey);
					}
						this.setState({
							notes: itemArray,
							loggedin: true
					})
				});
			}
			else{
				this.setState({
					notes: [],
					loggedin: false
				})
			}
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	removeNote(itemToRemove){
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/notes/${itemToRemove.key}`)
		dbRef.remove();
		this.props.router.push(`/`);
	}
	editNote(note){
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/notes/${note.key}`)
		let editTitle = note.title;
		let editContent = note.content;
		let editKey = note.key;
		const editedItem = {
			title: note.title,
			content: note.content
		};
		this.props.router.push(`/${editKey}`);
	}
	render(){
		return (
			<div id="wrapper">
				<main id="mainBlock">
				<header>
					<Link to={"/"} className="knowtHeader"> <h1 >knowt</h1> </Link>
					<Login loginState={this.state.loggedin}/>
				</header>
				<section>
					{this.props.children || <NoteGrid notes={this.state.notes} removeNote={this.removeNote} editNote={this.editNote}/>}
				</section>
				</main>
				{/*<aside id="sideBlock">
					<p>add stuff here</p>
				</aside>*/}
			</div>
		)
	}
}
ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="/newnote" component={NewNote} />
		<Route path="/:editKey" component={EditNote}/>
	</Route>
</Router>, document.getElementById('app'));
