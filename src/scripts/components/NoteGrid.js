import React from 'react';

// Clicking each NoteGridItem should open the note

function NoteGridItem(props){
	{console.log(props.data)}
	return(
		<div className="noteGridItem--container">
			<div className="noteGridItem">
				<h3>{props.data.title}</h3>
				<p><div className="pOverlay"></div>{props.data.content}</p>
				<div className="noteActions">
					<button onClick={() => props.removeNote(props.data)} ><i class="fa fa-trash" aria-hidden="true"></i></button>
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
				{this.props.notes.map((note) => {
					return <NoteGridItem data={note} removeNote={this.props.removeNote} key={note.key}/>
				})}
			</div>
		)
	}
}