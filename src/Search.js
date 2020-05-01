import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Book from './Book'
import {DebounceInput} from 'react-debounce-input';
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
                        <DebounceInput
                            placeholder="Search by title or author"
                            minLength={2}
                            debounceTimeout={300}
                            onChange={event => this.change(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksUpdated.map(book => (
                            <Book value={book} handleChange={changeCategory} />
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
    changeCategory: PropTypes.func.isRequired,
}