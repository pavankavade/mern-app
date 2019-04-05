import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
//import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from "../../actions/profileActions";
//import PostSearch from './PostSearch'
import PostItem from './PostItem';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',

    };
    this.onChange = this.onChange.bind(this);

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.search);
  }



  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentProfile();

  }

  render() {
    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;

    let postContent;
    let postform;
    let searchItem = (this.state.search).toLowerCase();

    if (profile !== null) {
      postform = (
        (!profile.isWorker ? <PostForm /> : null
        )
      );
    }

    if (posts !== null) {
      postContent = (
        posts.map(post => {
          if ((post.text).toLowerCase().includes(searchItem)) {
            return <PostItem key={post._id} post={post} />
          }
        }
        )
      );
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {postform}
              <h3>Search for a Job</h3>
              <TextAreaFieldGroup
                placeholder="Search for job post"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
              />
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