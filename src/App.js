import React, { Component } from 'react';
import axios from 'axios'
import qs from 'query-string'

import SearchBar from './searchBar'
import SearchResult from './searchResult'
import NavButton from './navButton'
import PlayerModal from './player/playerModal'

import spinner from './spinner.svg'
import './App.css';
import etherscanImg from './etherscan-logo.png'


class App extends Component {

  constructor (props) {
    super()
    this.state = { 
      searchResults: [],
      searchValue: "",
      isLoading: false,
      showPlayer: false
    }
  }

  componentWillMount () {
    const { search, page } = qs.parse(this.props.location.search)
    if (search && page) {
      this.search(search, page)
    }
    else if (search && !page) {
      this.search(search)
    }
    else if (!search && page) {
      this.search("", page)
    }
    else {
      this.search()
    }
  }


  search (searchValue = "", page = 0) {
    let currentPath = this.props.history.location.pathname
    if (searchValue) {
      this.props.history.push(`${currentPath}?search=${searchValue}&page=${page}`)
    }
    else if (page > 0) {
      this.props.history.push(`${currentPath}?page=${page}`)
    }
    else if (searchValue === "" && page === 0) {
      this.props.history.push(currentPath)
    }
    this.setState(prevState => Object.assign(prevState, { searchValue, isLoading: true }), async () => {
      try {
        const results = await axios.get(`https://6otsqko1ue.execute-api.eu-west-3.amazonaws.com/Production?query=${this.state.searchValue}&page=${page}`)
        this.setState(prevState => Object.assign(prevState, { searchResults: results.data, isLoading: false }))
      }
      catch (e) {
        this.setState(prevState => Object.assign(prevState, { isLoading: false, error: e.toString() }))
      }
    })
  }

  onResultClick (data) {
    this.setState(prevState => Object.assign(prevState, { showPlayer: true, playerData: data }))
  }

  onClosePlayer () {
    this.setState(prevState => Object.assign(prevState, { showPlayer: false }))
  }

  goHome () {
    this.search('', 0)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" onClick={this.goHome.bind(this)}>Smart Contract Browser</h1>
          <span style={{ marginLeft: "10px", marginRight: "10px", fontSize: "0.8em" }}>built with</span>
          <a href="http://etherscan.io" target="_blank">
            <img src={etherscanImg} style={{ height: "20px" }} alt="Etherscan logo" />
          </a>
        </header>
        <div style={{ marginTop: "100px" }}>
            <SearchBar onSubmit={this.search.bind(this)} />
            { this.state.isLoading && 
              <img src={spinner} style={{ width: "100px", position: "absolute", left: "calc(50% - 100px)", "top": "calc(50% - 100px)" }}/>
            }
          </div>
        { !this.state.isLoading &&  this.state.searchResults &&
          <section className="App-results--container">
            <div style={{ position: "fixed", top: "50%", left: "5%", display: "flex", justifyContent: "space-between", width: "5%"}}>
              { this.state.searchResults.pagination && this.state.searchResults.pagination.first &&
                <NavButton icon="first" onClick={() => this.search(this.state.searchValue, this.state.searchResults.pagination.first) } />
              }
              { this.state.searchResults.pagination && this.state.searchResults.pagination.prev &&
                <NavButton icon="prev" onClick={() => this.search(this.state.searchValue, this.state.searchResults.pagination.prev) } />
              }
            </div>
            { this.state.searchResults.data && this.state.searchResults.data.length === 0 && 
              <h3>No contracts found</h3>
            }
            { this.state.searchResults.data && this.state.searchResults.data.map((result, index) => (
              <SearchResult 
                data={result} key={index} 
                onClick={this.onResultClick.bind(this) }/>
            ))}
            <div style={{ position: "fixed", top: "50%", right: "5%", display: "flex", justifyContent: "space-between", width: "5%"}}>
              { this.state.searchResults.pagination && this.state.searchResults.pagination.next &&
                <NavButton icon="next" onClick={() => this.search(this.state.searchValue, this.state.searchResults.pagination.next) }/>
              }
              { this.state.searchResults.pagination && this.state.searchResults.pagination.last &&
                <NavButton icon="last" onClick={() => this.search(this.state.searchValue, this.state.searchResults.pagination.last) } />
              }
            </div>
          </section>
        }
        { !this.state.isLoading && this.state.error && 
          <p style={{ color: "orangered" }}>{this.state.error}</p>
        }
        <PlayerModal 
          show={this.state.showPlayer} 
          onClose={this.onClosePlayer.bind(this)}
          data={this.state.playerData} />
        
      </div>
    );
  }
}

export default App;
