import React from 'react'
import Button from '../button'

import './card.css'

export class Card extends React.Component {

    render () {
        return (
            <div className="card--container" >
                {this.props.children}
            </div>
        )
    }
}

export class CardContent extends React.Component {
    render () {
        return (
            <div className="card--body">
                {this.props.children}
            </div>
        )
    }
}

export class CardHeader extends React.Component {
    render () {
        return (
            <header className="card--header">
                <h3 className="card--header-title">{this.props.title}</h3>
                <h4 className="card--header-subtitle">{this.props.subtitle}</h4>
            </header>
        )
    }
}

export class CardFooter extends React.Component {
    render () {
        return (
            <div className="card--footer">
                {this.props.children}
            </div>
        )
    }
}