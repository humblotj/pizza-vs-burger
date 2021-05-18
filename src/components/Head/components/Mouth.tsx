import './Mouth.scss';
import Teeth from './Teeth';
import Tongue from './Tongue';

const Mouth = () => (
  <div className="mouth-container part-04">
    <div className="mouth">
      <Teeth />
      <Tongue />
    </div>
  </div>
);

export default Mouth;
