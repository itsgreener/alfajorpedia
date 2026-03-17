import { useModalStack } from "../../Hooks/useModalStack";
import AlfajorCard from "../Cards/AlfajorCard";
import AlfajorModal from "../Modals/AlfajorModal";
import "./AlfajorGroup.css";

function AlfajorGroup({ data, amount, onFavChange }) {
  const { pushModal } = useModalStack();

  return (
    <div className="alfajor-group" style={{ "--columns": amount }}>
      {data.slice(0, amount).map((alfajor) => (
        <div className="card hover" key={alfajor.id}>
          <AlfajorCard
            alfajor={alfajor}
            onClick={() =>
              pushModal(
                <AlfajorModal
                  alfajorId={alfajor.id}
                  onFavChange={onFavChange}
                />,
              )
            }
            onFavChange={onFavChange}
          />
        </div>
      ))}
    </div>
  );
}

export default AlfajorGroup;
