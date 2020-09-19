import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Book from "./Book";

// 1nd Method : using a function

export default function BookListUpload(props) {
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);


    // Similaire à componentDidMount et componentDidUpdate :
    useEffect(() => {
        axiosPostBooks();
    }, [props.levelIds]);

    function axiosPostBooks(){

        const url = 'https://api-dev.lelivrescolaire.fr/graphql'

        const levelIds = props.levelIds.length ? ', levelIds:[' + props.levelIds + ']' : ''
        // console.log('props.levels : ', this.props.levels, '\tlevels.length', this.props.levels.length, '\tlevelIds', levelIds)
        const data = "query=" +
            "{\n" +
            "   viewer{\n" +
            "       books( isValid:true" + levelIds + "){\n" +
            "           hits{\n" +
            "               id\n" +
            "               title\n" +
            "               price\n" +
            "               subjects{\n" +
            "                   id\n" +
            "                   name\n" +
            "               }\n" +
            "               levels{" +
            "                   id" +
            "                   name" +
            "               }" +
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
        console.log('request : ', request)

        axios(request).then(res => {
            //console.log('result axios : ',res.data.data.viewer.books.hits)
            setBooks(res.data.data.viewer.books.hits)
            setError(null)
        }).catch(e => {
            console.log('Error axios : ', request, '\n', e.toString());
            setBooks([]);
            setError(null);
        })
        ;
    }
// .finally(() =>
//     // console.log(this.state.items,Object(this.state.items).values())
//
//     console.log('get items: ', this.state.items)
// )


    return (
        <div id="books" className="container-fluid m-0 p-0">
            {error && <p className="alert alert-danger">{error}</p>
            ||
            (books.length === 0 && <p className="alert alert-warning">La liste des livres est vide</p>
                ||
                (
                    <div>
                        <p>{books.length} livre{books.length > 1 ? 's' : ''} au total</p>

                        <div className='row m-0 p-0'>
                            {books.map(book =>
                                (
                                    <Book book={book} key={book.id}/>
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

// 2nd Method : using a class

// class BookListUpload extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             books: [],
//             error: null
//         }
//         // Cette liaison est nécéssaire afin de permettre
//         // l'utilisation de `this` dans la fonction de rappel.
//         this.axiosPostBooks = this.axiosPostBooks.bind(this);
//
//     }
//
//
//     componentDidMount() {
//         console.log('BookListUpload componentDidMount levelIds : ', this.props.levelIds);
//         this.axiosPostBooks()
//     }
//     componentDidUpdate(prevProps) {
//         if (prevProps.levelIds !== this.props.levelIds) {
//             console.log('BookListUpload componentDidUpdate levelIds : ', this.props.levelIds);
//             this.axiosPostBooks()
//         }
//     }
//
//     axiosPostBooks() {
//
//         const url = 'https://api-dev.lelivrescolaire.fr/graphql'
//
//         const levelIds = this.props.levelIds.length ? ', levelIds:[' + this.props.levelIds + ']' : ''
//         // console.log('props.levels : ', this.props.levels, '\tlevels.length', this.props.levels.length, '\tlevelIds', levelIds)
//         const data = "query=" +
//             "{\n" +
//             "   viewer{\n" +
//             "       books( isValid:true" + levelIds + "){\n" +
//             "           hits{\n" +
//             "               id\n" +
//             "               title\n" +
//             "               price\n" +
//             "               subjects{\n" +
//             "                   id\n" +
//             "                   name\n" +
//             "               }\n" +
//             "               levels{" +
//             "                   id" +
//             "                   name" +
//             "               }" +
//             "           }\n" +
//             "       }\n" +
//             "   }\n" +
//             "}"
//
//         const request = {
//             url: url,
//             method: 'post',
//             data: data,
//             headers: {'Accept': 'application/json'}
//         }
//         console.log('request : ', request)
//
//         axios(request).then(res => {
//             //console.log('result axios : ',res.data.data.viewer.books.hits)
//             this.setState(
//                 state => ({
//                     books: res.data.data.viewer.books.hits,
//                     error: null
//                 })
//             )
//         }).catch(e => {
//             console.log('Error axios : ', request, '\n', e.toString())
//             this.setState(
//                 state => ({
//                     books: [],
//                     error: e.toString()
//                 })
//             )
//
//
//         })
//         // .finally(() =>
//         //     // console.log(this.state.items,Object(this.state.items).values())
//         //
//         //     console.log('get items: ', this.state.items)
//         // )
//     }
//
//
//     render() {
//         return (
//             <div id="books" className="container-fluid m-0 p-0">
//                 {this.state.error && <p className="alert alert-danger">{this.state.error}</p>
//                 ||
//                 (this.state.books.length === 0 && <p className="alert alert-warning">La liste des livres est vide</p>
//                     ||
//                     (
//                         <div>
//                             <p>{this.state.books.length} livre{this.state.books.length > 1 ? 's' : ''} au total</p>
//
//                             <div  className='row m-0 p-0'>
//                                 {this.state.books.map(book =>
//                                     (
//                                         <Book book={book} key={book.id}/>
//                                     )
//                                 )}
//                             </div>
//                         </div>
//                     )
//                 )
//                 }
//             </div>
//         )
//     }
// }
//
// export default BookListUpload;

