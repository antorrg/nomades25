import {Link} from "react-router-dom";

const SocialNetworks = () => {
  return (
    <>
    <div className="container bg-light">
      <div className="row featurette">
        <div className={"col-md-7 order-md-1"}>
          <h2 className="featurette-heading fw-normal lh-1">
            Siganos en las redes...
          </h2>
          <p className="lead">
            Puede vernos tambien en Facebook e instagram...
          </p>
          <Link className="btn btn-md btn-outline-darkgray" to='/videos'>Ver videos...</Link>
        </div>
        <div className={"col-md-5 order-md-1"}>
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto mt-3"
            src="/nomadesFace.png"
            alt="Not found"
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default SocialNetworks;
