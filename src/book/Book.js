import React from "react";

export default function BookList(props) {
    return  <div key={props.book.id} className="book col-md-4 m-0 p-2">
        <h3>{props.book.title}</h3>
        <div className="m-0 p-2">
            prix : {props.book.price / 100}€
            <br/>Sujets :
            <ul>
                {props.book.subjects.map(
                    subject => (<li key={subject.id}>{subject.name}</li>)
                )}
            </ul>
            <br/>Niveau{props.book.levels.length>1?'x':''} : {props.book.levels.map(l => l.name).join(', ')}

        </div>

    </div>
}
