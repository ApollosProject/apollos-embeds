import { useLocation } from 'react-router-dom';

function Breadcrumbs(props = {}) {
  const location = useLocation();
  let currentLink = [];
  console.log(window.history.state.idx);
  console.log('location breadcrumb', {
    default: { url: '', title: 'home' },
    ...location.state,
  });
  // also add in current page as just a string of the title
  return <div>Breadcrumbs</div>;
}

export default Breadcrumbs;
