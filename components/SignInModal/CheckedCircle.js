const CheckedCircle = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 6.5L7.08125 10L5.25 8.25"
        stroke="url(#paint0_radial_2268_20741)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 6.5L7.08125 10L5.25 8.25"
        stroke="white"
        strokeOpacity="0.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="url(#paint1_radial_2268_20741)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2268_20741"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8 9.33333) rotate(-90) scale(3.75 5.89286)"
        >
          <stop stopColor="#ADFF00" />
          <stop offset="1" stopColor="#7DFA00" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_2268_20741"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8 11.7143) rotate(-90) scale(12.8571)"
        >
          <stop stopColor="#ADFF00" />
          <stop offset="1" stopColor="#7DFA00" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default CheckedCircle;
