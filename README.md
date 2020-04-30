# MyReads: A Book Tracking App
This is the first project for React Nanodegree from Udacity. It's the froneend for a book tracking app. User of this app can put a book in the following three categories: Reading, want to read and read. The backend API is provided by Udacity, "https://reactnd-books-api.udacity.com". User is able to search new books that could be put into one of the three categories mentioned above.

# How to install
In the project folder, where package.json is located, please run `npm i`

# How to run
In the project folder, where package.json is located, please run `npm start`

# Ways to improve the codebase
Components, like Search, can be divided into smaller components. The Search can be composed of SearchBar and SearchResults. 

# Highlights
Functional programming can dramatically improve the readability of the code and reduce the size of code.

In App.js, changeCategory() was originally written in imperative style. 

```javascript
this.setState((state) => {
            if (state.books.map(it => it.id).includes(book.id)){
                return {books: state.books.map(it => {if(it.id ===book.id){it.shelf = category} return it})}
            }
            else{
                book.shelf = category
                return {books: state.books.push(book)}
            }
        }
```

But the updated code is better.
```javascript
this.setState((state) => {
            if (state.books.some(it => it.id===book.id)){
                return {books: state.books.map(it => (it.id ===book.id)?{...it, shelf:category}:it)}
            }
            else{
                book.shelf = category
                return {books: state.books.concat([book])}
            }
        }
```
A few useful functions are listed here:
map, filter, some, ternary operator, concat and spread operator