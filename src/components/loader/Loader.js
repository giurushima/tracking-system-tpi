import { Circles } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader1">
      <div className="loader2">
        <Circles color="blue" className="loader3" />
      </div>
    </div>
  );
};

export default Loader;
