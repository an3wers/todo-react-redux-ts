import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="wrap">
      <div className="container py-5">
        <h1>About</h1>
        <div>
          <Link to="/">Home</Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
          molestiae quidem culpa libero! Rem minima dignissimos doloremque saepe
          atque quo, maxime, ad repudiandae aut optio, suscipit eveniet quas
          eius iste!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
