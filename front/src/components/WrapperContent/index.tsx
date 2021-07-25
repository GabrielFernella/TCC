import React from 'react';

import './styles.scss';

const WrapperContent: React.FunctionComponent<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div id="page-content" className={className}>
      {children}
    </div>
  );
};

export default WrapperContent;
