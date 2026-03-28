import { useState, useEffect, useRef } from "react";
import personalJson from "../../personal.json";
import "./Personal.css";

function Personal() {
  const hobbies = personalJson.personal;
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [zoom, setZoom] = useState(0.75);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imageLayouts, setImageLayouts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (selectedCategory) {
      // iOS-safe scroll lock: freeze html+body, remember position to prevent jump
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Dynamic Orientation Engine
      if (selectedCategory.imageLinks) {
        selectedCategory.imageLinks.forEach((src: string, i: number) => {
          const isVideo = src.endsWith('.mp4') || src.endsWith('.MOV');
          const isCulinary = selectedCategory.heading === 'Culinary';
          
          const processLayout = (isLandscape: boolean) => {
            if (isCulinary) {
              if (i === 0) return 'area-hero';
              if (src.includes('VID_01')) return 'area-vid1';
              if (src.includes('VID_02')) return 'area-vid2';
              return `area-img${i}`;
            }

            if (selectedCategory.heading === 'Motion') {
              // [0]=IMG_02(hero), [1]=IMG_01, [2]=IMG_03, [3]=IMG_04, [4]=IMG_05,
              // [5]=VID_01, [6]=VID_02, [7]=VID_03, [8]=VID_04
              if (i === 0) return 'area-hero';
              if (i === 1) return 'area-img1';
              if (i === 2) return 'area-img3';
              if (i === 3) return 'area-img4';
              if (i === 4) return 'area-img5';
              if (src.includes('VID_01')) return 'area-vid1';
              if (src.includes('VID_02')) return 'area-vid2';
              if (src.includes('VID_03')) return 'area-vid3';
              if (src.includes('VID_04')) return 'area-vid4';
              return isLandscape ? 'landscape' : 'portrait';
            }

            if (selectedCategory.heading === 'Summit') {
              // [0]=IMG_01(hero), [1]=IMG_02, [2]=IMG_03,
              // [3]=VID_01, [4]=VID_02, [5]=VID_03, [6]=VID_04, [7]=VID_05
              if (i === 0) return 'area-hero';
              if (i === 1) return 'area-img2';
              if (i === 2) return 'area-img3';
              if (src.includes('VID_01')) return 'area-vid1';
              if (src.includes('VID_02')) return 'area-vid2';
              if (src.includes('VID_03')) return 'area-vid3';
              if (src.includes('VID_04')) return 'area-vid4';
              if (src.includes('VID_05')) return 'area-vid5';
              return isLandscape ? 'landscape' : 'portrait';
            }

            if (selectedCategory.heading === 'Lens') {
              // [0]=IMG_01(hero), [1]=IMG_02, [2]=IMG_03, [3]=IMG_04, [4]=IMG_05,
              // [5]=VID_01, [6]=VID_02, [7]=VID_03
              if (i === 0) return 'area-hero';
              if (i === 1) return 'area-img2';
              if (i === 2) return 'area-img3';
              if (i === 3) return 'area-img4';
              if (i === 4) return 'area-img5';
              if (src.includes('VID_01')) return 'area-vid1';
              if (src.includes('VID_02')) return 'area-vid2';
              if (src.includes('VID_03')) return 'area-vid3';
              return isLandscape ? 'landscape' : 'portrait';
            }
            
            // Standard masonry dense fallback
            const isHero = i === 0;
            return isHero 
              ? (isLandscape ? 'hero-landscape' : 'hero-portrait')
              : (isLandscape ? 'landscape' : 'portrait');
          };

          if (isVideo) {
            const vid = document.createElement('video');
            vid.onloadedmetadata = () => {
              setImageLayouts(prev => ({ ...prev, [i]: processLayout(vid.videoWidth > vid.videoHeight) }));
            };
            vid.src = src;
          } else {
            const img = new Image();
            img.onload = () => {
              setImageLayouts(prev => ({ ...prev, [i]: processLayout(img.width > img.height) }));
            };
            img.src = src;
          }
        });
      }
    } else {
      // Restore scroll position exactly where the user was
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      setImageLayouts({});
    }
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [selectedCategory]);

  // Centering Engine: Executes strictly AFTER the layout mathematically stabilizes and bounds exist
  useEffect(() => {
    if (selectedCategory?.imageLinks && Object.keys(imageLayouts).length === selectedCategory.imageLinks.length) {
      if (wrapperRef.current) {
        const el = wrapperRef.current;
        requestAnimationFrame(() => {
          el.scrollTo({
            left: (el.scrollWidth - el.clientWidth) / 2,
            top: (el.scrollHeight - el.clientHeight) / 2,
            behavior: 'auto'
          });
        });
      }
    }
  }, [imageLayouts, selectedCategory]);

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
              setZoom(0.75); // Reset zoom on new open
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
                <div className={
                  selectedCategory?.heading === 'Culinary' ? 'culinary-matrix' :
                  selectedCategory?.heading === 'Motion'   ? 'motion-matrix'   :
                  selectedCategory?.heading === 'Summit'   ? 'summit-matrix'   :
                  selectedCategory?.heading === 'Lens'     ? 'clicks-matrix'   :
                  'masonry-collage'
                }>
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
