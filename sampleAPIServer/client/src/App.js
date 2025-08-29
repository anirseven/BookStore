
import React, { useState, useEffect } from 'react';

const mainStyle = {
  fontFamily: 'Segoe UI, Arial, sans-serif',
  maxWidth: 600,
  margin: '2rem auto',
  padding: 32,
  border: '1px solid #e0e0e0',
  borderRadius: 16,
  background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
  boxShadow: '0 4px 24px 0 rgba(60,60,60,0.08)'
};

const buttonStyle = {
  background: 'linear-gradient(90deg, #4f8cff 0%, #2355d6 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 22px',
  fontSize: 16,
  fontWeight: 500,
  cursor: 'pointer',
  marginRight: 12,
  boxShadow: '0 2px 8px 0 rgba(79,140,255,0.10)',
  transition: 'background 0.2s'
};

const inputStyle = {
  width: '100%',
  padding: 10,
  border: '1px solid #bfc9d9',
  borderRadius: 6,
  fontSize: 15,
  marginBottom: 8,
  background: '#f7fafd'
};

const cardStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)',
  padding: 16,
  marginBottom: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

const labelStyle = {
  fontWeight: 500,
  marginBottom: 4,
  color: '#2d3a4a'
};

function App() {
  const [books, setBooks] = useState([]);
  const [section, setSection] = useState('home');
  const [showBooks, setShowBooks] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', author: '', year: '', location: '' });
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch available locations from backend
    fetch('http://localhost:3000/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(() => setLocations([]));
  }, []);

  const fetchBooks = async () => {
    setMessage('');
    setShowBooks(true);
    setShowForm(false);
    try {
      const url = location ? `http://localhost:3000/books?location=${encodeURIComponent(location)}` : 'http://localhost:3000/books';
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setMessage('Failed to fetch books.');
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFormLocationChange = (e) => {
    setForm({ ...form, location: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          author: form.author,
          year: form.year ? parseInt(form.year) : undefined,
          location: form.location
        })
      });
      if (res.status === 201) {
        setMessage('Thank you for donating!');
        setForm({ name: '', author: '', year: '', location: '' });
        fetchBooks();
      } else {
        const err = await res.json();
        setMessage(err.error || 'Failed to donate book.');
      }
    } catch (err) {
      setMessage('Failed to donate book.');
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ background: '#2355d6', color: '#fff', padding: '12px 0', marginBottom: 0, boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 24, alignItems: 'center', fontSize: 18 }}>
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>BookStore</span>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, marginLeft: 16 }} onClick={() => setSection('home')}>Home</button>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }} onClick={() => setSection('about')}>About Us</button>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }} onClick={() => setSection('contact')}>Contact Us</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={mainStyle}>
        {section === 'home' && (
          <>
            <h1 style={{ color: '#2355d6', fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Welcome to your local book store</h1>
            <div style={{ color: '#4f5b6b', fontSize: 18, marginBottom: 24 }}>
              Discover, browse, and donate books to your community!
            </div>
            <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <select
                value={location}
                onChange={handleLocationChange}
                style={{ ...inputStyle, maxWidth: 220, marginBottom: 0 }}
              >
                <option value="">Select location</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
              <button onClick={fetchBooks} style={buttonStyle}>See what books we have</button>
              <button onClick={() => { setShowForm(true); setShowBooks(false); setMessage(''); }} style={{ ...buttonStyle, background: 'linear-gradient(90deg, #ffb347 0%, #ff7b47 100%)' }}>Donate a book</button>
            </div>
            {message && <div style={{ color: message.includes('Thank') ? '#1aaf5d' : '#e74c3c', marginBottom: 16, fontWeight: 500 }}>{message}</div>}
            {showBooks && (
              <div>
                <h2 style={{ color: '#2355d6', fontWeight: 600, fontSize: 24, marginBottom: 12 }}>Available Books</h2>
                {books.length === 0 ? <div style={{ color: '#888' }}>No books found.</div> : (
                  <div>
                    {books.map((book, idx) => {
                      const goodreadsUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(book.name + ' ' + book.author)}`;
                      return (
                        <div key={idx} style={cardStyle}>
                          <span style={labelStyle}>{book.name}</span>
                          <span style={{ color: '#4f5b6b' }}>by {book.author} {book.year && <span style={{ color: '#b0b0b0' }}>({book.year})</span>}</span>
                          {book.location && <span style={{ color: '#2355d6', fontSize: 13, marginTop: 2 }}>Location: {book.location}</span>}
                          <a
                            href={goodreadsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#ff7b47', fontSize: 14, marginTop: 4, textDecoration: 'underline', display: 'inline-block' }}
                          >
                            View on Goodreads
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {showForm && (
              <form onSubmit={handleDonate} style={{ marginTop: 32, background: '#f7fafd', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px 0 rgba(60,60,60,0.04)' }}>
                <h2 style={{ color: '#ff7b47', fontWeight: 600, fontSize: 22, marginBottom: 16 }}>Donate a Book</h2>
                <div style={{ marginBottom: 12 }}>
                  <input name="name" placeholder="Book Name" value={form.name} onChange={handleFormChange} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <input name="author" placeholder="Author" value={form.author} onChange={handleFormChange} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <select name="location" value={form.location} onChange={handleFormLocationChange} required style={inputStyle}>
                    <option value="">Select location</option>
                    {locations.map((loc, idx) => (
                      <option key={idx} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <input name="year" placeholder="Year (optional)" value={form.year} onChange={handleFormChange} type="number" style={inputStyle} />
                </div>
                <button type="submit" style={{ ...buttonStyle, background: 'linear-gradient(90deg, #ffb347 0%, #ff7b47 100%)', marginRight: 0 }}>Donate</button>
              </form>
            )}
          </>
        )}
        {section === 'about' && (
          <div>
            <h1 style={{ color: '#2355d6', fontWeight: 700, fontSize: 32, marginBottom: 8 }}>About Us</h1>
            <div style={{ color: '#4f5b6b', fontSize: 18, marginBottom: 24 }}>
              We are a community-driven local book store dedicated to sharing the joy of reading. Our mission is to connect readers and donors, making books accessible to everyone in your city. Donate, discover, and enjoy!
            </div>
          </div>
        )}
        {section === 'contact' && (
          <div>
            <h1 style={{ color: '#2355d6', fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Contact Us</h1>
            <div style={{ color: '#4f5b6b', fontSize: 18, marginBottom: 24 }}>
              Have questions or want to get involved? Email us at <a href="mailto:info@localbookstore.com" style={{ color: '#ff7b47', textDecoration: 'none' }}>info@localbookstore.com</a> or call <a href="tel:+1234567890" style={{ color: '#ff7b47', textDecoration: 'none' }}>+1 234 567 890</a>.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#f7fafd', color: '#4f5b6b', textAlign: 'center', padding: 16, fontSize: 15, borderTop: '1px solid #e0e0e0', marginTop: 32 }}>
        &copy; {new Date().getFullYear()} Local Book Store. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
