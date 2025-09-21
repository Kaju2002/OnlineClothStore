import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

const ProductReviews = ({ productId = 1 }) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const reviews = [
    {
      id: 1,
      name: "Melissa Johnson",
      date: "Aug 29, 2023",
      rating: 5,
      comment: "Praedsent volutpat adipiscing eleifend viverra pneraes lorem incidunt labore vitae et dolore ex aliqua tempor duis laboris molestui. All-bisemani laborum hususet ut aliquium ut laborum incididunt ut fugiat."
    },
    {
      id: 2,
      name: "Patrick Filips",
      date: "Jul 12, 2023",
      rating: 4,
      comment: "Praedsent volutpat adipiscing eleifend viverra pneraes lorem incidunt labore vitae et dolore ex aliqua tempor duis laboris molestui. All-bisemani laborum hususet ut aliquium ut laborum incididunt ut fugiat."
    },
    {
      id: 3,
      name: "Oliver Jenkins",
      date: "May 8, 2023",
      rating: 5,
      comment: "Praedsent volutpat adipiscing eleifend viverra pneraes lorem incidunt labore vitae et dolore ex aliqua tempor duis laboris molestui. All-bisemani laborum hususet ut aliquium ut laborum incididunt ut fugiat."
    }
  ];

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${interactive ? 'cursor-pointer' : ''} ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
      />
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log({
      productId,
      rating: reviewRating,
      text: reviewText,
      name: reviewName,
      email: reviewEmail
    });
    
    // Reset form
    setReviewRating(0);
    setReviewText('');
    setReviewName('');
    setReviewEmail('');
  };

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reviews List - Left Side */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <h4 
                    className="capitalize p-0"
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '400 20px / 24px "Josefin Sans", sans-serif'
                    }}
                  >
                    {review.name}
                  </h4>
                  <span 
                    className="relative"
                    style={{ 
                      color: 'rgb(68, 68, 68)',
                      font: '16px / 27px Raleway, sans-serif',
                      background: 'rgb(255, 255, 255)'
                    }}
                  >
                    {review.date}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <img 
                    src="https://mollee-html-ten.vercel.app/assets/img/svg/review__red.svg"
                    alt="Review"
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <p 
                className="relative"
                style={{ 
                  color: 'rgb(68, 68, 68)',
                  font: '16px / 27px Raleway, sans-serif',
                  background: 'rgb(255, 255, 255)'
                }}
              >
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Leave A Review Form - Right Side */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg h-fit">
          <h3 
            className="capitalize"
            style={{ 
              padding: '0px 0px 16px',
              font: '400 32px / 38px "Josefin Sans", sans-serif'
            }}
          >
            Leave A Review
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Write us your impressions of the purchase
          </p>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <div className="flex items-center space-x-1 mb-6">
                {renderStars(reviewRating, true, setReviewRating)}
              </div>
            </div>

            <div>
              <textarea
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm resize-none"
                placeholder="Enter your feedback"
                required
              />
            </div>

            <div>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button 
              type="submit"
              className="bg-black text-white hover:bg-gray-800 py-4 px-8 text-sm font-medium rounded-lg"
              disabled={!reviewRating || !reviewText.trim() || !reviewName.trim() || !reviewEmail.trim()}
            >
              Post A Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;