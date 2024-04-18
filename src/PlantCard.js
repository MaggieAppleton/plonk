import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #e8eaee;
  border-radius: 16px;
  color: var(--text-dark);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  @media (max-width: 660px) {
    flex-direction: row;
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    @media (max-width: 660px) {
      width: 40%;
      height: 100%;
    }
  }
  button {
    background: var(--blue);
    color: white;
    border: none;
    font-size: var(--font-size-base);
    font-weight: 600;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
      background: var(--blue-dark);
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 50px;
  overflow: hidden;
`;

const Filler = styled.div`
  height: 20px;
  background-color: var(--blue);
  transition: width 0.2s ease-in;
`;

const CountDown = ({ wateringPeriod, daysSinceWatered }) => {
  const percentage =
    ((wateringPeriod - daysSinceWatered) / wateringPeriod) * 100;

  return (
    <ProgressBar>
      <Filler style={{ width: `${percentage}%` }} />
    </ProgressBar>
  );
};

const PlantCard = ({
  image,
  name,
  species,
  daysSinceWatered,
  wateringPeriod,
}) => (
  <Card>
    <img src={image} alt={name} />
    <Content>
      <h2>{name}</h2>
      <p>Species: {species}</p>
      <p>Days since last watered: {daysSinceWatered}</p>
      {daysSinceWatered === 0 ? (
        <button>Water</button>
      ) : (
        <CountDown
          daysSinceWatered={daysSinceWatered}
          wateringPeriod={wateringPeriod}
        />
      )}
    </Content>
  </Card>
);

export default PlantCard;
