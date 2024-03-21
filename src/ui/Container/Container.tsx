import { ReactNode } from "react";
import cs from "classnames";

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return (
    <div className={cs("container mx-auto box-border px-16", className)}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  className: '',
}

export default Container;
