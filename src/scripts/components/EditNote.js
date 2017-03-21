import React from 'react';

class EditNote extends React.Component{
	constructor(){
		super();
		this.state = {
			editTitle: "",
			editContent: ""
		}
		this.updateNote = this.updateNote.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.scrollText = this.scrollText.bind(this);
	}
	componentDidMount(){
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/notes/${this.props.params.editKey}`);
		let currentNote = "";
		dbRef.on("value", (result) => {
			currentNote = result.val();
			this.setState({
				editTitle: currentNote.title,
				editContent: currentNote.content
			}, this.scrollText)
		});
	}
	scrollText(){
			let textarea = document.getElementById('contentText');
			textarea.scrollTop = textarea.scrollHeight;
	}
	
	updateNote(e) {
		e.preventDefault();
		const userId = firebase.auth().currentUser.uid;
		const dbRef = firebase.database().ref(`users/${userId}/notes/${this.props.params.editKey}`);
		dbRef.update({
			title: this.editTitle.value,
			content: this.editContent.value
		});
		// console.log(this.state)
		this.props.router.push('/')
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render(){
		return(
			<form id="newNote" onSubmit={this.updateNote}>
				<input name="editTitle" type="text" placeholder="Note Title" ref={ref => this.editTitle = ref} onChange={this.handleChange} autoComplete="off" value={this.state.editTitle} required />
				<div className="inputContainer">
					<div className="pOverlayWrite">
						<textarea name="editContent" ref={ref => this.editContent = ref} id="contentText"  placeholder="Write your note." onChange={this.handleChange} value={this.state.editContent} autoComplete="off" autoFocus></textarea>
					</div>
				</div>
				<input type="submit" value="Save"/>
			</form>
		)
	}
}

export default EditNote