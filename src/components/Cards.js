import React, { Component } from 'react';
import json from '../contacts.json';
import ShowHideDialog from './ShowHideDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


class Cards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            data: { id: null, name: '' },
        }
    }


    componentDidMount() {
        this.setState({ contacts: json.contacts }, () => {
            this.state.contacts.map(contact => {
                this.getLocation(contact.id)
            })
        })
    }

    getLocation(id) {
        let contacts = this.state.contacts
        let contact = contacts.find(c => c.id == id)

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${contact.address}&key=AIzaSyBoAjmIZ_tE0NXWp0J1fpNOVy5KWh8WJi0`)
            .then((res) => res.json())
            .then((res) => {
                contact.lat = res.results[0].geometry.location.lat
                contact.lng = res.results[0].geometry.location.lng
                this.setState({ contacts: contacts })
            })
    }

    addContact = (e) => {
        let contacts = this.state.contacts
        let ids = contacts.map(c => c.id)
        ids.sort((a, b) => a - b)
        let pos = Math.floor(Math.random() * ids.length)
        let contact = contacts.find(c => c.id == ids[pos])
        let clone = Object.assign({}, contact)
        clone.id = ids[ids.length - 1] + 1
        contacts.push(clone)
        this.setState({ contacts: contacts })
    }

    openModal(e) {
        let id = e.currentTarget.attributes.id.value
        let contact = Object.assign({}, this.state.contacts.find(i => i.id == id))
        this.setState({ data: contact })
    }

    delete(e) {
        let id = e.currentTarget.attributes.id.value
        let contacts = this.state.contacts.filter(c => c.id != id)
        this.setState({ contacts: contacts })
    }

    handleSave(data) {
        let contacts = this.state.contacts
        let contact = contacts.find(c => c.id == data.id)
        console.log(contact)
        contact.name = data.name
        this.setState({ contacts: contacts })

    }


    render() {
        var contactsRend = this.state.contacts.map(contact => {
            return <div key={contact.id} className="card">
                <img className="card-img-top" src={require(`../images/${contact.src}`)} alt="" />
                <div className="card-body">
                    <h4 className="card-title">{contact.name}</h4>
                    <p className="card-text">
                        {"Latitude: " + contact.lat + " | " + "Longtitude: " + contact.lng}
                    </p>
                    <div className="buttonsWrapper">
                        <button id={contact.id} data-toggle="modal" data-target="#modalEdit" onClick={this.openModal.bind(this)} className="btn" type="button"><FontAwesomeIcon className="editBtn" icon={faEdit} /></button>
                        <button id={contact.id} className="btn" onClick={this.delete} type="button" onClick={this.delete.bind(this)}><FontAwesomeIcon className="deleteBtn" icon={faTrash} /></button>
                    </div>
                </div>
            </div>
        })

        return (

            <div>
                <ShowHideDialog data={this.state.data} onSave={this.handleSave.bind(this)} />
                <div className="row">
                    {contactsRend}
                </div>
                <div className="iconDiv">
                    <FontAwesomeIcon className="plus-icon" type="button" onClick={this.addContact} icon={faPlusCircle} />
                </div>
            </div>
        )
    }

}



export default Cards;


