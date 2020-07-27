import React, { Component } from 'react';
import Axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    };

    // Side-effects go here, this function does not trigger re-render
    componentDidMount() {
        Axios
            .get('/posts')
            .then(response => {
                const posts = response.data
                    .slice(0, 4)
                    .map(post => ({
                        ...post,
                        author: 'Cyberproton'
                    }));
                this.setState({ posts: posts });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const posts = this.state.posts.map(post => 
            <Post key={post.id} 
                title={post.title} 
                author={post.author} 
                clicked={this.postSelectedHandler.bind(this, post.id)}
            />
        );
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId} 
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    postSelectedHandler = (postId) => {
        this.setState({ selectedPostId: postId });
    };

    postDeletedHandler = () => {
        this.setState({ selectedPostId: null })
    };

}

export default Blog;