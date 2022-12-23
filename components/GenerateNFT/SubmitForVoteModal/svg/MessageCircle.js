import React from 'react';

function MessageCircle(props) {
    return (
        <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9.50003C19.0034 10.8199 18.6951 12.1219 18.1 13.3C17.3944 14.7118 16.3098 15.8992 14.9674 16.7293C13.6251 17.5594 12.0782 17.9994 10.5 18C9.59819 18.0024 8.70471 17.8592 7.8534 17.5784C7.09376 17.3279 6.27317 17.2423 5.51433 17.4953L1 19L2.50478 14.4857C2.75772 13.7269 2.67217 12.9063 2.42164 12.1466C2.14087 11.2953 1.99765 10.4018 2 9.50003C2.00061 7.92179 2.44061 6.37488 3.27072 5.03258C4.10083 3.69028 5.28825 2.6056 6.7 1.90003C7.87812 1.30496 9.18013 0.996587 10.5 1.00003H11C13.0843 1.11502 15.053 1.99479 16.5291 3.47089C18.0052 4.94699 18.885 6.91568 19 9.00003V9.50003Z" fill="url(#paint0_radial_1737_14407)" stroke="url(#paint1_radial_1737_14407)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <radialGradient id="paint0_radial_1737_14407" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 15.5715) rotate(-90) scale(19.2857)">
                        <stop stopColor="#FA5C00" />
                        <stop offset="1" stopColor="#FFB800" />
                    </radialGradient>
                    <radialGradient id="paint1_radial_1737_14407" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10 15.5715) rotate(-90) scale(19.2857)">
                        <stop stopColor="#FA5C00" />
                        <stop offset="1" stopColor="#FFB800" />
                    </radialGradient>
                </defs>
            </svg>

        </>
    );
}

export default MessageCircle;