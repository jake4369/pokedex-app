const GenerationFilterCard = ({ img, numeral, onCardClick }) => {
  return (
    <div className="generation-filter__card" onClick={onCardClick}>
      <p>Generation {numeral}</p>
      <img src={img} alt="" />
    </div>
  );
};

export default GenerationFilterCard;
