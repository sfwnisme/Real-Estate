import CreateBlogPostFormView from '@/features/blog-posts/views/mutation-views/create-blog-post-form-view'
import React from 'react'

/**
 * Renders a container div that hosts the CreateBlogPostFormView component.
 *
 * @returns A JSX element containing a div with the CreateBlogPostFormView component.
 */
export default function page() {
  return (
    <div>
      <CreateBlogPostFormView />
    </div>
  )
}