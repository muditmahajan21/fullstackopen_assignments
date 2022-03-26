import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let testBlog = {
    title:'React patterns',
    author:'Michael Chan',
    url:'https:',
    likes:7
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={testBlog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'React patterns - Michael Chan'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const component = render(
      <Blog blog={testBlog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https:'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )
  })

  test('clicking the like button twice makes two calls', () => {
    const component = render(
      <Blog blog={testBlog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})