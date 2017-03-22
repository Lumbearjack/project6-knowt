import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';

function AddNoteCard(props){
	let content = "";
	if (props.loginState){
		content = (
			<div className="noteGridItem animated fadeIn addNoteCard--Item" >
				<div className="contentWrapper addNoteCard--Container">
					<div className="addNoteCard--inner">
						<i className="fa fa-plus" aria-hidden="true"></i>
					</div>
				</div>
			</div>
		)
	}
	return(
		<div className="noteGridItem--container addNoteCard--Wrapper">
			{content}
		</div>
	)
}
function NoteGridItem(props){
	return(
		<div className="noteGridItem--container">
			<div className="noteGridItem animated fadeIn" >
				<div className="noteActions">
					<button className="actionEditNote" onClick={() => props.editNote(props.data)} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
					<button className="actionRemoveNote" onClick={() => props.removeNote(props.data)} ><i className="fa fa-trash" aria-hidden="true"></i></button>
				</div>
				<div className="contentWrapper">
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
				<Link  className="AddNoteLink" to="/newnote" > 
					<AddNoteCard loginState={this.props.loginState} key="AddNoteCardKey" />
				</Link>
			</div>
		)
	}
}