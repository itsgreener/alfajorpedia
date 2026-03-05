import AlfajorCard from "./AlfajorCard";
import "./AlfajorGroup.css";

function AlfajorGroup({ data, amount }) {
  return (
    <div className="alfajor-group" style={{ "--columns": amount }}>
      {data.slice(0, amount).map((alfajor, index) => (
        <div className="card" key={index + alfajor.name}>
          <AlfajorCard alfajor={alfajor} onClick={() => console.log("Test")} />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
