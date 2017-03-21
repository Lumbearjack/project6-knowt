import React from 'react';

class NewNote extends React.Component{
	constructor(){
		super();
		this.state = {
			newTitle: "",
			newContent: ""
		}
		this.addNote = this.addNote.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	addNote(e) {
		e.preventDefault();
		const noteItem = {
			title: this.newTitle.value,
			content: this.newContent.value
		};
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/notes`);
		dbRef.push(noteItem);
		this.newTitle.value="";
		this.newContent.value="";
		this.props.router.push('/')
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render(){
		return(
			<form id="newNote" onSubmit={this.addNote}>
				<input name="newTitle" type="text" placeholder="Note Title" ref={ref => this.newTitle = ref} onChange={this.handleChange} autoComplete="off" required autoFocus/>
				<div className="inputContainer">
					<div className="pOverlayWrite">
						<textarea name="newContent" ref={ref => this.newContent = ref} id=""  placeholder="Write your note." onChange={this.handleChange} autoComplete="off"></textarea>
					</div>
				</div>
				<input type="submit"/>
			</form>
		)
	}
}

export default NewNote