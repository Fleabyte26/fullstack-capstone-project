import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import { urlConfig } from '../../config';

function DetailsPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [gift, setGift] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // ✅ Check authentication
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/app/login');
            return;
        }

        // ✅ Scroll to top
        window.scrollTo(0, 0);

        // ✅ Fetch gift details
        const fetchGiftDetails = async () => {
            try {
                const response = await fetch(
                    `${urlConfig.backendUrl}/api/gifts/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch gift details');
                }

                const data = await response.json();
                setGift(data);
                setComments(data.comments || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load gift details.');
            }
        };

        fetchGiftDetails();
    }, [productId, navigate]);

    // ✅ Handle back navigation
    const handleBack = () => {
        navigate(-1);
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!gift) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details-container">
            <button className="btn btn-secondary mb-3" onClick={handleBack}>
                ← Back
            </button>

            <div className="details-card">
                {/* Image */}
                {gift.image ? (
                    <img
                        src={gift.image}
                        alt={gift.name}
                        className="product-image-large"
                    />
                ) : (
                    <div className="no-image">No Image Available</div>
                )}

                {/* Gift Info */}
                <h2>{gift.name}</h2>
                <p><strong>Category:</strong> {gift.category}</p>
                <p><strong>Condition:</strong> {gift.condition}</p>
                <p><strong>Age:</strong> {gift.age}</p>
                <p><strong>Date Added:</strong> {gift.createdAt}</p>
                <p><strong>Description:</strong> {gift.description}</p>

                {/* Comments */}
                <h4 className="mt-4">Comments</h4>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment-box">
                            <p>{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </div>
    );
}

export default DetailsPage;
