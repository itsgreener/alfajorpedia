import AlfajorCard from "../Cards/AlfajorCard";
import "./AlfajorGroup.css";

function AlfajorGroup({ data, amount, onClick, onFavChange }) {
  return (
    <div className="alfajor-group" style={{ "--columns": amount }}>
      {data.slice(0, amount).map((alfajor, index) => (
        <div className="card hover" key={index + alfajor.name}>
          <AlfajorCard alfajor={alfajor} onClick={() => onClick(alfajor)} onFavChange={onFavChange} />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
