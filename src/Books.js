import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class Books extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(it => {
            this.setState({ books: it })
        })
    }
    changeCategory = (book, category) => {
        BooksAPI.update(book, category).then(
            BooksAPI.getAll().then(it => {
                console.log("new newnew")
                this.setState({ books: it })
            }))
    }
    render() {
        return (

            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                        books={this.state.books.filter(book => book.shelf === "currentlyReading")} 
                        category="Currently Reading" 
                        fu={this.changeCategory}
                        />
                        <BookShelf 
                        books={this.state.books.filter(book => book.shelf === "wantToRead")} 
                        category="Want to Read"
                        fu={this.changeCategory} />
                        <BookShelf 
                        books={this.state.books.filter(book => book.shelf === "read")} 
                        category="Read"
                        fu={this.changeCategory} />
                    </div>
                </div>

                <Link to='/Search' className='open-search'>
                    <button>
                        Add a book
                    </button>
                </Link>
            </div>




        )
    }
}

export default Books