import React from 'react'

function Book({value, handleChange}) {
    const {id, imageLinks, shelf, title, authors} = value

    return (
        <li key={id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => handleChange(value, event.target.value)} value={shelf} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{Array.isArray(authors)?authors.join(', '):''}</div>
            </div>
        </li>
    )
}

export default Book