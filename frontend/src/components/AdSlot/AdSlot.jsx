import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import "./style.css";

export default function AdSlot({ type, style, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const adSlot = useRef(null);
  const adId = v4().split("-").join("");

  const adSize = {
    leaderboard: {
      desktop: [728, 90],
      mobile: [320, 50],
      style: {
        margin: "0 auto",
      },
    },
    largeRectangle: {
      desktop: [336, 280],
      mobile: [336, 280],
      style: {},
    },
    mediumRectangle: {
      desktop: [300, 250],
      mobile: [300, 250],
      style: {},
    },
    banner: {
      desktop: [468, 60],
      mobile: [320, 50],
      style: {},
    },
    wideSkyscraper: {
      desktop: [160, 600],
      mobile: [],
      style: {},
    },
    skyscraper: {
      desktop: [120, 600],
      mobile: [],
      style: {},
    },
    squre: {
      desktop: [250, 250],
      mobile: [250, 250],
      style: {},
    },
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    script.async = true;

    script.onload = () => {
      const googleTag = window.googletag;
      if (!googleTag) return;

      googleTag.cmd.push(function () {
        const slot = googleTag.defineSlot(
          "/6355419/Travel/Europe/France/Paris",
          [adSize.desktop, adSize.mobile],
          adId
        );
        if (!slot) return;
        slot.addService(googleTag.pubads()).setClickUrl(onClick(adId));
        const mapping = googleTag
          .sizeMapping()
          .addSize([1024, 768], [adSize[type].desktop])
          .addSize([0, 0], [adSize[type].mobile])
          .build();
        slot.defineSizeMapping(mapping);

        googleTag.enableServices();
        googleTag.display(adId);
        setIsLoaded(true);
        adSlot.current = slot;
      });
    };

    script.onerror = () => {
      console.log("error");
    };

    document.head.appendChild(script);

    const refreshInterval = setInterval(() => {
      const googleTag = window.googletag;
      if (googleTag && adSlot.current) {
        googleTag.cmd.push(function () {
          googleTag.pubads().refresh([adSlot.current]);
        });
      }
    }, 40000);

    return () => {
      document.head.removeChild(script);
      clearInterval(refreshInterval);
    };
  }, [adId]);

  return (
    <div style={isLoaded ? adSize[type].style : {}}>
      <div id={adId} className={"ad"} onClick={onclick} />
    </div>
  );
}
