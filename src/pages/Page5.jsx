import Query5Chart from '../components/QueryComponents/Query5/Query5Chart';
import Query5Chart2 from '../components/QueryComponents/Query5/Query5Chart2';
import Query5Chart3 from '../components/QueryComponents/Query5/Query5Chart3';

const Page1 = () => {
  return (
    <>
      <h1>Page5</h1>
      <div className="m-2 mx-4">
        <Query5Chart />
      </div>
      <div className="m-2 mx-4">
        <Query5Chart2 />
      </div>
      <div className="m-2 mx-4">
        <Query5Chart3 />
      </div>
    </>
  );
};
export default Page1;
