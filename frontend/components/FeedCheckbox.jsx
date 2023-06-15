import React from "react"

export default function FeedCheckbox( {feedName, checked, onChange} ) {

  return (
    <label className='d-flex justify-content-between list-group-item list-group-item-action'>
      {feedName}
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  )
}