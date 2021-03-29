import { Link } from 'react-router-dom';
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

export const RedirectLink = styled(Link)`
  text-align: center;
  margin: 10px auto;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: #4f94fd;
  text-decoration: none;
  width: 250px;

  @media (max-width: 768px) {
    margin: 10px auto;
  }

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  display: block;
  margin: 20px auto;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: #4f94fd;
  opacity: ${({ isLoading }) => (isLoading ? '40%' : 'none')};
  width: 150px;
  &:focus {
    outline: none;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const Text = styled.span`
  display: block;
  margin: 10px 0;
`;

export const WarningButton = styled.button`
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: #c70a0a;
  margin: 20px auto;
  opacity: ${({ isLoading }) => (isLoading ? '40%' : 'none')};
  width: 250px;
`;

export const Alert = styled.div`
  margin: 20px auto;
`;
