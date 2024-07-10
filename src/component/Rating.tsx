// Rating.tsx

import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface RatingProps {
    defaultValue?: number;
    onClick?: (newValue: number) => void; // Add onClick prop
}

const Rating: React.FC<RatingProps> = ({ defaultValue = 0, onClick }) => {
    const [value, setValue] = useState(defaultValue);
    const maxStars = 5;

    const handleClick = (newValue: number) => {
        setValue(newValue);
        if (onClick) {
            onClick(newValue); // Call onClick handler if provided
        }
    };

    const renderStars = () => {
        const stars: JSX.Element[] = [];

        for (let i = 1; i <= maxStars; i++) {
            if (i <= value) {
                stars.push(
                    <StarIcon
                        key={i}
                        onClick={() => handleClick(i)}
                        style={{ cursor: 'pointer', color: '#FFD700' }}
                    />
                );
            } else if (i - 0.5 === value) {
                stars.push(
                    <StarHalfIcon
                        key={i}
                        onClick={() => handleClick(i)}
                        style={{ cursor: 'pointer', color: '#FFD700' }}
                    />
                );
            } else {
                stars.push(
                    <StarBorderIcon
                        key={i}
                        onClick={() => handleClick(i)}
                        style={{ cursor: 'pointer', color: '#FFD700' }}
                    />
                );
            }
        }

        return stars;
    };

    return (
        <div>
            {renderStars().map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
};

export default Rating;
