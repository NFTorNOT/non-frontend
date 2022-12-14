import React from "react";
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';


const DEFAULT_TITLE = "NFT or Not";
const DEFAULT_DESCRIPTION = "The POC demonstrates the DALL-E & StabilityAI text-2-image generation capabilities.";
const SITE_NAME = "NFT or Not";
const BASE_URL = "https://nftornot.quick-poc.com/";

export default function (props) {

    const router = useRouter();
  const query = router.query;
  const pageConfig = {};

  pageConfig.title        = DEFAULT_TITLE;
  pageConfig.description  = DEFAULT_DESCRIPTION;
  pageConfig.canonical    = `${BASE_URL}${router.asPath}`;
  pageConfig.images       = [{url: props.imageUrl || "https://static.plgworks.com/assets/images/fav/plg-meta-big.png"}]
  pageConfig.openGraph    = {};
  pageConfig.twitter    = {};
  
  /* Open Graph */
  pageConfig.openGraph.url          = pageConfig.canonical;
  pageConfig.openGraph.title        = pageConfig.title;
  pageConfig.openGraph.site_name    = SITE_NAME;  
  pageConfig.openGraph.description  = pageConfig.description;
  pageConfig.openGraph.images       = pageConfig.images;

  //Twitter
  pageConfig.twitter.title          = pageConfig.title;
  pageConfig.twitter.description    = pageConfig.description;
  pageConfig.twitter.cardType       = "summary_large_image";

  return (<NextSeo {...pageConfig} />);
}
