import Query3Chart from '../components/QueryComponents/Query3/Query3Chart';

const Page3 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query3');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the tuple count
  const tupleCount = data.length;

  return (
    <>
      <h1>Page3</h1>
      <Query3Chart />
    </>
  );
};
export default Page3;
