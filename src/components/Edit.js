import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { store } from '../index.js';

export class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {redirect: false};
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleName(event) {
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: {...store.getState().editingRecipe.recipe,name: event.target.value},
            index: store.getState().editingRecipe.index
        });
    }

    handleDelete(event) {
        store.dispatch({
            type: 'DELETE_RECIPE',
            id: 0
        });
        this.clearEditing();
    }
    handleCancel(event) {
        this.clearEditing();
    }
    handleSave(event) {
        store.dispatch({
            type: 'EDIT_RECIPE',
            state: store.getState().editingRecipe.recipe,
            index: store.getState().editingRecipe.index
        });
        this.clearEditing();
    }
    clearEditing() {
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: null,
            index: -1
        });
        this.setState({redirect: true});
    }

    render() {
        console.log(this);
        if (this.state.redirect) {
            return <Redirect push to="/Gude-Foods/home" />;
        }

        if (store.getState().editingRecipe == null) {
            return (
                <p>
                    Sorry, looks like something went wrong. Please return to the <a href="http://DanTheManGude.github.io/Gude-Foods">homepage</a>.
                </p>
            )
        }

        return (
            <div>
                <p>
                    <strong>{store.getState().editingRecipe.recipe.name}</strong>—&nbsp;
                    {store.getState().editingRecipe.recipe.about.purpose} |&nbsp;
                    {store.getState().editingRecipe.recipe.about.time} |&nbsp;
                    {store.getState().editingRecipe.recipe.about.makes}
                </p>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label">Name: </label>
                        <input type="text" className="form-control" placeholder="Name" value={store.getState().editingRecipe.recipe.name} onChange={this.handleName}/>
                    </div>
                </form>

                <div className="flex-container">
                    <button className="btn btn-danger flex-element" data-toggle="modal" data-target="#DeleteModal">Delete</button>
                    <button type="button" onClick={this.handleCancel.bind(this)} className="btn btn-secondary flex-element">Cancel</button>
                    <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-success flex-element">Save</button>
                </div>

                <div className="modal fade" id="DeleteModal" role="dialog">
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Delete Recipe</h4>
                        <button type="button" className="close btn" data-dismiss="modal">&times;</button>
                      </div>
                      <div className="modal-body">
                        <p>
                            Are you sure you want to delete <strong>{store.getState().editingRecipe.name}</strong>?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <div className="flex-container">
                            <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger flex-element" data-dismiss="modal">Delete</button>
                            <button type="button" className="btn btn-secondary flex-element" data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
