

import React from 'react'
import './playerForm.css'

import Button from '../button'
import { Card, CardHeader, CardFooter, CardContent } from '../card'

import Web3 from 'web3';

const BigNumber = require('bignumber.js')

let web3
if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

export default class PlayerFormMember extends React.Component {

    constructor (props) {
        super(props)
        this.state = { parameters: {} }
    }

    invoke () {

        const methodName = this.props.data.name
        const contract = web3.eth.contract(this.props.contractABI).at(this.props.address)
        const params = Object.values(this.state.parameters)

        contract[methodName](...params, { from: web3.eth.accounts[0] }, (err, result) => {
            if (err) {
                return alert(err)
            }

            this.setState(prevState => Object.assign(prevState, { 
                result: Array.isArray(result) 
                    ? result.map(x => this.parseResult(x)).join(', ') 
                    : this.parseResult(result)
            }))
        })
       
    }

    parseResult (result) {
        if (result instanceof BigNumber) {
            return result.toNumber()
        }
        else {
            return result.toString()
        }
    }

    handleParamInput(name, type, value) {

        let parameters = Object.assign({}, this.state.parameters)

        if (type.includes('uint')) {
            parameters[name] = new BigNumber(name)
        }
        else {
            parameters[name] = value;
        }

        this.setState(prevState => Object.assign(prevState, { parameters }))
    }

    render () {
        console.log(this.props.data)
        return (
            <div className="player--formElement">
                <Card>
                    <CardHeader title={this.props.data.name} subtitle={this.props.data.constant ? "Readonly" : "Writable"}/>
                    { this.props.data.inputs.length > 0 &&
                        <CardContent>
                            <p>Inputs</p>
                            { this.props.data.inputs.map((input, index) => (
                                <div key={index} className="player--body--input--container">
                                    <label>{input.name}</label>
                                    <input placeholder={input.type} onChange={(e) => this.handleParamInput(input.name, input.type, e.target.value) }/>
                                </div>
                            ))}
                            
                        </CardContent>
                    }
                    { this.props.data.outputs && this.props.data.outputs.length > 0 &&  
                        <CardContent>
                            <p>Outputs</p>
                            { this.props.data.outputs.map((output, index) => (
                                <span key={index}>{output.name ? output.name + ": " : ""} { output.type }</span>
                            )).reduce((prev, curr) => [prev, ', ', curr])
                            }
                        </CardContent>
                    }
                        
                    
                    <CardFooter>
                        <Button text="Invoke" onClick={this.invoke.bind(this)} />
                        { this.state.result && 
                            <div style={{ background: "#f5f5f5", padding: "20px", fontSize: "0.8em" }}>
                                <p>Result: </p>
                                <p>{ this.state.result }</p>
                            </div>
                        }
                    </CardFooter>
                </Card>
                
                
            </div>
        )
    }
}