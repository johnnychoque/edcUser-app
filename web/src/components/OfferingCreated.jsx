import { useOfferingStore } from "../store/offeringStore";
import OfferingCreatedTable from "./OfferingCreatedTable";
import { useNavigate } from 'react-router-dom';

const OfferingCreated = () => {
  const offering = useOfferingStore(state => state.offering);
  const navigate = useNavigate();

  const offerParams = {
    offerId: offering.id,
    offerName: offering.name,
    offerDescrip: offering.description,
    prodId: offering.productSpecification.id
  }
  console.log('offering params',offerParams);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Llamando a EdcSetup');
    navigate('/edcsetup');
  }

  return (
    <div>
      <h2>Offering created</h2>
      <OfferingCreatedTable 
        params={offerParams}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default OfferingCreated;
