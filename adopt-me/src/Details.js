import { useParams } from "react-router-dom";

const Details = () => {
  // This is the id that is marked as variable in App.js <Route /> component and then passed to the <Link /> component in the Pet.js file
  // useParams() hook is used to get params from React Router
  const { id } = useParams();

  return <h2>{id}</h2>;
};

export default Details;
