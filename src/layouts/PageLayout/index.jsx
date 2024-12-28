/* eslint-disable react/prop-types */
import Banner from '../Banner';

function PageLayout({
  title,
  children,
}) {
  return (
    <div style={{minHeight: '100vh'}} className="page-layout h-100">
      <Banner title={title}/>
      {children}
    </div>
  );
}

export default PageLayout;
