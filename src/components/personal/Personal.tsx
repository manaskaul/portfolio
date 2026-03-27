import personalJson from "../../personal.json";
import "./Personal.css";

function Personal() {
  const hobbies = personalJson.personal;

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
                : 'none'
            }}
          >
            <div className="bento-overlay">
              <div className="bento-content">
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Personal;
