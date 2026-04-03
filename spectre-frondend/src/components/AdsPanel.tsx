import React, { useEffect, useState } from "react";
import { api } from "../api";

export const AdsPanel: React.FC<{ region: string }> = ({ region }) => {
  const [ads, setAds] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getAds(region);
        setAds(res.ads || []);
      } catch (err: any) {
        setError(err.message || "Failed to load ads");
      }
    })();
  }, [region]);

  if (error) return <div>Error loading ads: {error}</div>;

  return (
    <div>
      <h3>Sponsored</h3>
      {ads.map(ad => (
        <div key={ad.id} style={{ border: "1px solid #ccc", margin: 4, padding: 4 }}>
          <strong>{ad.title}</strong>
          <div>{ad.body}</div>
          <small>{ad.advertiser}</small>
        </div>
      ))}
    </div>
  );
};