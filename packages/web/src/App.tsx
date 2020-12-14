import React from 'react';
import styled from 'styled-components';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import type { AppQuery } from './__generated__/AppQuery.graphql';

import Winners from './components/Winners'
import LogoImg from './assets/Logo.png';


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
  overflow: auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  color: #00ff85;
  margin-top: 44px;
`;

function App() {
  const commits = useLazyLoadQuery<AppQuery>(query, {rankType: "COMMITS"});
  const additions = useLazyLoadQuery<AppQuery>(query, {rankType: "ADDITIONS"});
  const deletions = useLazyLoadQuery<AppQuery>(query, {rankType: "DELETIONS"});
  return (
    <Container>
      <Logo src={LogoImg} />
      <Content>
        <Title>Maiores Contribuidores</Title>
        <Winners data={commits?.users.edges} type="commits" /> 
        <Winners data={additions?.users.edges} type="additions" /> 
        <Winners data={deletions?.users.edges} type="deletions" /> 
      </Content>
    </Container>
  );
}

const query = graphql`
  query AppQuery($rankType: RankType!) {
    users(rankType: $rankType) {
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
