import React from "react";
import "./chapter.css"

export default function Chapter(props) {
    return (
        <div key={props.chapter.id} className="chapter col-md-4 m-0 p-2">
            <h3>{props.chapter.id} -> {props.chapter.title}</h3>
            <div className="m-0 p-2">
                <p>
                    <ul>lessons
                        {props.chapter.lessons.map(
                            lesson => (<li key={lesson.id}>(page {lesson.page}) - {lesson.title}</li>))
                        }</ul>
                </p>
            </div>
        </div>
    )
}
