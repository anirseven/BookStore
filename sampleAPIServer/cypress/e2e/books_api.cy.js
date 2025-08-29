describe('GET /books', () => {
  it('should return the list of books from the backend', () => {
    cy.request('http://localhost:3000/books').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.include({
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925
      });
      expect(response.body.length).to.be.greaterThan(0);
    });
  });
});

describe('POST /books', () => {
  it('should add a new book and return it', () => {
    const newBook = {
      name: 'Test Driven Development',
      author: 'Kent Beck',
      year: 2002
    };
    cy.request('POST', 'http://localhost:3000/books', newBook).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(newBook);
    });
  });
});
