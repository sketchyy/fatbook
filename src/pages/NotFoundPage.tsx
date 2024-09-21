import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="hero  is-fullheight">
      <div className="hero-body has-text-centered is-justify-content-center">
        <div>
          <figure
            className="image is-square ml-auto mr-auto"
            style={{ width: 350, height: 350 }}
          >
            <img src="/404.png" alt="empty plate" />
          </figure>
          <p className="title">Page Not Found</p>
          <p className="subtitle mt-4 ">
            Sorry, the page you are looking for could not be found.
          </p>
          <p>
            <Link className="button" to="/">
              <span className="icon">
                <FaHome />
              </span>
              <span>Home</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
