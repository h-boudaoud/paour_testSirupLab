import {useParams} from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import BookListUpload from "./BookListUpload"

export default function BookList(props) {

    let {school, level} = useParams();
    const levelIds = school
        ? props.levels[school]
            .filter(item => level && item.name !== level ? null : item).map(item => item.id)
        : Object.values(props.levels).flatMap(s => s.map(l => l.id))
    ;
    console.log('BookList levelIds : ', levelIds);

    return (
        <Container fluid>
            <h2>{school} <span style={{color: '#282c34', fontSize: '.7em'}}>
                    {level ? 'Classe de ' + level : 'Tous les niveaux'}
                </span>
            </h2>

            <BookListUpload levelIds={levelIds}/>
        </Container>
    );
}
