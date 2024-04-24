/* eslint-disable react/prop-types */
import Banner from '../Banner';

function PageLayout({
  title,
  children,
}) {
  return (
    <div className="page-layout">
      <Banner title={title}/>
      {children}
    </div>
  );
}

export default PageLayout;
