import {ReactNode} from "react";
import cs from 'classnames';

interface IPageContainer {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: IPageContainer) => {
  return (
    <div className={cs("min-h-screen", className)}>
      {children}
    </div>
  );
};

PageContainer.defaultProps = {
  className: '',
}

export default PageContainer;
