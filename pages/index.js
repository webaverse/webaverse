import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { getTokens } from "../functions/UIStateFunctions.js";
import Hero from "../components/Hero";
import CardRow from "../components/CardRow";
import CardRowHeader from "../components/CardRowHeader";
import Loader from "../components/Loader";
const PagesRoot = ({data}) => {
    const [avatars, setAvatars] = useState(null);
    const [art, setArt] = useState(null);
    const [models, setModels] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mintMenuOpen, setMintMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        (async () => {
            const tokens1 = await getTokens(1, 100);
            const tokens2 = await getTokens(100, 200);
            const tokens = tokens1.concat(tokens2);

            setAvatars(
                tokens.filter((o) =>
                    o.properties.ext.toLowerCase().includes("vrm")
                )
            );
            setArt(
                tokens.filter((o) =>
                    o.properties.ext.toLowerCase().includes("png")
                )
            );
            setModels(
                tokens.filter((o) =>
                    o.properties.ext.toLowerCase().includes("glb")
                )
            );
            setLoading(false);
        })();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Webaverse</title>
                <meta
                    name="description"
                    content={"The virtual world built with NFTs."}
                />
                <meta property="og:title" content={"Webaverse"} />
                <meta
                    property="og:image"
                    content={"https://webaverse.com/webaverse.png"}
                />
                <meta name="theme-color" content="#c4005d" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {/* <Hero
                heroBg="/hero.gif"
                title="Webaverse"
                subtitle="The virtual world built with NFTs"
                callToAction="Play"
                ctaUrl="https://app.webaverse.com"
            /> */}
            <div className="street-filters">
                  
            </div>
            <div className={`container ${mintMenuOpen ? 'open' : ''}`}>
                <div className="streetchain">
                  <div className="bar" />
                </div>
                <div className="mint-button" onClick={e => {
                  setMintMenuOpen(!mintMenuOpen);
                }}>
                  <img src="/icons/plus.svg" />
                </div>
                <div className="blocker" />
                <div className="mint-menu-bar" />
                <div className="slider">
                  <div className="left-bar" />
                  <div className="contents">
                    <div className="tabs">
                      <div className={`tab ${selectedTab === 0 ? 'selected' : ''}`} onClick={e => setSelectedTab(0)}>Item</div>
                      <div className={`tab ${selectedTab === 1 ? 'selected' : ''}`} onClick={e => setSelectedTab(1)}>Avatar</div>
                      <div className={`tab ${selectedTab === 2 ? 'selected' : ''}`} onClick={e => setSelectedTab(2)}>Wearable</div>
                      <div className={`tab ${selectedTab === 3 ? 'selected' : ''}`} onClick={e => setSelectedTab(3)}>Mount</div>
                    </div>
                    <div className="text"></div>
                  </div>
                </div>
                {loading ? (
                    <Loader loading={loading} />
                ) : (
                    <div className={`wrap ${mintMenuOpen ? 'open' : ''}`}>
                        {/* <CardRowHeader name="Avatars" /> */}
                        <CardRow data={avatars} cardSize="small" cardSvgSource={data.cardSvgSource} />

                        {/* <CardRowHeader name="Digital Art" /> */}
                        <CardRow data={art} cardSize="small" cardSvgSource={data.cardSvgSource} />

                        {/* <CardRowHeader name="3D Models" /> */}
                        <CardRow data={models} cardSize="small" cardSvgSource={data.cardSvgSource} />
                    </div>
                )}
            </div>
        </Fragment>
    );
};
export default PagesRoot;

export async function getServerSideProps(context) {
  const urlPrefix = (() => {
    if (typeof window !== 'undefined') {
      return window.location.protocol + '//' + window.location.host;
    } else {
      return 'http://' + context.req.headers.host;
    }
  })();
  const u = new URL('cards.svg', urlPrefix).href;
  // console.log('got u', u);
  
  const [
    // o,
    cardSvgSource,
  ] = await Promise.all([
    /* (async () => {
      const id = /^[0-9]+$/.test(context.params.id) ? parseInt(context.params.id, 10) : NaN;
      const o = await getData(id);
      return o;
    })(), */
    (async () => {
      const res = await fetch(u);
      const s = await res.text();
      return s;
    })(),
  ]);
  // const token = o?.token;
  // const networkName = o?.networkName;

  return {
    props: {
      data: {
        // token,
        // networkName,
        cardSvgSource,
      },
    },
  };
}
