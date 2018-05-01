import React from 'react'
import ReactModal from 'react-modal';
import PlayerForm from './playerForm'


export default class PlayerModal extends React.Component {

    render () {
        return (
            <ReactModal 
                isOpen={this.props.show}
                style={{ overlay: { background: "rgba(0,0,0,0.5)" }, content: { margin: "auto", padding: 0, width: "60%", border: "none", background: "#f5f5f5" } }}
                onRequestClose={this.props.onClose}
                ariaHideApp={false}>
                <PlayerForm data={this.props.data}/>
            </ReactModal>
        )
    }
}