import React, { Component } from 'react'

class ShowHideDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: props.data,
            onSave: props.onSave
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ data: this.props.data, onSave: this.props.onSave })
        }
    }

    handleChange(e) {
        e.preventDefault()

        let data = this.state.data
        data[e.target.name] = e.target.value
        this.setState({ data: data })
    }

    handleSave(e) {
        this.state.onSave(this.state.data)
    }

    render() {
        return (
            <div className="modal fade" id="modalEdit" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change Contact's Name</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="form-group mt-2">
                                    <input type="text" className="form-control" name="name" value={this.state.data.name} placeholder="Edit Name" onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary saveDialog" data-dismiss="modal" onClick={this.handleSave.bind(this)}>Save</button>
                            <button type="button" className="btn btn-secondary closeDialog" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default ShowHideDialog