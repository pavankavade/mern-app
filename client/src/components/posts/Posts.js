import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';
import { getCurrentProfile } from "../../actions/profileActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();

  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    let postform;
    const { profile } = this.props.profile;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    if (profile !== null) {
      postform = (
        (!profile.isWorker ? <PostForm /> : null
        )
      );
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {postform}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile

});



export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);