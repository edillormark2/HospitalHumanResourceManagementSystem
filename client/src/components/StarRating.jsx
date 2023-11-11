import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const StarRating = (props) => {
  const [currentValue, setCurrentValue] = useState(props.initialValue || 0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  useEffect(() => {
    setCurrentValue(props.initialValue || 0);
  }, [props.initialValue]);

  const handleClick = (value) => {
    setCurrentValue(value);
    props.onStarRatingChange(value); // Pass the currentValue to the parent component
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
  
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };

  return (
    <div style={styles.container}>  
      <div
        style={styles.stars}>
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={20}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index ? colors.orange : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            ))}
      </div>  
    </div>);
};

export default StarRating;