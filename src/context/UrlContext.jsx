import React, { createContext, useState, useEffect } from 'react';
import { logger } from '../middleware/logger';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => {
    const savedUrls = localStorage.getItem('shortenedUrls');
    return savedUrls ? JSON.parse(savedUrls) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const addUrl = (newUrl) => {
    setUrls((prev) => {
      const updated = [...prev, newUrl];
      logger.info('URL added', { shortcode: newUrl.shortcode });
      return updated;
    });
  };

  const recordClick = (shortcode, clickData) => {
    setUrls(prev => prev.map(url => {
      if (url.shortcode.toLowerCase() === shortcode.toLowerCase()) {
        const updated = {
          ...url,
          clicks: [...(url.clicks || []), clickData],
          clickCount: (url.clickCount || 0) + 1
        };
        logger.info('URL accessed', { shortcode, clickData });
        return updated;
      }
      return url;
    }));
  };

  const getUrlByShortcode = (shortcode) => {
    return urls.find(url => 
      url.shortcode.toLowerCase() === shortcode.toLowerCase()
    );
  };

  return (
    <UrlContext.Provider value={{ 
      urls, 
      addUrl, 
      recordClick,
      getUrlByShortcode
    }}>
      {children}
    </UrlContext.Provider>
  );
};