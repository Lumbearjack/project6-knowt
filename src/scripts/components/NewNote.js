import React from 'react';

export default class NewNote extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return(
			<form id="newNote" onSubmit={this.addNote}>
				<input name="newTitle" type="text" placeholder="Note Title" ref={ref => this.newTitle = ref} onChange={this.handleChange} autoComplete="off" required/>
				<textarea name="newContent" ref={ref => this.newContent = ref} id="" cols="30" rows="5" placeholder="Write your note." onChange={this.handleChange} autoComplete="off"></textarea>
				<input type="submit"/>
			</form>
		)
	}
}
