// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
    res.status(200).json({
        success: true,
        data: {
            result_type: `lens_post_id's`,
            result_type_lookup: 'lens_posts',
            lens_post_ids: [1, 2,3,4,5],
            lens_posts: {
                1: {
                    id: 1,
                    owner_address: '0x0904fD076C4C879adf9044027bc0f60c190e0FF1',
                    lens_publication_id: 0x5cef - 0x03,
                    title: 'Sea view',
                    description_text_id: 101,
                    image_id: 1001,
                    ipfs_object_id: 10001,
                    total_votes: 0,
                    nft_mint_transaction_hash: '0x7de1f0c25fa27a47b93e34486dba28e7ead230306c01d48653c5f7a9a9481db5',
                    nft_metadata_ipfs_object_id: 20001,
                    uts: 1671111272
                },
                2: {
                    id: 2,
                    owner_address: '0x0904fD076C4C879adf9044027bc0f60c190e0FF1',
                    lens_publication_id: 0x5ca9 - 0x04,
                    title: 'test',
                    description_text_id: 102,
                    image_id: 1002,
                    ipfs_object_id: 10002,
                    total_votes: 2,
                    nft_mint_transaction_hash: '0x7de1f0c25fa27a47b93e34486dba28e7ead230306c01d48653c5f7a9a9481db5',
                    nft_metadata_ipfs_object_id: 20002,
                    uts: 1671111272
                },
                3: {
                    id: 3,
                    owner_address: '0x0904fD076C4C879adf9044027bc0f60c190e0FF1',
                    lens_publication_id: 0x5ca9 - 0x04,
                    title: 'test',
                    description_text_id: 102,
                    image_id: 1002,
                    ipfs_object_id: 10002,
                    total_votes: 2,
                    nft_mint_transaction_hash: '0x7de1f0c25fa27a47b93e34486dba28e7ead230306c01d48653c5f7a9a9481db5',
                    nft_metadata_ipfs_object_id: 20002,
                    uts: 1671111272
                },
                4: {
                    id: 4,
                    owner_address: '0x0904fD076C4C879adf9044027bc0f60c190e0FF1',
                    lens_publication_id: 0x5ca9 - 0x04,
                    title: 'test',
                    description_text_id: 102,
                    image_id: 1002,
                    ipfs_object_id: 10002,
                    total_votes: 2,
                    nft_mint_transaction_hash: '0x7de1f0c25fa27a47b93e34486dba28e7ead230306c01d48653c5f7a9a9481db5',
                    nft_metadata_ipfs_object_id: 20002,
                    uts: 1671111272
                },
                5: {
                    id: 5,
                    owner_address: '0x0904fD076C4C879adf9044027bc0f60c190e0FF1',
                    lens_publication_id: 0x5ca9 - 0x04,
                    title: 'test',
                    description_text_id: 102,
                    image_id: 1002,
                    ipfs_object_id: 10002,
                    total_votes: 2,
                    nft_mint_transaction_hash: '0x7de1f0c25fa27a47b93e34486dba28e7ead230306c01d48653c5f7a9a9481db5',
                    nft_metadata_ipfs_object_id: 20002,
                    uts: 1671111272
                },
            },
            images: {
                1001: {
                    id: 1001,
                    url: 'https://static.plgworks.com/assets/images/hon/bg-image.png',
                    uts: 1671111272
                },
                1002: {
                    id: 10002,
                    url: 'https://static.plgworks.com/assets/images/hon/bg-image.png',
                    uts: 1671111272
                }
            },
            texts: {
                101: {
                    id: 101,
                    text: 'description text 1',
                    uts: 1671111272,
                },
                102: {
                    id: 101,
                    text: 'description text 2',
                    uts: 1671111272,
                }
            },
            ipfs_objects: {
                10001: {
                    id: 10001,
                    cid: 'ipfs://bafkreia2y2n55blmp4jbijydq2q7irx7d754tpafglo52zxafov4ektmzu',
                    entity_kind: 'IMAGE',
                    uts: 1671111272
                },
                10002: {
                    id: 10002,
                    cid: 'ipfs://bafkreia2y2n55blmp4jbijydq2q7irx7d754tpafglo52zxafov4ektmzu',
                    entity_kind: 'IMAGE',
                    uts: 1671111272
                },
                20001: {
                    id: 20001,
                    cid: 'ipfs://bafkreialz63iknwkznyrpdzehjmbif7rs4h5wmvs2vhwyccehsxc3mxxsa',
                    entity_kind: 'IMAGE',
                    uts: 1671111272
                },
                20002: {
                    id: 20002,
                    cid: 'ipfs://bafkreialz63iknwkznyrpdzehjmbif7rs4h5wmvs2vhwyccehsxc3mxxsa',
                    entity_kind: 'IMAGE',
                    uts: 1671111272
                }
            },
            meta: {
                next_page_payload: {
                    pagination_identifier: 'next_page_identifier'
                }
            }
        }

    });
}



