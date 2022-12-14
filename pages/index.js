import React from 'react';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicHeader = dynamic(() => import('../components/GenerateImage/VoteImage'), {
  ssr: false
})

function VoteCard(props) {
    
    return (
        <Suspense fallback={`Loading...`}>
            <DynamicHeader />
        </Suspense>
    );
}


export default VoteCard;