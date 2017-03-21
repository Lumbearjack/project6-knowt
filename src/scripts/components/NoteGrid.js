import React from 'react';

// Clicking each NoteGridItem should open the note

function NoteGridItem(props){
	// {console.log(props.data)}
	return(
		<div className="noteGridItem--container">
			<div className="noteGridItem">
				<h3>{props.data.title}</h3>
				<p><div className="pOverlay"></div>{props.data.content}</p>
				<div className="noteActions">
					<button className="actionEditNote" onClick={() => props.editNote(props.data)} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
					<button className="actionRemoveNote" onClick={() => props.removeNote(props.data)} ><i className="fa fa-trash" aria-hidden="true"></i></button>

				</div>
			</div>
		</div>
	)
}

export default class NoteGrid extends React.Component{
	constructor(){
		super();
		this.state = {
			notes: []
		}
	}
	render(){
		return(
			<div id="noteGrid">
				{this.props.notes.map((note, i) => {
					return <NoteGridItem tabIndex={i} data={note} removeNote={this.props.removeNote} editNote={this.props.editNote} key={note.key}/>
				})}
			</div>
		)
	}
}