import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui-kit';
import {
  remove as removeBreadcrumb,
  useBreadcrumb,
} from '../../providers/BreadcrumbProvider';

function Breadcrumbs(props = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useBreadcrumb();
  // const [viewWidth, setViewWidth] = React.useState(0);
  // const boxWidth = viewWidth * 0.25 - 66;

  function handleBreadClick({ id, url }) {
    dispatch(removeBreadcrumb(id));
    setSearchParams(`${url}`);
  }
  return (
    <>
      <div>Breadcrumbs</div>
      {state.length > 0 ? (
        <Button
          type="link"
          title={`Home`}
          onClick={() => handleBreadClick({ id: -1, url: '' })}
        />
      ) : null}

      {state.map(function (index) {
        console.log('index', index);
        return (
          <Button
            type="link"
            title={` > ${index.title}`}
            onClick={() => handleBreadClick({ id: index.id, url: index.url })}
          />
        );
      })}
    </>
  );
}

export default Breadcrumbs;
