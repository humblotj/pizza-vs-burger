import './Ear.scss';

interface Props {
    direction: 'left'| 'right'
}

const Ear = ({ direction }: Props) => (
  <div className={`ear-container ${direction}`}>
    <div className={`ear ${direction}`} />
  </div>
);

export default Ear;
