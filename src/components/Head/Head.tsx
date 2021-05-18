import './Head.scss';
import Ear from './components/Ear';
import Eyebrows from './components/Eyebrows';
import Eyes from './components/Eyes';
import Mouth from './components/Mouth';
import Nose from './components/Nose';
import Hair from './components/Hair';

const head = () => (
  <div className="head-container">
    <Ear direction="left" />
    <div className="head">
      <div className="hair-and-face">
        <Hair />
        <div className="face">
          <Eyebrows />
          <Eyes />
          <Nose />
          <Mouth />
        </div>
      </div>
    </div>
    <Ear direction="right" />

  </div>
);

export default head;
