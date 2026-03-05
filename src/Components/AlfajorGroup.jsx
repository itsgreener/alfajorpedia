import AlfajorCard from "./AlfajorCard";
import "./AlfajorGroup.css";

function AlfajorGroup({ data, amount }) {
  return (
    <div className="alfajor-group">
      {data.slice(0, amount).map((alfajor, index) => (
        <div
          className="card alfajor-individual"
          key={index + alfajor.name}
          style={{ "--rows": amount }}
        >
          <AlfajorCard alfajor={alfajor} onClick={() => console.log("Test")} />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
