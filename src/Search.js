import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Book from './Book'
import { DebounceInput } from 'react-debounce-input';
class BookSearch extends Component {
    state = {
        books: [],
        query: ''
    }

    // change = (q) => {
    //     console.log('query:', q)
    //     BooksAPI.search(q).then((it) => {
    //         if (it instanceof Array) {
    //             it.map((a) => { a.shelf = 'none'; return a })
    //             this.setState(() => ({
    //                 books: it
    //             }))
    //         }
    //         else {
    //             this.setState(() => ({
    //                 books: []
    //             }))
    //         }
    //     })
    // }

    componentDidUpdate(prevProps, prevState) {
        console.log('prev',prevState, 'now', this.state.query)
        if (prevState.query !== this.state.query) {
            console.log('query api called')
            BooksAPI.search(this.state.query).then((it) => {
                if (it instanceof Array) {
                    it.map((a) => { a.shelf = 'none'; return a })
                    this.setState(() => ({
                        books: it
                    }))
                }
                else{
                    console.log('api return a invalid')
                    this.setState(() => ({
                        books: []
                    }))
                }
            })

        }
    }
    render() {
        const { booksaved, changeCategory } = this.props
        const booksUpdated = (this.state.books.length > 0)
            ? this.state.books.map((searchedBook) => {
                booksaved.map((savedBook) => {
                    if (searchedBook.id === savedBook.id) {
                        searchedBook.shelf = savedBook.shelf
                    }
                    return savedBook
                })
                return searchedBook
            })
            : this.state.books
        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            placeholder="Search by title or author"
                            autoFocus={true}
                            minLength={1}
                            value={this.state.query}
                            debounceTimeout={300}
                            onChange={event => this.setState({ query: event.target.value })} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksUpdated.map(book => (
                            <li key={book.id}>
                                <Book value={book} handleChange={changeCategory} />
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
    changeCategory: PropTypes.func.isRequired,
}