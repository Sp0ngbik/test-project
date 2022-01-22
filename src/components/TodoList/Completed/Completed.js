const Completed = ({ stateApp }) => {
  console.log(stateApp.sendInfo);
  return (
    <div>
      {stateApp.completedElements.map((el) => {
        return <div key={el.id}>{el.title}</div>;
      })}
    </div>
  );
};

export default Completed;
