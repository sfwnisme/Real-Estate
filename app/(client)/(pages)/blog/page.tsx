import BlogCard from '@/components/custom/blogCard'
import Title from '@/components/custom/title'
import { articleDummyData } from '@/data/dummyData'
import React from 'react'

export default function page() {
  return (
    <div>
      <Title type='start' title='Discover insights, trends, and inspiration.' description='Explore a handpicked collection of stunning homes that reflect timeless design, innovative architecture, and unparalleled luxury.' />
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {articleDummyData.map((article) => <BlogCard article={article} key={article.id}/>)}
        {articleDummyData.map((article) => <BlogCard article={article} key={article.id}/>)}
        {articleDummyData.map((article) => <BlogCard article={article} key={article.id}/>)}
      </div>
    </div>
  )
}
