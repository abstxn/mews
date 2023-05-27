import React from 'react'

export default function FeedSelection({ activeFeeds, handleChange }) {

  return (
    <div className="col-lg-3">
      <div className="list-group">
        <label className='d-flex justify-content-between list-group-item list-group-item-action'>
          ChannelNewsAsia - Latest News
          <input type="checkbox" defaultChecked={activeFeeds[0]} onChange={handleChange(0)} />
        </label>
        <label className='d-flex justify-content-between list-group-item list-group-item-action'>
          New York Times - World
          <input type="checkbox" defaultChecked={activeFeeds[1]} onChange={handleChange(1)} />
        </label>
        <label className='d-flex justify-content-between list-group-item list-group-item-action'>
          The Guardian - International
          <input type="checkbox" defaultChecked={activeFeeds[2]} onChange={handleChange(2)} />
        </label>
        <label className='d-flex justify-content-between list-group-item list-group-item-action'>
          Reddit's Front Page
          <input type="checkbox" defaultChecked={activeFeeds[3]} onChange={handleChange(3)} />
        </label>
      </div>
    </div>
  )
}
