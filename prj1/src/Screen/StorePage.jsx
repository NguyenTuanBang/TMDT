import React from 'react'

const StorePage = () => {
    const {id} = useParams();
    const [store, setStore] = useState(null);
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/stores/${id}`);
                setStore(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStore();
    }, [id]);

  return (
    <>

    </>
  )
}

export default StorePage