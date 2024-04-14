import { ReactNode } from "react";
import { FaChevronLeft, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

interface PageTitleProps {
  title?: string | null;
  subtitle?: string;
  backPath?: number;
  children?: ReactNode;
  className?: string;
}

function PageTitle({
  title,
  subtitle,
  backPath,
  children,
  className,
}: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className={clsx("block columns is-mobile is-vcentered", className)}>
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
