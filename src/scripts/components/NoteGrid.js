import React from 'react';

function NoteGridItem(props){
	return(
		<div className="noteGridItem--container">
			<div className="noteGridItem" >
				<div className="noteActions">
					<button className="actionEditNote" onClick={() => props.editNote(props.data)} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
					<button className="actionRemoveNote" onClick={() => props.removeNote(props.data)} ><i className="fa fa-trash" aria-hidden="true"></i></button>
				</div>
				<div className="contentWrapper" onClick={() => props.editNote(props.data)}>
					<h3>{props.data.title}</h3>
					<p><span className="pOverlay"></span>{props.data.content}</p>
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
				{/* new note card */}
			</div>
		)
	}
}