import './App.css';
import {
    CButton,
    CCard,
    CRow,
    CCardBody,
    CCardText,
    CCardTitle,
    CContainer,
    CCol,
    CCardFooter, CCardHeader, CFooter
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {extract} from '@extractus/feed-extractor'
import * as PropTypes from "prop-types";


function CLink(props) {
    return null;
}

CLink.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node
};

function App() {
    const [randomPost, setRandomPost] = useState(undefined);
    const [source, setSource] = useState(undefined);
    const fetchRandomPost = async () => {
        try {
            const sources = [
                'https://www.theverge.com/rss/index.xml',
                'https://techcrunch.com/feed/',
                'https://arstechnica.com/feed/',
                'https://www.wired.com/feed/',
                'https://www.techradar.com/rss',
                'https://www.engadget.com/rss.xml',
                'https://gizmodo.com/rss',
                'https://www.zdnet.com/news/rss.xml',
                'https://www.cnet.com/rss/news/'
            ]
            /*** A Random source ***/
            const source = sources[Math.floor(Math.random() * sources.length)];
            const url = 'https://corsproxy.io/?' + encodeURIComponent(source);
            const result = await extract(url)
            const post = result.entries[Math.floor(Math.random() * result.entries.length)];

            setSource(result)
            setRandomPost(post)
        } catch (error) {
            console.error('Error fetching random post:', error);
        }
    };

    useEffect(() => {
        fetchRandomPost();
    }, []);

    return (
        <div>
            <CContainer fluid className={"vh-100"}>
                <CRow className={"justify-content-md-center align-items-center vh-100"}>
                    <CCol xs="auto">
                        <div className={"mb-4 text-center"}><CButton onClick={() => {
                            fetchRandomPost()
                        }} color="dark">Get a Random News</CButton></div>

                        {randomPost && <CCard className={""}>
                            <CCardHeader
                                className={"bg-dark text-bg-dark "}>{source.generator !== '' ? source.generator : source.title}</CCardHeader>
                            <CCardBody className={"p-3"}>
                                <CCardTitle>{randomPost.title}</CCardTitle>
                                <CCardText><small
                                    className="text-medium-emphasis">Published {new Date(randomPost.published).toLocaleString()}</small></CCardText>
                                <CCardText>
                                    {randomPost.description}
                                </CCardText>

                            </CCardBody>
                            <CCardFooter className={"text-center bg-light"}>
                                <CButton color="warning" href={randomPost.link} target="_blank">Go to Post</CButton>
                            </CCardFooter>
                        </CCard>}
                    </CCol>
                </CRow>
            </CContainer>
            <CFooter className={''}>
                <div>
                    <span>&copy; {new Date().getFullYear()} GuilhermePinto.</span>
                </div>
                <div>
                    <span><CButton  href={"https://github.com/VivaldiCode/Blog-preview-card"} target="_blank" color="link">GitHub</CButton></span>
                </div>
            </CFooter>
        </div>
    );
}

export default App;
