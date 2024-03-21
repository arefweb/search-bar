import {ReactNode} from "react";
import cs from 'classnames';

interface IRow {
  children: ReactNode;
  className?: string;
}

const Row = ({ children, className }: IRow) => {
  return (
    <div className={cs("flex flex-wrap -mr-16 -ml-16", className)}>
      {children}
    </div>
  );
};

Row.defaultProps = {
  className: '',
}

export default Row;
