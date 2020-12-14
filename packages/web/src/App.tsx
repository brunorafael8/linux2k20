import React from 'react';
import styled from 'styled-components';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import type { AppQuery } from './__generated__/AppQuery.graphql';

import LogoImg from './assets/Logo.png';
import FistPlaceImg from './assets/firstplace.png';
import SecondPlaceImg from './assets/secondplace.png';
import ThirdPlaceImg from './assets/thirdplace.png';

const Container = styled.div`
  background-color: #e90052;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 189px;
  height: 156px;
  margin-right: 200px;
`;

const Content = styled.main`
  width: 437px;
  height: 80%;
  background: #38003c;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  color: #00ff85;
  margin-top: 44px;
`;

const Winners = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Place = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Lato;
font-style: normal;
font-weight: 800;
font-size: 18px;
line-height: 22px;
color: #FFFFFF;
`;

const PlaceImg = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 5px;
`;

const PlaceName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  margin-top: 14px;
  color: #ffffff;
`;

const PlaceNumber = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
`;

function App() {
  const data = useLazyLoadQuery<AppQuery>(query, {});
  const { edges } = data?.users;
  console.log(edges[0]);
  return (
    <Container>
      <Logo src={LogoImg} />
      <Content>
        <Title>Maiores Contribuidores</Title>
        <Winners>
          <Place>
            2
            <PlaceImg src={SecondPlaceImg} alt="FirstPlace" />
            <PlaceName>{edges[1].node.name}</PlaceName>
            <PlaceNumber>{edges[1].node.commitsCount} commits</PlaceNumber>
          </Place>
          <Place>
            1
            <PlaceImg src={FistPlaceImg} alt="FirstPlace" />
            <PlaceName>{edges[0].node.name}</PlaceName>
            <PlaceNumber>{edges[0].node.commitsCount} commits</PlaceNumber>
          </Place>
          <Place>
            3
            <PlaceImg src={ThirdPlaceImg} alt="FirstPlace" />
            <PlaceName>{edges[2].node.name}</PlaceName>
            <PlaceNumber>{edges[2].node.commitsCount} commits</PlaceNumber>
          </Place>
        </Winners>
      </Content>
    </Container>
  );
}

const query = graphql`
  query AppQuery {
    users {
      edges {
        node {
          id
          name
          commitsCount
          additions
          deletions
        }
      }
    }
  }
`;

export default App;
