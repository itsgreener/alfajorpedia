import AlfajorCard from "../Cards/AlfajorCard";
import "./AlfajorGroup.css";

function AlfajorGroup({ data, amount, onClick, onFavChange }) {
  return (
    <div className="alfajor-group" style={{ "--columns": amount }}>
      {data.slice(0, amount).map((alfajor) => (
        <div className="card hover">
          <AlfajorCard key={alfajor.id} alfajor={alfajor} onClick={() => onClick(alfajor)} onFavChange={onFavChange} />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
