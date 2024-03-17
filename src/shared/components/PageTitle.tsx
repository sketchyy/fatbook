import { ReactNode } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  title?: string;
  subtitle?: string;
  backPath?: number;
  children?: ReactNode;
}

function PageTitle({ title, subtitle, backPath, children }: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className="block columns is-mobile is-vcentered">
      {backPath && (
        <div className="column is-narrow">
          <button className="button is-text" onClick={() => navigate(backPath)}>
            <span className="icon">
              <FaChevronLeft />
            </span>
          </button>
        </div>
      )}
      <div className="column">
        <p className="title is-size-5">{title}</p>
        <p className="subtitle is-size-6">{subtitle}</p>
      </div>
      <div className="column is-narrow">{children}</div>
    </div>
  );
}

export default PageTitle;
