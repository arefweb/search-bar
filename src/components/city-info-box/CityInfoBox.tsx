const CityInfoBox = ({ name, value }: {name: string, value: string | undefined}) => {
  return (
    <div className="basis-3/12 dark:text-white">
      <h4 className="text-2xl font-semibold">{name}: </h4>
      <p className="text-xl">{value}</p>
    </div>
  );
};

export default CityInfoBox;
