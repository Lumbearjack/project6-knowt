/* To-Do:

- Make notes in grid openable for reading and editing
- Notes save in user-specific trees

*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import Header from './components/Header';
import NoteGrid from './components/NoteGrid';
import NewNote from './components/NewNote';

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
	}
	componentDidMount() {
		const dbRef = firebase.database().ref();
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				// console.log(user);
				dbRef.on("value", (data) => {
					const dataBaseData = data.val();
					const itemArray = [];
					for(let itemKey in dataBaseData){
						const noteKey = dataBaseData[itemKey]
						noteKey.key = itemKey;
						itemArray.push(noteKey);
					}
						// console.log(itemArray);
						this.setState({
							notes: itemArray
					})
				});
			}
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	removeNote(itemToRemove){
		const dbRef = firebase.database().ref(itemToRemove.key);
		dbRef.remove()
	}
	editNote(note){
		console.log(note);
		let editTitle = note.title;
		let editContent = note.content;
		let editKey = note.key;
		console.log(editKey, ":",editTitle, editContent);
	}
	render(){
		return (
			<div id="wrapper">
				<main id="mainBlock">
				<header>
					<Link to={"/"} className="knowtHeader"> <h1 >knowt</h1> </Link>
					<Link to={"/newnote"} ><button>New Note</button></Link>
				</header>
				<section>
					{this.props.children || <NoteGrid notes={this.state.notes} removeNote={this.removeNote} editNote={this.editNote}/>}
				</section>
				</main>
				<aside id="sideBlock">
					<Header loginState={this.state.loggedin}/>
					<p>add stuff here</p>
				</aside>
			</div>
		)
	}
}
ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="/newnote" component={NewNote} />
	</Route>
</Router>, document.getElementById('app'));
