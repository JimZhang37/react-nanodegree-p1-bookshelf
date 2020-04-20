import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'


class BookSearch extends Component {
    state = {

        books: []
    }

    change = (q) => {
        BooksAPI.search(q).then((it) => {
            if(it instanceof Array){
                console.log(it.map(a=>a.shelf))
                this.setState(() => ({
                    books: it
                }))
            }
            else{
                this.setState(() => ({
                    books: []
                }))
            }
        })
    }

    changeCategory = (book, category)=>{
        BooksAPI.update(book, category).then()
    }
    render() {

        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) =>
                                this.change(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:''})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => this.changeCategory(book, event.target.value)} value={book.shelf} defaultValue="none">
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

            </div>
        )
    }


}

export default BookSearch