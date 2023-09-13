import { useEffect, useMemo, useRef, useState } from "react";
import useNavigation from "./useLocation";
import { v4 as uuidv4 } from "uuid";

export default function useEventTracker() {
  const { hash } = useNavigation();
  const [pageName, setPageName] = useState(hash || "home");
  const [pageVisitDuration, setPageVisitDuration] = useState(Date.now());
  const [savedVisitDuration, setSavedVisitDuration] = useState(0);
  const ads = useRef({});
  const userId = useMemo(() => {
    const userId = localStorage.getItem("userUuid");
    if (userId) return userId;

    const newUserId = uuidv4();
    localStorage.setItem("userUuid", newUserId);
    return newUserId;
  }, []);

  const sendEvent = (event) => {
    const currentDate = new Date();
    const modifiedEvent = {
      ...event,
      userId: userId,
      timestamp: currentDate.toISOString(),
    };
    const url =
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:5000"
        : "https://127.0.0.1/api";

    const params = new URLSearchParams(modifiedEvent).toString();
    fetch(`${url}/log?${params}`);
  };

  const handleAdsChange = (newAds) => {
    const { current: prevAds } = ads;
    newAds.forEach((ad) => {
      if (prevAds?.[ad.id]) return;
      const adScale = [
        ad.getBoundingClientRect().top,
        ad.getBoundingClientRect().bottom,
      ];
      if (adScale[0] === adScale[1]) return;
      prevAds[ad.id] = {
        scale: adScale,
        isSeen: false,
      };
    });
  };

  const trackAdClick = (adid) => {
    const currentDate = new Date();
    const url =
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:5000"
        : "https://127.0.0.1/api";

    const params = new URLSearchParams({
      type: "adClick",
      userId: userId,
      timestamp: currentDate.toISOString(),
      adId: adid,
    }).toString();
    return `${url}/log?${params}&redirectUrl=`;
  };

  useEffect(() => {
    setPageVisitDuration(Date.now());
    setPageName(hash || "home");
    sendEvent({
      type: "pageVisitDuration",
      page: pageName,
      newPage: hash,
      visitTime: Date.now() - pageVisitDuration,
    });
  }, [hash]);

  useEffect(() => {
    const trackPageLoad = (e) => {
      const isUniqueUser = !localStorage.getItem("timestamp") || !userId;
      if (isUniqueUser) localStorage.setItem("timestamp", Date.now());
      sendEvent({
        type: "load",
        page: e.target.baseURI,
        isUnique: isUniqueUser,
        lastVisit: localStorage.getItem("timestamp"),
        userAgent: window.navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        language: window.navigator.language,
        timezone: window.Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    };

    const trackAdView = (e) => {
      const viewPort = [window.scrollY, window.scrollY + window.innerHeight];
      const { current: savedAds } = ads;

      const currentAds = document.querySelectorAll(".ad");
      if (savedAds.length !== currentAds.length) handleAdsChange(currentAds);

      Object.keys(savedAds).forEach((ad) => {
        if (
          !savedAds[ad].isSeen &&
          viewPort[0] < savedAds[ad].scale[0] &&
          viewPort[1] > savedAds[ad].scale[1]
        ) {
          savedAds[ad].isSeen = true;
          sendEvent({
            type: "adView",
            adId: ad,
            time: e.timeStamp,
          });
        }
      });
    };

    const trackTotalVisitDuration = (e) => {
      setSavedVisitDuration(e.timeStamp);
      sendEvent({
        type: "visitDuration",
        duration: e.timeStamp - savedVisitDuration,
      });
    };

    const trackOutOfFocus = (e) => {
      trackTotalVisitDuration(e);
      if (!document.hidden) {
        const outOfFocusStart = localStorage.getItem("outOfFocusStart");
        sendEvent({
          type: "outOfFocusDuration",
          duration: e.timeStamp - outOfFocusStart,
          page: hash || pageName,
          time: e.timeStamp,
        });
      } else {
        localStorage.setItem("outOfFocusStart", e.timeStamp);
      }
    };

    const trackMouseOut = (e) => {
      trackTotalVisitDuration(e);
      sendEvent({
        type: "mouseOut",
        time: e.timeStamp,
        page: hash || pageName,
      });
    };

    window.addEventListener("load", trackPageLoad);
    window.addEventListener("scroll", trackAdView);
    window.addEventListener("visibilitychange", trackOutOfFocus);
    document
      .getElementById("root")
      .addEventListener("mouseleave", trackMouseOut);
    return () => {
      window.removeEventListener("load", trackPageLoad);
      window.removeEventListener("scroll", trackAdView);
      window.removeEventListener("visibilitychange", trackOutOfFocus);
      document
        .getElementById("root")
        .removeEventListener("mouseleave", trackMouseOut);
    };
  }, []);

  return { sendEvent, trackAdClick };
}
