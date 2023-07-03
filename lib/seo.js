import { DefaultSeo, NextSeo } from 'next-seo'
import React from 'react'

export default function Seo() {
    return (
        <>
            <DefaultSeo
                useAppDir={true}
                title="mcqera"
                description={`Discover a comprehensive collection of multiple choice questions on our website. Enhance your knowledge and test your skills with our diverse range of MCQs covering various subjects.  Join our community of learners and gain confidence in tackling multiple choice questions effectively. Start your learning journey today!`}
                canonical='https://mcqera.vercel.app/'
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: 'https://mcqera.vercel.app/',
                    siteName: 'mcqera',
                    images: [
                        {
                            url: "https://lh3.googleusercontent.com/tX35Nyj4dMZ5S0h9r6_cOZ0KpBUw-Ao0Y3pyI6DLcMJBIxDWA5a75WN-AH1Qa1e0jMmd9c8nQZAgWDtGiploTiHkvo_swbpnQFNRkbod1tUBV_jcoGMklmYX1acGWZr2LpFBSN4p29Cmh2dDukVW9ye_8DSmeaUXcU1g_pueMLjxpUYLTBJIkMbFYBzsJtCFBO3KE20wwrRBRYMT2BGIzXasbSFTNVpqxPHJ5hUm8nmtYJiaZNovOq4RDYkYztgURgEcqvXaOcv2uaarlGuytBdlrLyp9RcISbBF4eu6_Ffq_ec_K_vapI-uj2a47Y9_melMUPKJpcg1a0VCNCv7FOEGBx-fHChZNgCbfKDUlBiSBprhFtJ0p5U87NLN_yoLGSxjIGqSZvpsEMVBBzLlEaiGjGIWWmbfCEun4HeCZ5OnVSxQRde4yhXcQ18qEM7F-Ep_yH6OJ8Axy2N_P4nhjSkfDvCDjs100R4dENnyGUPzqRobHdBxMTDhfMyssTPE7ZnLDuSt_tWgPIWwcga87todd_UoO7vf8_wcyMD4VoIJ6P2WgTGSAuHcPq2zQF5tOzIsNbfKLppAPBFoTswgNGQkhBRHbflG2m5-JX7WSrSH0ROglBpYVm44NdvZZnnqROweZwfi74swMYcYAC8LSoYyBFUnxgtUMKi41aCGIzaO4HtBXZYeYEPoXqT7-v1vvGMUVOY_irz2CVjwmk2eOqIvIp3HutRRArVrY9l5Z24k_SE1SuNJvqb4SFTtPOOm1bDjpeS2NcKSd2pQPOkknbsIaGyJEx_Ypyqanv0i9e9SZCpFvKpd3JgtWAgSSwtbPPyjkAluAdUSd_GNV4KjyK-9YPJ5OTFvkk_5ND9VdvyLq6sDml9bu8oFfARmyd6ytS3ug2v0FzVmNVkzxSlRVnP3-3pczjeU5XBSUF7WT77NO5tCr8EZVNHbXiJXPYwbXxSQ-KSNSoc3mhFwjkg=w1379-h860-s-no?authuser=0",
                            width: 800,
                            height: 600,
                            alt: 'mcqera logo Image',
                            type: 'image/jpeg',

                        }
                    ]
                }}

                twitter={{
                    type: 'website',
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
        </>
    )
}
