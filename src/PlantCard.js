import React from "react";
import { Leaf, House, Timer, SealWarning } from "@phosphor-icons/react";
import styled from "styled-components";
import { Button } from "./Button";

const PlantCard = ({
  image,
  name,
  species,
  location,
  lastWateredTime,
  wateringPeriod,
  setPlants,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const waterPlant = async (name) => {
    setIsLoading(true);
    const data = await fetch(
      "https://maggieappleton-plonkPlants.web.val.run/" + name
    );
    const updatedPlants = await data.json();
    setPlants(updatedPlants);
    setIsLoading(false);
  };

  const CountDown = ({ wateringPeriod, daysSinceWatered }) => {
    const percentage =
      ((wateringPeriod - daysSinceWatered) / wateringPeriod) * 100;

    return (
      <ProgressBar>
        <Filler style={{ width: `${percentage}%` }} />
      </ProgressBar>
    );
  };

  const daysSinceWatered = Math.floor(
    (Date.now() - new Date(lastWateredTime).getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysToWater = wateringPeriod - daysSinceWatered;

  const isOverdue = daysToWater < -4;

  return (
    <Card>
      <ImageWrapper>
        <img src={image} alt={name} />
      </ImageWrapper>
      <Content>
        <h2>{name}</h2>
        <p>
          <Leaf size={18} />
          {species}
        </p>
        <p>
          <House size={18} />
          {location}
        </p>
        <WateringInfo
          daysToWater={daysToWater}
          daysSinceWatered={daysSinceWatered}
          isOverdue={isOverdue}
        />

        {daysSinceWatered >= wateringPeriod ? (
          <Button
            onClick={() => waterPlant(name)}
            isOverdue={isOverdue}
            isLoading={isLoading}
            daysToWater={daysToWater}
          ></Button>
        ) : (
          <CountDown
            daysSinceWatered={daysSinceWatered}
            wateringPeriod={wateringPeriod}
          />
        )}
      </Content>
    </Card>
  );
};

const WateringInfo = ({ daysToWater, daysSinceWatered, isOverdue }) => (
  <p className="timer">
    {daysToWater > 0 ? (
      <>
        <Timer size={18} />
        Water in {daysToWater} days
      </>
    ) : (
      <>
        <SealWarning size={18} className={isOverdue ? "warn" : ""} />
        Last watered {daysSinceWatered} days ago
      </>
    )}
  </p>
);

const Card = styled.div`
  border-radius: 16px;
  color: var(--slate);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 16px 20px -12px var(--shadow-leaf);
  @media (max-width: 620px) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  padding: 1.75rem;
  background: var(--rice);
  border: 1px solid var(--dark-leaf);
  border-radius: 16px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  grid-gap: 0.5rem;
  flex: 1;
  box-shadow: 0px -13px 18px -5px var(--shadow-rice);
  @media (max-width: 620px) {
    padding: 1.5rem;
    box-shadow: -10px 0px 18px -5px var(--shadow-rice);
  }
  h2 {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: var(--font-lg);
    margin-bottom: 0.5rem;
  }
  p {
    display: flex;
    align-items: center;
    font-size: var(--font-base);
    font-weight: 500;
    svg {
      margin-right: 0.5rem;
      color: var(--light-slate);
    }
  }
  p.timer {
    font-weight: 600;
    svg {
      color: var(--forest);
    }
    svg.warn {
      color: var(--dark-japan);
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  margin-bottom: -20px;
  @media (max-width: 620px) {
    width: 35%;
    height: auto;
    max-height: 240px;
    margin-bottom: 0px;
    margin-right: -20px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(105%) contrast(105%);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(63, 70%, 93%, 1);
    mix-blend-mode: multiply;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(63, 70%, 93%, 1);
    mix-blend-mode: color;
    z-index: 2;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: var(--dark-leaf);
  border-radius: 28px;
  overflow: hidden;
  margin-top: 0.75rem;
`;

const Filler = styled.div`
  height: 28px;
  border-radius: 28px;
  background-color: var(--forest);
  transition: width 0.2s ease-in;
`;

export default PlantCard;
