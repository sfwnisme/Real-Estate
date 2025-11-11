import React from 'react'

type Props = {
  link: string;
}

export default function YoutubeVideoPlayer({link}: Props) {
  if(!link) {
    return null
  }
  return (
    <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden'>
      <iframe src={link} allowFullScreen width="100%" className="h-full w-full"/>
    </div>
  )
}