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
            if (state.books.map(it => it.id).includes(book.id)){
                return {books: state.books.map(it => {if(it.id ===book.id){it.shelf = category} return it})}
            }
            else{
                book.shelf = category
                return {books: state.books.push(book)}
            }
        }
        
        )
        BooksAPI.update(book, category)
        
    }
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (<Books books={this.state.books} changeCategory={this.changeCategory} />)} />
                <Route exact path='/Search' render={() => (<Search booksaved={this.state.books} changeCategory={this.changeCategory} />)} />
            </div>
        )
    }
}

export default BooksApp
