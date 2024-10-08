import { ReactNode } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import Button from "@/components/ui/Button";

interface PageTitleProps {
  title?: string | null;
  subtitle?: string;
  backPath?: number;
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
}

function PageTitle({
  title,
  subtitle,
  backPath,
  children,
  className,
  isLoading,
}: PageTitleProps) {
  const navigate = useNavigate();

  return (
    <div className={clsx("block columns is-mobile is-vcentered", className)}>
      {backPath && (
        <div className="column is-narrow">
          <Button
            variant="text"
            icon={<FaChevronLeft />}
            onClick={() => navigate(backPath)}
          />
        </div>
      )}
      <div className="column">
        <p className={clsx("title is-size-5", { "is-skeleton": isLoading })}>
          {title ?? "loading..."}
        </p>
        <p className={clsx("subtitle is-size-6", { "is-skeleton": isLoading })}>
          {subtitle}
        </p>
      </div>
      <div className="column is-narrow">{children}</div>
    </div>
  );
}

export default PageTitle;
