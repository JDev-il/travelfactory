import React, { Component } from 'react'
import Cards from './Cards'

class Assets extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <div className="assetsDashboard">
                <div className="assetsHeader">
                    <h1>TravelFactory.fr</h1>
                </div>
                <Cards />
            </div>
        )
    }
}

export default Assets;