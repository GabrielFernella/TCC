import React, { CSSProperties } from 'react';
import './styles.scss';
import TopBarContainer from '../TopBarContainer';

interface PageHeaderProps {
  title?: string;
  description?: string;
  background?: string;
  page?: string;
  to?: string;
  home?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  description,
  background,
  page,
  children,
  // to,
  home,
}) => {
  const headerContentStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
  };
  return (
    <header
      className="page-header"
      style={(background as CSSProperties) && headerContentStyle}
    >
      <TopBarContainer title={page} home={home} />
      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
