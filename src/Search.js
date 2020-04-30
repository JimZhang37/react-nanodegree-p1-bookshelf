import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class BookSearch extends Component {
    state = {
        books: []
    }

    change = (q) => {
        BooksAPI.search(q).then((it) => {
            if (it instanceof Array) {
                it.map((a) => { a.shelf = 'none'; return a })
                this.setState(() => ({
                    books: it
                }))
            }
            else {
                this.setState(() => ({
                    books: []
                }))
            }
        })
    }


    render() {
        const { booksaved, changeCategory } = this.props
        const booksUpdated = (this.state.books.length > 0)
            ? this.state.books.map((b1) => {
                booksaved.map((b2) => {
                    if (b1.id === b2.id) {
                        b1.shelf = b2.shelf
                    }
                })
                return b1
            })
            : this.state.books
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
                        {booksUpdated.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => changeCategory(book, event.target.value)} value={book.shelf} >
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

BookSearch.propTypes = {
    booksaved: PropTypes.array.isRequired, 
    changeCategory:PropTypes.func.isRequired,
}