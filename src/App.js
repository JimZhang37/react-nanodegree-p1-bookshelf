import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Books from './Books'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(it => {
            this.setState({ books: it })
        })
    }


    changeCategory = (book, category) => {
        this.setState((state) => {
            if (state.books.some(it => it.id===book.id)){
                return {books: state.books.map(it => (it.id ===book.id)?{...it, shelf:category}:it)}
            }
            else{
                book.shelf = category
                return {books: state.books.concat([book])}
            }
        }
        
        )
        BooksAPI.update(book, category)
        
    }
    render() {
        // console.log('reander from app.js', this.state.books)
        return (
            
            <div className="app">
                
                <Route exact path='/' render={() => (<Books books={this.state.books} changeCategory={this.changeCategory} />)} />
                <Route exact path='/Search' render={() => (<Search booksaved={this.state.books} changeCategory={this.changeCategory} />)} />
            </div>
        )
    }
}

export default BooksApp
