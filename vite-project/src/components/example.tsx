import { useSearchParams } from 'react-router-dom';

export default function Example() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('details'));
  return (
    <div
      style={{ visibility: searchParams.get('details') ? 'visible' : 'hidden' }}
    >
      example
    </div>
  );
}
