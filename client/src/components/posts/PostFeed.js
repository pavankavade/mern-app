import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Spinner from '../common/Spinner';
import PostSearch from './PostSearch'
class PostFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''

    };
  }
  onChange({ target: { search } }) {
    this.setState({ search: search });
  }

  handleInput = (e) => {
    this.setState({ search: e.target.value })
  }


  render() {

    const { posts } = this.props;
    let postItems;
    let searchItem = (this.state.search).toLowerCase();


    if (posts === null) {
      postItems = <Spinner />;
    } else {
      if (posts.length > 0) {
        postItems = posts.map(post => {
          if ((post.skillsr).toLowerCase().indexOf(searchItem)) {
            return <PostItem key={post._id} post={post} />
          }
        }
        );
      } else {
        postItems = <h4>No posts found...</h4>;
      }
    }

    return (

      <div className="container">
        <PostSearch handleInput={this.handleInput} />
        {postItems}
      </div>
    )
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};


export default PostFeed;