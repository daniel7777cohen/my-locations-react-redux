import styled from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const GridItem = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: ${({ isCategoriesDisplay }) =>
    isCategoriesDisplay ? 'center' : 'start'};
  padding: 5px;
  margin: 5px;
  width: ${({ isCategoriesDisplay }) =>
    isCategoriesDisplay ? '220px' : '300px'};
  min-height: ${({ isCategoriesDisplay }) =>
    isCategoriesDisplay ? '60px' : '150px'};
  cursor: ${({ isSelected, isCategoriesDisplay }) =>
    isSelected ? 'unset' : ` ${isCategoriesDisplay ? 'pointer' : 'unset'} `};
  border: ${({ isSelected }) =>
    isSelected ? '9px double #377afe' : '7px double #8f949c'};
  border-radius: 9px;
  color: ${({ isSelected }) => (isSelected ? '#377afe' : 'black')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  @media (max-width: 768px) {
    max-width: ${({ isCategoriesDisplay }) =>
      isCategoriesDisplay ? 'auto' : '250px'};
  }
`;
