import "./App.css";
import { styled } from "styled-components";
import PlantCard from "./PlantCard";

const plants = [
  {
    name: "Philistine",
    species: "Monstera",
    wateringPeriod: 12,
    daysSinceWatered: 2,
    image: "/monstera.jpeg",
  },
  {
    name: "Bumbercatch",
    species: "Fiddle Leaf Fig",
    wateringPeriod: 5,
    daysSinceWatered: 3,
    image: "/fiddle.jpeg",
  },
  {
    name: "Gerald",
    species: "Pothos",
    wateringPeriod: 12,
    daysSinceWatered: 0,
    image: "/pothos.jpeg",
  },
  {
    name: "Lazarus",
    species: "ZZ Plant",
    wateringPeriod: 16,
    daysSinceWatered: 7,
    image: "/fiddle.jpeg",
  },
  {
    name: "Cleopatra",
    species: "Spider Plant",
    wateringPeriod: 2,
    daysSinceWatered: 0,
    image: "/monstera.jpeg",
  },
  {
    name: "Sophocles",
    species: "Rubber Plant",
    wateringPeriod: 16,
    daysSinceWatered: 14,
    image: "/pothos.jpeg",
  },
];

function App() {
  return (
    <Container>
      <Header>
        <h1>Plonk</h1>
      </Header>
      <MainGrid>
        {plants.map((plant, index) => (
          <PlantCard key={index} {...plant} />
        ))}
      </MainGrid>
    </Container>
  );
}

const Container = styled.main`
  padding: 0 calc(8px + 2vmin) 6rem;
`;

const Header = styled.header`
  padding: 4rem 0 2rem;
  text-align: center;
  h1 {
    color: var(--text-dark);
    font-size: 2rem;
    font-weight: 800;
  }
`;

const MainGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  align-items: start;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;

export default App;
