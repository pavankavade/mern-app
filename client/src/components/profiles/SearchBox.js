import React from 'react'
function SearchBox(props) {
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

export default SearchBox;