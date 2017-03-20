import React from 'react';

export default class NoteGrid extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return(
			<div id="noteGrid">
				{this.state.notes.map((note) => {
					return <NoteGridItem data={note} removeNote={this.removeNote} key={note.key}/>
				})}
			</div>
		)
	}
}



