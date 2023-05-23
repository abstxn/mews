import React from 'react'
import Feed from './Feed'

export default function CombinedFeed({ feeds }) {
  return (
    feeds.map((feed, index) => 
        <Feed key={index} feed={feed} />
    )
  )
}
