import React from 'react';
import styled from 'styled-components';
import FistPlaceImg from '../../assets/firstplace.png';
import SecondPlaceImg from '../../assets/secondplace.png';
import ThirdPlaceImg from '../../assets/thirdplace.png';

const Container = styled.div`
  margin: 20px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Category = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  color: #04f5ff;
  margin-bottom: 5px;
`;

const Places = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Place = styled.div<{ place?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ place }) => (place === '1' ? '0' : '45px')};
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
`;

const PlaceImg = styled.img<{ place?: string }>`
  width: ${({ place }) => (place === '1' ? '100px' : '85px')};
  height: ${({ place }) => (place === '1' ? '100px' : '85px')};
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

interface Props {
  data: Array<{
    name: string;
    commitsCount: number;
    additions: number;
    deletions: number;
  }>;
  type: string;
}

const Winners = (props: Props) => {
  const { data, type } = props;

  const getTitle = () => ({
    commits: 'Usuários que mais criaram commits:',
    additions: 'Usuários que mais adicionaram linhas de código:',
    deletions: 'Usuários que mais removeram linhas de código:',
    '': 'Usuários que mais criaram commits:',
  });

  const getNumber = () => ({
    commits: 'commitsCount',
    additions: 'additions',
    deletions: 'deletions',
    '': 'commitsCount',
  });

  const getTypeNumber = () => ({
    commits: 'commits',
    additions: 'adições',
    deletions: 'eliminações',
    '': 'commitsCount',
  });

  return (
    <Container>
      <Category>{getTitle()[type]}</Category>
      <Places>
        <Place>
          2
          <PlaceImg src={SecondPlaceImg} alt="FirstPlace" />
          <PlaceName>{data[1].node.name}</PlaceName>
          <PlaceNumber>
            {data[1].node[getNumber()[type]]} {getTypeNumber()[type]}
          </PlaceNumber>
        </Place>
        <Place place="1">
          1
          <PlaceImg place="1" src={FistPlaceImg} alt="FirstPlace" />
          <PlaceName>{data[0].node.name}</PlaceName>
          <PlaceNumber>
            {data[0].node[getNumber()[type]]} {getTypeNumber()[type]}
          </PlaceNumber>
        </Place>
        <Place>
          3
          <PlaceImg src={ThirdPlaceImg} alt="FirstPlace" />
          <PlaceName>{data[2].node.name}</PlaceName>
          <PlaceNumber>
            {data[2].node[getNumber()[type]]} {getTypeNumber()[type]}
          </PlaceNumber>
        </Place>
      </Places>
    </Container>
  );
};

export default Winners;
