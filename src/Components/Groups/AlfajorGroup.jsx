import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorCard from "../Cards/AlfajorCard";
import AlfajorModal from "../Modals/AlfajorModal";
import "./AlfajorGroup.css";

function AlfajorGroup({ alfajores, amount }) {
  const { pushModal } = useModalStack();

  const style = { "--columns": amount };

  return (
    <div className="alfajor-group" style={style}>
      {alfajores.slice(0, amount).map((alfajor) => (
        <div className="card hover" key={alfajor.id}>
          <AlfajorCard
            alfajor={alfajor}
            onClick={() => pushModal(<AlfajorModal alfajorId={alfajor.id} />)}
          />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
