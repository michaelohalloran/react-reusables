import React, { Component } from 'react';
import axios from 'axios';
import './SearchForm.css';

//this component makes an AJAX call to load numerous posts
//the 2nd search button then filters results when clicked

 class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: '',
            searchResults: [],
            filteredResults: [],
            filtered: false,
        }
    }

    handleSearch = ()=> {
        //make AJAX call
        let url = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(url)
        //load results into state
            .then(res => res.data.slice(0,30))
            .then(data => {
                this.setState((prevState) => {
                    return {
                        searchResults: [...prevState.searchResults, ...data],
                        filteredResults: [],
                        filtered: false,
                    }
                });
            })
            .catch(err => console.log('Error: ', err));
    }

    handleSubmit = e => {
        e.preventDefault();
        let {term, searchResults} = this.state;
        const filteredResults = searchResults.filter(result => {
            return result.body.includes(term) || result.title.includes(term);
        });

        this.setState({
            term: '',
            filteredResults,
            filtered: !this.state.filtered,
        });
        
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

  render() {
    
    const {searchResults, filtered, filteredResults} = this.state;

    const filterDisplay = filteredResults.map(result => (
        <li className = "search-result" key={Math.random()}>
            <h3>{result.title}</h3>
            <p>{result.body}</p>
        </li>
        )
    );
    const resultsDisplay = searchResults.length ? (
        searchResults.map(post => (
            <li className = "search-result" key={Math.random()}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </li>
            )
        )
    ) : (
        <p>No results</p>
    );

    return (
      <div>
        <div className="search-container">
            <button onClick={this.handleSearch}>Search for all posts</button>
            <form onSubmit={this.handleSubmit}>
                <input 
                    className="search-container-input"
                    onChange={this.handleChange}
                    value={this.state.term}
                    name="term"
                    placeholder="Search"
                />
                <button className="search-container-btn">Search</button>
            </form>
        </div>
    
        <ul className="search-results-container">
            {filtered ? filterDisplay : resultsDisplay}
        </ul>

      </div>
    )
  }
}

export default SearchForm;