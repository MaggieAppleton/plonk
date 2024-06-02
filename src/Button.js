import React from "react";
import styled from "styled-components";
import { easeInOut, motion, spring, transform } from "framer-motion";

export const Button = ({ isOverdue, isLoading, daysToWater, onClick }) => {
  const [animationStage, setAnimationStage] = React.useState("initial");

  const wateringMessages = [
    "Water me",
    "Wet me",
    "Make me moist",
    "Drench my soil",
    "Quench my thirst",
    "Drip on me",
    "Make it rain",
  ];

  const randomWateringMessage =
    wateringMessages[Math.floor(Math.random() * wateringMessages.length)];

  const buttonVariants = {
    initial: { scale: 1, width: "100%", height: "70px", borderRadius: "12px" },
    hover: {
      scale: 1.03,
    },
    circle: {
      width: [null, "100%", "50%", "48px"],
      height: [null, "70px", "48px", "48px"],
      borderRadius: "30px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    transition: { duration: 0.25, ease: "easeInOut" },
  };

  const handleClick = () => {
    onClick();
    setAnimationStage("circle");
  };

  return (
    <ButtonContainer>
      <StyledButton
        variants={buttonVariants}
        initial="initial"
        animate={animationStage}
        onClick={handleClick}
        whileHover="hover"
        isOverdue={isOverdue}
      >
        {animationStage === "initial" &&
          (isOverdue ? "Save Me" : randomWateringMessage)}
        {isOverdue && animationStage === "initial" && (
          <span>{-daysToWater} days late</span>
        )}
      </StyledButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const StyledButton = styled(motion.button)`
  height: 70px;
  margin-top: 0.75rem;
  background: ${(props) =>
    props.isOverdue ? "var(--japan)" : "var(--forest)"};
  color: var(--light-leaf);
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border: none;
  font-size: var(--font-md);
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: ${(props) => (props.isOverdue ? "space-between" : "center")};
  align-items: center;
  transition: all 0.2s ease-in;
  position: relative;
  span {
    font-size: var(--font-sm);
    padding: 6px 12px;
    background: var(--light-leaf);
    border-radius: 16px;
    color: var(--dark-japan);
    flex-shrink: 0;
  }
  @media (max-width: 620px) {
    padding: 1rem;
    height: 52px;
  }
`;
