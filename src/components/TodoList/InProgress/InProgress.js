const InProgress = ({ stateApp }) => {
  console.log(stateApp.allElements);

  return (
    <div>
      <div>
        {stateApp.allElements.map((el) => {
          return !el.checked && <div key={el.id}>{el.title}</div>;
        })}
      </div>
    </div>
  );
};

export default InProgress;
