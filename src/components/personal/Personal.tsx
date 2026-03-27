import { useState, useEffect, useRef } from "react";
import personalJson from "../../personal.json";
import "./Personal.css";

function Personal() {
  const hobbies = personalJson.personal;
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [zoom, setZoom] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imageLayouts, setImageLayouts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
      
      // Programmatically center the massive 2D canvas exactly at the middle of the screen
      if (wrapperRef.current) {
        const el = wrapperRef.current;
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
      }

      // Dynamic Orientation Engine: evaluates raw photos and calculates asymmetrical cluster mapping class
      if (selectedCategory.imageLinks) {
        selectedCategory.imageLinks.forEach((src: string, i: number) => {
          const img = new Image();
          img.onload = () => {
            const isLandscape = img.width > img.height;
            const isHero = i === 0; // The first picture anchors the massive centerpiece layout
            const layoutClass = isHero 
              ? (isLandscape ? 'hero-landscape' : 'hero-portrait')
              : (isLandscape ? 'landscape' : 'portrait');
            
            setImageLayouts(prev => ({ ...prev, [i]: layoutClass }));
          };
          img.src = src;
        });
      }

    } else {
      document.body.style.overflow = "scroll";
      setImageLayouts({}); // Memory cleanup
    }
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [selectedCategory]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="personal-page">
      <div className="personal-header">
        <h1 className="title">Beyond the Code</h1>
        <p className="subtitle">Snippets of my life away from the keyboard.</p>
      </div>
      
      <div className="bento-grid">
        {hobbies.map((item: any, i: number) => (
          <div 
            key={i} 
            className={`bento-item span-${item.span || 'small'}`}
            style={{ 
              backgroundImage: item.imageLinks && item.imageLinks.length > 0 
                ? `url(${item.imageLinks[0]})` 
                : 'none',
              cursor: 'pointer'
            }}
            onClick={() => {
              setZoom(1); // Reset zoom on new open
              setSelectedCategory(item);
            }}
          >
            <div className="bento-overlay">
              <div className="bento-content">
                <h3>{item.heading}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2D Spatial Canvas Modal */}
      {selectedCategory && (
        <div className="lightbox">
          <div className="lightbox-overlay" onClick={() => setSelectedCategory(null)}></div>
          
          {/* Zoom UI Tooling */}
          <div className="zoom-controls">
            <button onClick={handleZoomOut} className="zoom-btn">-</button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="zoom-btn">+</button>
          </div>

          <button className="lightbox-close" onClick={() => setSelectedCategory(null)}>×</button>

          {/* Natively Scrollable Physics Boundary Wrapper */}
          <div className="pan-zoom-wrapper" ref={wrapperRef}>
             <div 
               className="spatial-canvas"
               style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
             >
                <div className="masonry-collage">
                   {selectedCategory.imageLinks.map((src: string, i: number) => (
                     <div key={i} className={`collage-frame ${imageLayouts[i] || 'loading'}`}>
                        {src.endsWith('.mp4') || src.endsWith('.MOV') ? (
                           <video src={src} autoPlay loop muted playsInline className="collage-img" />
                        ) : (
                           <img src={src} className="collage-img" alt={`Gallery item ${i}`} loading="lazy" />
                        )}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Personal;
