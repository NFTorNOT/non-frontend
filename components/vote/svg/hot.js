import React from "react";

export default function FireSvg() {
  return (
    <>
      <svg
        width={72}
        height={72}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#a)">
          <g clipPath="url(#b)">
            <rect
              width={72}
              height={72}
              rx={36}
              fill="#000"
              fillOpacity={0.6}
            />
            <g filter="url(#c)">
              <mask
                id="e"
                style={{
                  maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={21}
                y={17}
                width={30}
                height={36}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.98 17.89a1.5 1.5 0 0 0-2.412.418l-4.694 9.86-4.809-3.198a1.5 1.5 0 0 0-2.08.42c-2.453 3.694-4.626 8.157-4.626 12.485a14.625 14.625 0 1 0 29.25 0c0-8.811-6.09-15.462-10.628-19.984Z"
                  fill="url(#d)"
                />
              </mask>
              <g mask="url(#e)">
                <g filter="url(#f)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.98 17.89a1.5 1.5 0 0 0-2.412.418l-4.694 9.86-4.809-3.198a1.5 1.5 0 0 0-2.08.42c-2.453 3.694-4.626 8.157-4.626 12.485a14.625 14.625 0 1 0 29.25 0c0-8.811-6.09-15.462-10.628-19.984Z"
                    fill="url(#g)"
                  />
                </g>
                <g
                  style={{
                    mixBlendMode: "multiply",
                  }}
                  filter="url(#h)"
                >
                  <path
                    d="M34.142 29.134a1.501 1.501 0 0 1-.71-2l4.366-9.163a2 2 0 0 1 2.306-1.076l.221.057a2 2 0 0 1 1.19 3.006l-5.459 8.624a1.501 1.501 0 0 1-1.914.552Z"
                    fill="#FAB401"
                  />
                </g>
              </g>
            </g>
            <g opacity={0.4} filter="url(#i)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m36 34.75.772-1.286a1.5 1.5 0 0 0-1.544 0L36 34.75Zm0 0a187.564 187.564 0 0 0-.773-1.286v.001l-.004.002-.007.004-.02.013a6.63 6.63 0 0 0-.3.194c-.195.13-.465.32-.785.565a18.02 18.02 0 0 0-2.346 2.154c-1.694 1.864-3.515 4.709-3.515 8.353a7.75 7.75 0 1 0 15.5 0c0-3.644-1.821-6.49-3.515-8.353a18.02 18.02 0 0 0-2.346-2.154 15.45 15.45 0 0 0-1.016-.717 6.63 6.63 0 0 0-.068-.042l-.021-.013-.007-.004-.003-.002h-.001s-.001-.001-.773 1.285Z"
                fill="#fff"
              />
            </g>
          </g>
          <rect
            x={0.5}
            y={0.5}
            width={71}
            height={71}
            rx={35.5}
            stroke="url(#j)"
            strokeOpacity={0.2}
          />
        </g>
        <defs>
          <filter
            id="a"
            x={-16}
            y={-16}
            width={104}
            height={104}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation={8} />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_3616_191"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_backgroundBlur_3616_191"
              result="shape"
            />
          </filter>
          <filter
            id="c"
            x={-10.641}
            y={-6.547}
            width={93.25}
            height={99.047}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={8} />
            <feGaussianBlur stdDeviation={16} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0.980392 0 0 0 0 0.360784 0 0 0 0 0 0 0 0 0.48 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3616_191"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_3616_191"
              result="shape"
            />
          </filter>
          <filter
            id="f"
            x={21.359}
            y={13.453}
            width={29.25}
            height={39.047}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={-4} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend in2="shape" result="effect1_innerShadow_3616_191" />
          </filter>
          <filter
            id="h"
            x={29.286}
            y={12.831}
            width={16.539}
            height={20.449}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={2}
              result="effect1_foregroundBlur_3616_191"
            />
          </filter>
          <filter
            id="i"
            x={24.25}
            y={29.25}
            width={23.5}
            height={27.25}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={2}
              result="effect1_foregroundBlur_3616_191"
            />
          </filter>
          <radialGradient
            id="d"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 -41.5 34.6357 0 36 48)"
          >
            <stop stopColor="#FA5C00" />
            <stop offset={1} stopColor="#FAB400" />
          </radialGradient>
          <radialGradient
            id="g"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(0 -41.5 34.6357 0 36 48)"
          >
            <stop stopColor="#FA5C00" />
            <stop offset={1} stopColor="#FAB400" />
          </radialGradient>
          <linearGradient
            id="j"
            x1={36}
            y1={0}
            x2={36}
            y2={72}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset={1} />
          </linearGradient>
          <clipPath id="b">
            <rect width={72} height={72} rx={36} fill="#fff" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
