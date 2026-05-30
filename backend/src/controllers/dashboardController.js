const [dashboardData, setDashboardData] = useState(null);

const fetchDashboardData = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/dashboard/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    setDashboardData(data);

  } catch (error) {

    console.log(error);

  }
};

useEffect(() => {
  fetchDashboardData();
}, []);