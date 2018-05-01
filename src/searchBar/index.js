import React from 'react'
import PropTypes from 'prop-types'

import './searchBar.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default class SearchBar extends React.Component {

    constructor (props) {
        super(props)
        this.state = { value: "" }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleKeyPress (e) {
        if (e.key === "Enter") {
            this.props.onSubmit(this.state.value)
        }
    }

    onChange (value) {
        this.setState(prevState => Object.assign(prevState, { value }))
    }

    render() {
        return (
            <div className="searchBar--container">
                <div className="searchBar--input-container">
                    <div style={{ display: "flex" }}>
                        <FontAwesomeIcon icon={faSearch} />
                        <input 
                            ref={this.inputRef}
                            placeholder="Search contract" 
                            className="searchBar--input"
                            onKeyPress={this.handleKeyPress.bind(this)} 
                            onChange={(e) => this.onChange(e.currentTarget.value)}
                            value={this.state.value}
                            />
                        
                    </div>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
