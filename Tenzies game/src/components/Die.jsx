const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die--box" style={styles} onClick={props.handleClickedDie}>
      <span className="die--value">{props.value}</span>
    </div>
  );
};

export default Die;
