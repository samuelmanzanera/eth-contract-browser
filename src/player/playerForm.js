import React from 'react'
import './playerForm.css'
import axios from 'axios'
import spinner from './spinner.svg'

import PlayerFormMember from './playerFormMember'

export default class Player extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            contractABI: [],
            isLoading: false
        }
    }

    componentDidMount () {
        this.getContractMembers(this.props.data.address)
    }

    getContractMembers (address) {
        this.setState({ isLoading: true }, async () => {
            const json = await axios.get(`http://api.etherscan.io/api?module=contract&action=getabi&address=${address}`)
            if (json.data.message !== "OK") {
                this.setState({ isLoading: false, error: json.data.message })
                return
            }
            const contractABI = JSON.parse(json.data.result)
            this.setState({ isLoading: false, contractABI })
        })
    }

    render () {
        return (
            <div className="player--container">
                <header className="player--header">
                    <h2 className="player--header-title">Contract player</h2>
                </header>
                <div className="player--body">
                    <header className="player--body--header">
                        <span>Contract: {this.props.data.name}</span>
                        <span>Address: &nbsp;
                            <a href={`https://etherscan.io/address/${this.props.data.address}`} target="_blank">{this.props.data.address}</a>
                        </span>
                    </header>
                    { this.state.isLoading &&
                        <div style={{ position: "absolute", left: "calc(50% - 200px)", top: "calc(50% - 50px)", textAlign: "center" }}>
                            <img src={spinner} style={{ width: "100px" }}/>
                            <p style={{ fontSize: "0.8em" }}>Fetching the smart contract metadata from the Blockchain...</p>
                        </div>
                    }
                    { !this.state.isLoading && this.state.contractABI.length > 0 && 
                        <div style={{ flex: 1, marginTop: "50px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                            { this.state.contractABI.filter(m => m.name).map((member, index) => (
                                <PlayerFormMember key={index} data={member} contractABI={this.state.contractABI} address={this.props.data.address} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        )
    }
}