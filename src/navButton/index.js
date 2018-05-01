import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/fontawesome-free-solid'

import './navButton.css'


export default class NavButton extends React.Component {
    render () {
        return (
            <div className="navButton" style={this.props.style} onClick={this.props.onClick} title={this.props.icon}>
                { this.props.icon === "first" && 
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                }
                { this.props.icon === "prev" && 
                 <FontAwesomeIcon icon={faAngleLeft} />
                }
                { this.props.icon === "next" && 
                 <FontAwesomeIcon icon={faAngleRight} />
                }
                { this.props.icon === "last" && 
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                }
            </div>
        )
    }
}

NavButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}