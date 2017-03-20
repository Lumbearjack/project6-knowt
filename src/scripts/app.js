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

// class NewNote extends React.Component{
// 	constructor(){
// 		super();
// 		this.state = {

// 		}
// 	}
// 	render(){
// 		return(
// 			<form id="newNote" onSubmit={this.addNote}>
// 				<input name="newTitle" type="text" placeholder="Note Title" ref={ref => this.newTitle = ref} onChange={this.handleChange} autoComplete="off" required/>
// 				<textarea name="newContent" ref={ref => this.newContent = ref} id="" cols="30" rows="5" placeholder="Write your note." onChange={this.handleChange} autoComplete="off"></textarea>
// 				<input type="submit"/>
// 			</form>
// 		)
// 	}
// }

function NoteGridItem(props){
	return(
		<div className="noteGridItem--container">
			<div className="noteGridItem">
				<h3>{props.data.title}</h3>
				<p>{props.data.content}</p>
				<div className="noteActions">
					<button onClick={() => props.removeNote(props.data)} >X</button>
				</div>
				
			</div>
		</div>
	)
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
				notes: []
		}
		this.addNote = this.addNote.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		console.log('mounting');
		const dbRef = firebase.database().ref();
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				console.log(user);
				dbRef.on("value", (data) => {
					const dataBaseData = data.val();
					const itemArray = [];
					for(let itemKey in dataBaseData){
						const noteKey = dataBaseData[itemKey]
						noteKey.key = itemKey;
						itemArray.push(noteKey);
					}
						console.log(itemArray);
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
	addNote(e) {
		e.preventDefault();
		const noteItem = {
			title: this.newTitle.value,
			content: this.newContent.value
		};
		const dbRef = firebase.database().ref();
		dbRef.push(noteItem);
		this.newTitle.value="";
		this.newContent.value="";
	}
	removeNote(itemToRemove){
		const dbRef = firebase.database().ref(itemToRemove.key);
		dbRef.remove()
	}
	render(){
		return (
			<div id="wrapper">
				<main id="mainBlock">
				<header>
					<h1><a href="">knowt</a></h1>
					<Link to={"/newnote"} ><button>+</button></Link>
				</header>
				<section>
					{this.props.children}

				</section>
				</main>
				<aside id="sideBlock">
					<Header />

					<p>add stuff here</p>
				</aside>
			</div>
		)
	}
}
// ReactDOM.render(<App />, document.getElementById('app'));


ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={App}>
		<Route path="/newnote" component={NewNote} />
	</Route>
</Router>, document.getElementById('app'));
