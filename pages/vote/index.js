import React, { useEffect, useState } from 'react';
// import VoteImage from './VoteImage';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicHeader = dynamic(() => import('./VoteImage'), {
  suspense: true,
})


function VoteCard(props) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    },[])
    return (
        <Suspense fallback={`Loading...`}>
            <DynamicHeader />
        </Suspense>
    );
}


export default VoteCard;