import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chapter from "./Chapter";
import {useParams} from "react-router-dom";

// 1nd Method : using a function

export default function ChapterList(props) {
    // const book = useParams();
    const [error, setError] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [book, setBook] = useState(useParams());
    console.log('ChapterList book.id : ',book)


    // Similaire à componentDidMount et componentDidUpdate :
    useEffect(() => {
        console.log('ChapterList useEffect ')
        axiosPostChapters();
    }, [useParams()]);

    function axiosPostChapters(){
        console.log('ChapterList axiosPostChapters ')
        const url = 'https://api-dev.lelivrescolaire.fr/graphql'
        const data = "query=" +
            "{\n" +
            "   viewer{\n" +
            "       books(ids:" + book.id + "){\n" +
            "           hits{\n" +
            "                id\n" +
            "               title\n" +
            "           }" +
            "       }," +
            "       chapters( bookIds:" + book.id + "){\n" +
            "           hits{\n" +
            "               id\n" +
            "               title\n" +
            "               lessons{\n" +
            "                   id\n" +
            "                   title\n" +
            "                   page\n" +
            "               }\n" +
            "           }\n" +
            "       }\n" +
            "   }\n" +
            "}"

        const request = {
            url: url,
            method: 'post',
            data: data,
            headers: {'Accept': 'application/json'}
        }
        console.log('ChapterList axiosPostChapters request : ', request)

        axios(request).then(res => {
            console.log('ChapterList result axios : ',res.data.data.viewer.chapters.hits)
            setChapters(res.data.data.viewer.chapters.hits)
            setError(null)
            setBook(res.data.data.viewer.books.hits[0])
        }).catch(e => {
            console.log('Error axios : ', request, '\n', e.toString());
            setChapters([]);
            setError(null);
        }).finally(() =>
                // console.log(this.state.items,Object(this.state.items).values())

                console.log('ChapterList get chapters: ', chapters )
            )
        ;
    }


    return (
        <div id="chapters" className="container-fluid m-0 p-0">
            {error && <p className="alert alert-danger">{error}</p>
            ||
            (chapters.length === 0
                && <p className="alert alert-warning">
                    Ce livre contient une list vide de chapitres.
                </p>
                ||
                (
                    <div>
                        <h3>{book.title}</h3>
                        <p>{chapters.length} Chapitre{chapters.length > 1 ? 's' : ''} au total dans ce livre</p>

                        <div className='row m-0 p-0'>
                            {chapters.map(chapter =>
                                (
                                    <Chapter book={book} chapter={chapter} key={book.id}/>
                                )
                            )}
                        </div>
                    </div>
                )
            )
            }
        </div>
    );
}



