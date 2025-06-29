// src/pages/Product2WatchPage.jsx
import React from "react";
import { Helmet } from "react-helmet";

export default function Product2WatchPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-gray-800">
      <Helmet>
        <title>THINMAX Application - Watch Video</title>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "THINMAX Waterproofing Application",
              "description": "Demonstration of how to apply THINMAX Transparent Waterproofing Solution.",
              "thumbnailUrl": "https://www.innodeepschemical.in/Product.jpg",
              "uploadDate": "2025-06-26",
              "contentUrl": "https://www.innodeepschemical.in/videos/Product2video.mp4",
              "embedUrl": "https://www.innodeepschemical.in/videos/product2"
            }
          `}
        </script>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4 text-center">Watch: THINMAX Waterproofing Application</h1>

      <video
        controls
        src="/videos/Product2video.mp4"
        className="w-full max-w-3xl h-auto rounded shadow"
      />

      <p className="mt-4 max-w-2xl text-center">
        This video shows how to apply the THINMAX Transparent Waterproofing Solution on rooftops, cracks, and tiles effectively.
      </p>
    </div>
  );
}
