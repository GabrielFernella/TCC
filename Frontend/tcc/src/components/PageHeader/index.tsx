import React, { CSSProperties } from 'react';
import './styles.scss';
import TopBarContainer from '../TopBarContainer';

interface PageHeaderProps {
  title?: string;
  description?: string;
  background?: string;
  page?: string;
  to?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  title,
  description,
  background,
  page,
  children,
  to,
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
      <TopBarContainer title={page} to={to} />
      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
