import React from 'react'
function PostSearch(props) {
  return (
    <div>
      <form >
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search.."
            onChange={props.handleInput}
          />
        </div>

      </form>
    </div>
  )
}

export default PostSearch;