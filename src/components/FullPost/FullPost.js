import React, { Component } from 'react';
import Axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    };

    // setState() should be handled carefully or it may cause infinite update loop
    componentDidUpdate() {
        // If no post is being selected
        if (!this.props.id) {
            return;
        }
        // If the post has been loaded and the new selected post is the same as the current one
        if (this.state.loadedPost && this.state.loadedPost.id === this.props.id) {
            return;
        }
        Axios
            .get('/posts/' + this.props.id)
            .then(response => {
                this.setState({ loadedPost: response.data });
            });
    }

    render() {
        let post = null;
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }

    deletePostHandler = () => {
        Axios
            .delete('/posts/' + this.props.id)
            .then(response => {
                this.setState({ loadedPost: null });
                console.log(response);
                alert('Post deleted!');
            });
    };

}

export default FullPost;