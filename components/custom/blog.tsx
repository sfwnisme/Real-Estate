import React from 'react'
import BlogCard from './blogCard'
import { articleDummyData } from '@/data/dummyData'
import Title from './title'

type Props = {}

export default function Blog({ }: Props) {
    return (
        <div className='responsive'>
            <Title type='with_button' title='Discover insights, trends, and inspiration.' description="Explore a handpicked collection of stunning homes that reflect timeless design, innovative architecture, and unparalleled luxury." url='#' />
            <div className='h-16' />
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {articleDummyData.map((article) => (<BlogCard article={article} key={article.id}/>))}
            </div>
        </div>
    )
}