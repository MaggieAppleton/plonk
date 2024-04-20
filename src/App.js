import "./App.css";
import { useState } from "react";
import { styled } from "styled-components";
import PlantCard from "./PlantCard";
import { ReactComponent as PlonkLogo } from "./PlonkLogo.svg";

const originalPlants = [
  {
    name: "Cleopatra",
    species: "Fishbone Cactus",
    location: "Cozy Room",
    wateringPeriod: 22,
    lastWateredTime: 1710318823191,
    image: "/cleopatra.webp",
  },
  {
    name: "Gallahad",
    species: "Rubber Plant",
    location: "Cozy Room",
    wateringPeriod: 9,
    lastWateredTime: 1713218823191,
    image: "/gallahad.webp",
  },
  {
    name: "Mao",
    species: "Peace Lily",
    location: "Business Room",
    wateringPeriod: 6,
    lastWateredTime: 1712118823191,
    image: "/mao.webp",
  },
  {
    name: "Rapunzel",
    species: "Golden Pothos",
    location: "Business Room",
    wateringPeriod: 8,
    lastWateredTime: 1713618823191,
    image: "/rapunzel.webp",
  },
  {
    name: "Rasputin",
    species: "Chinese Evergreen",
    location: "Business Room",
    wateringPeriod: 8,
    lastWateredTime: 1714118823191,
    image: "/rasputin.webp",
  },
  {
    name: "Rodney",
    species: "Cast Iron Plant",
    location: "Cozy Room",
    wateringPeriod: 8,
    lastWateredTime: 1713018823191,
    image: "/rodney.webp",
  },
  {
    name: "Sophocles",
    species: "Neon Pothos",
    location: "Kitchen",
    wateringPeriod: 8,
    lastWateredTime: 1712818823191,
    image: "/soph.webp",
  },
  {
    name: "Toppin",
    species: "ZZ Plant",
    location: "Cozy Room",
    wateringPeriod: 19,
    lastWateredTime: 1712618823191,
    image: "/toppin.webp",
  },
  {
    name: "Ulysses",
    species: "Heart Leaf Philodendron",
    location: "Business Room",
    wateringPeriod: 8,
    lastWateredTime: 1713318823191,
    image: "/ulysses.webp",
  },
];

function App() {
  const [plants, setPlants] = useState(originalPlants);

  return (
    <Container>
      <Header>
        <PlonkLogo />
      </Header>
      <MainGrid>
        {plants
          .map((plant) => ({
            ...plant,
            daysSinceWatered: Math.floor(
              (Date.now() - new Date(plant.lastWateredTime).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          }))
          .map((plant) => ({
            ...plant,
            daysToWater: plant.wateringPeriod - plant.daysSinceWatered,
          }))
          .sort((a, b) => a.daysToWater - b.daysToWater)
          .map((plant, index) => (
            <PlantCard setPlants={setPlants} key={index} {...plant} />
          ))}
      </MainGrid>
    </Container>
  );
}

const Container = styled.main`
  padding: clamp(3rem, 6vw, 6rem) calc(8px + 2vmin);
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: clamp(2rem, 6vw, 3.5rem);
  svg {
    width: clamp(90px, 16vw, 140px);
  }
`;

const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1.5rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
`;

export default App;
