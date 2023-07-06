// style={{
//     background:
//       "linear-gradient(45deg, rgb(160, 143, 96), rgb(207, 212, 218))",
//   }}

const GenerationFilterCard = ({ img, numeral }) => {
  return (
    <div className="generation-filter__card">
      <p>Generation {numeral}</p>
      <img src={img} alt="" />
    </div>
  );
};

export default GenerationFilterCard;
