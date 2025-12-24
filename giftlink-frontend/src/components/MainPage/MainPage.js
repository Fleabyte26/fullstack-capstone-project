import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hardcoded backend URL (replace with your actual backend proxy URL if different)
// Example: 'https://krishornung-3060.theia...proxy.cognitiveclass.ai'
// Or 'http://localhost:3060' if running locally
const BACKEND_URL = 'http://localhost:3060';

const MainPage = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Task 3: Format timestamp (seconds → milliseconds)
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date unknown';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Task 1: Fetch gifts from backend
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const url = `${BACKEND_URL}/api/gifts`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error('Error fetching gifts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  // Task 2: Navigate to gift details
  const handleGiftClick = (giftId) => {
    navigate(`/gifts/${giftId}`);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading gifts...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold text-dark">Available Gifts</h2>

      {gifts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-4">No gifts available at the moment.</p>
        </div>
      ) : (
        <div className="row g-4">
          {gifts.map((gift) => (
            <div key={gift._id} className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="card h-100 shadow-sm border-0 hover-lift"
                onClick={() => handleGiftClick(gift.id || gift._id)}
                style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
              >
                {/* Task 4: Image or placeholder */}
                {gift.image ? (
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light text-muted"
                    style={{ height: '220px' }}
                  >
                    <span className="fs-5">No Image Available</span>
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  {/* Task 5: Gift name */}
                  <h5 className="card-title mb-3">{gift.name}</h5>

                  {/* Task 6: Formatted date */}
                  <p className="card-text text-muted mt-auto small">
                    Added on: {formatDate(gift.date_added)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;