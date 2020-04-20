import React, { Component } from 'react'

import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class Books extends Component {

    render() {
        const {changeCategory, books} = this.props
        return (

            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                        books={books.filter(book => book.shelf === "currentlyReading")} 
                        category="Currently Reading" 
                        fu={changeCategory}
                        />
                        <BookShelf 
                        books={books.filter(book => book.shelf === "wantToRead")} 
                        category="Want to Read"
                        fu={changeCategory} />
                        <BookShelf 
                        books={books.filter(book => book.shelf === "read")} 
                        category="Read"
                        fu={changeCategory} />
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