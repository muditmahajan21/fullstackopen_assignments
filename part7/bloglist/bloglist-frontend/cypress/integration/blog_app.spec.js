/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/')
    const user = {
      name: 'Mudit Mahajan',
      username: 'momo',
      password: 'momomomo',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in').click()

    cy.contains('Username')
    cy.contains('Password')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })

  it('login form can be opended', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('momo')
    cy.get('#password').type('momomomo')
    cy.get('#login-buton').click()

    cy.contains(' Mudit Mahajan logged in ')
  })

  it('login fails with wrong password', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('momo')
    cy.get('#password').type('momomomo21')
    cy.get('#login-buton').click()

    cy.contains('Wrong credentials')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('#username').type('momo')
      cy.get('#password').type('momomomo')
      cy.get('#login-buton').click()
    })

    it('a new blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.contains('create').click()
      cy.contains('test blog')
    })

    it('user can like a blog', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
    })

    it('user can delete a blog', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.contains('create').click()
      cy.contains('view').click()

      cy.contains('Delete').click()
      cy.get('html').should('not.contain', 'test blog')
    })
  })

  describe('Blogs are ordered by number of likes', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('#username').type('momo')
      cy.get('#password').type('momomomo')
      cy.get('#login-buton').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog1')
      cy.get('#author').type('test author1')
      cy.get('#url').type('test url1')

      cy.contains('create').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog2')
      cy.get('#author').type('test author2')
      cy.get('#url').type('test url2')
      cy.contains('create').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog3')
      cy.get('#author').type('test author3')
      cy.get('#url').type('test url3')
      cy.contains('create').click()

      cy.contains('test blog1').parent().parent().as('blog1')
      cy.contains('test blog2').parent().parent().as('blog2')
      cy.contains('test blog3').parent().parent().as('blog3')

      cy.get('@blog1').contains('view').click()
      cy.wait(500)
      cy.get('@blog2').contains('view').click()
      cy.wait(500)
      cy.get('@blog3').contains('view').click()
      cy.wait(500)
      cy.contains('test blog1').parent().contains('like').click()
      cy.wait(500)
      cy.contains('test blog1').parent().contains('like').click()
      cy.wait(500)
      cy.contains('test blog2').parent().contains('like').click()
      cy.wait(500)
      cy.contains('test blog3').parent().contains('like').click()
      cy.wait(500)
      cy.contains('test blog3').parent().contains('like').click()
      cy.wait(500)
      cy.contains('test blog3').parent().contains('like').click()
      cy.wait(500)
    })

    it('ordered by number of likes', function () {
      cy.contains('3')
    })
  })
})
