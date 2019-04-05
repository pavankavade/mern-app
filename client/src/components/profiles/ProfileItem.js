import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const firstskill = profile.skills.trim().split(',')[0];
    const secondskill = profile.skills.trim().split(',')[1];
    const thirdskill = profile.skills.trim().split(',')[2];
    const fourthskill = profile.skills.trim().split(',')[3];

    // Skill List
    const skills = (

      <div className="p-3">
        <i className="fa fa-check" /> {firstskill}<br></br>
        <i className="fa fa-check" /> {secondskill}<br></br>
        <i className="fa fa-check" /> {thirdskill}<br></br>
        <i className="fa fa-check" /> {fourthskill}<br></br>

      </div>
    )
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>


          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">

              {skills}


            </ul>
          </div>
        </div>
      </div >
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
