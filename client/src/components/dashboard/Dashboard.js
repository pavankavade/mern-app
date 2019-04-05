import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "./../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import { deleteAccount } from "../../actions/profileActions";
import Experience from "./Experience";
import Education from "./Education";
import { getPosts } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
//import ShowMoreText from 'react-show-more-text';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getPosts();

    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { posts } = this.props.post;
    let matchedJobs;
    let dashboardContent;
    let edit;
    let exp, edu;
    let sk;
    let firstskill;
    let secondskill, thirdskill, fourthskill;
    // S
    if (profile !== null) {
      firstskill = profile.skills.toLowerCase().trim().split(',')[0];
      secondskill = profile.skills.toLowerCase().trim().split(',')[1];
      thirdskill = profile.skills.toLowerCase().trim().split(',')[2];
      fourthskill = profile.skills.toLowerCase().trim().split(',')[3];

    }
    //let sk = (profile.skills).toLowerCase();
    if (posts !== null) {
      matchedJobs = (
        posts.map(post => {
          if ((post.skillsr).toLowerCase().includes(firstskill)) {
            return <PostItem key={post._id} post={post} />

          }
          if ((post.skillsr).toLowerCase().includes(secondskill)) {
            return <PostItem key={post._id} post={post} />

          }
          if ((post.skillsr).toLowerCase().includes(thirdskill)) {
            return <PostItem key={post._id} post={post} />

          }
          if ((post.skillsr).toLowerCase().includes(fourthskill)) {
            return <PostItem key={post._id} post={post} />

          }
        }
        )
      );
    }


    if (profile !== null) {
      exp = (
        (!profile.isWorker ? null :
          <Experience experience={profile.experience} />
        )
      );
    }
    if (profile !== null) {
      edu = (
        (!profile.isWorker ? null :
          <Education education={profile.education} />
        )
      );
    }
    if (profile !== null) {
      edit = (
        (!profile.isWorker ? <Link to="/edit-company-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Company Profile
        </Link> : <ProfileActions />

        )
      )
    }

    if (profile === null || loading) {
      dashboardContent = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (

          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              {user.hello}
            </p>

            <div className="btn-group mb-4" role="group">

              {edit}
            </div>
            {exp}
            {edu}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name}
              {user.hello}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info mr-3 mb-3">
              Create Worker Profile
            </Link><Link to="/create-company-profile" className="btn btn-lg btn-info mb-3">
              Create Company Profile
            </Link>

          </div>
        );
      }
    }
    return (
      <div className="dashboard" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>

              {dashboardContent}
              <br></br>
              <h2>Matched Job Postings As Per Your Skills</h2>
              <div className="col-md-10">
                {matchedJobs}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,

  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, getCurrentProfile, deleteAccount }
)(Dashboard);
