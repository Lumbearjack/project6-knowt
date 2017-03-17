import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
console.log(browserHistory);

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
			notes: []
		}
		this.addNote = this.addNote.bind(this);
	}
	componentDidMount() {
		const dbRef = firebase.database().ref();
			dbRef.on("value", (data) => {
				const dataBaseData = data.val();
				const itemArray = [];

				for(let itemKey in dataBaseData){
					const fooKey = dataBaseData[itemKey]
					fooKey.key = itemKey;

					itemArray.push(fooKey);
				}
					console.log(itemArray);
					this.setState({
						items: itemArray
				})
			});
	}
	addNote(e) {
		e.preventDefault();
		const noteItem = {
			item: this.state.item,
			name: this.state.name
		};
		const dbRef = firebase.database().ref();
		dbRef.push(foodItem);

	}
	render(){
		return (
			<div id="wrapper">
				<main id="mainBlock">
				<header>
					<h1><a href="">knowt</a></h1>
					<Link to={`/newnote`}>
						<button>+</button>
					</Link>
				</header>
				<section>
					<div id="newNote">
						<input type="text" placeholder="Note Title" />
						<textarea name="" id="" cols="30" rows="10" placeholder="Write your note."></textarea>
						<Link to={'/'}>
							<button>Done</button>
						</Link>
					</div>
					<div id="noteGrid">
						<div id="noteGridItem">
							<h3>Note Title</h3>
							<p>This is the description of the note content, or if no description exists then it is a preview on the content itself.</p>
						</div>
					</div>
				</section>
				</main>
				<aside id="sideBlock">
					<p>add stuff here</p>
				</aside>
			</div>
		)
	}

}
// ReactDOM.render(<App />, document.getElementById('app'));


ReactDOM.render(
<Router history={browserHistory}>
	<Route path="/" component={App} />
</Router>, document.getElementById('app'));
