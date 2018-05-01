import React from 'react'
import Button from '../button'

import { Card, CardHeader, CardContent, CardFooter } from '../card'

export default class SearchResult extends React.Component {

    render () {
        return (
            <Card>
                <CardHeader 
                    title={this.props.data.name} 
                    subtitle={<a href={`https://etherscan.io/address/${this.props.data.address}`} target="_blank">{this.props.data.address}</a>} />
                <CardContent>
                    <p>Verification date: {this.props.data.verificationDate}</p>
                    <p>Balance: {this.props.data.balance}</p>
                    <p>Transaction count: { this.props.data.txCount}</p>
                    <p>Compiler: { this.props.data.compiler}</p>
                </CardContent>
                <CardFooter>
                    <Button text="Try it" onClick={() => this.props.onClick(this.props.data) }/>
                </CardFooter>
            </Card>
        )
    }
}