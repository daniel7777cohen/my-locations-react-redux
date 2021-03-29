import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  z-index: 1;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: unset;
    min-height: 85px;
  }
`;

const ActionsContainer = styled.div`
  @media (max-width: 768px) {
    justify-content: unset;
    margin-top: 5px;
  }
`;

const Action = styled(({ isAcive, isSelected, ...props }) => (
  <span {...props} />
))`
  opacity: ${({ isAcive }) => (isAcive ? 'unset' : '20%')};
  text-decoration: none;
  color: ${({ isSelected }) => (isSelected ? '#377afe' : 'black')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  pointer-events: ${({ isAcive }) => (isAcive ? 'all' : 'none')};
  cursor: ${({ isSelected }) => (isSelected ? 'unset' : 'pointer')};
  margin: 0 10px;
`;

const Title = styled.span`
  margin-left: 20px;
  color: #377afe;
  font-weight: bold;
  width: 400px;

  @media (max-width: 768px) {
    width: auto;
    margin: 10px 0 5px 0;
  }
`;

const Topbar = () => {
  const { currentCategory } = useSelector((state) => state.categoriesReducer);
  const { currentLocation } = useSelector((state) => state.locationsReducer);
  const [isCurrentCategory, setIsCurrentCategory] = useState(false);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [title, setTitle] = useState('');
  const history = useHistory();
  const { pathname } = history.location;
  const isHomePage = pathname === '/';

  const getNewEntityPath = () => {
    const pathRoot = pathname.split('/')[1];
    if (pathRoot === 'locations') return '/locations/add-location';

    if (pathRoot === 'categories') return '/categories/add-category';

    return '/';
  };

  useEffect(() => {
    setIsCurrentCategory(currentCategory !== null);
    setIsCurrentLocation(currentLocation !== null);
  }, [currentCategory, currentLocation]);

  const getTitle = useCallback(() => {
    switch (pathname) {
      case '/':
        return 'Hi, User';
      case '/categories/view-categories':
        return 'Categories Display';
      case '/locations/view-locations':
        return 'Locations Display';
      case '/categories/add-category':
        return 'Add a category';
      case '/locations/add-location':
        return 'Add a location';
      default:
        break;
    }
    if (currentCategory) {
      return currentCategory.name.toUpperCase();
    } else if (currentLocation) {
      return currentLocation.name.toUpperCase();
    }

    return '';
  }, [pathname, currentCategory, currentLocation]);

  useEffect(() => {
    const title = getTitle();
    setTitle(title);
  }, [getTitle]);

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <TopBar>
      <Title>{title}</Title>
      {!isHomePage && (
        <ActionsContainer>
          <Action
            isAcive={true}
            onClick={() => {
              handleClick(getNewEntityPath());
            }}
            isSelected={
              pathname === '/categories/add-category' ||
              pathname === '/locations/add-location'
            }
          >
            NEW
          </Action>
          <Action
            isAcive={isCurrentCategory || isCurrentLocation}
            onClick={() =>
              handleClick(
                isCurrentCategory
                  ? '/categories/view-category'
                  : '/locations/view-location'
              )
            }
            isSelected={
              pathname === '/categories/view-category' ||
              pathname === '/locations/view-location'
            }
          >
            VIEW
          </Action>
          <Action
            isAcive={isCurrentCategory || isCurrentLocation}
            onClick={() =>
              handleClick(
                isCurrentCategory
                  ? '/categories/edit-category'
                  : '/locations/edit-location'
              )
            }
            isSelected={
              pathname === '/categories/edit-category' ||
              pathname === '/locations/edit-location'
            }
          >
            EDIT
          </Action>
          <Action
            isAcive={isCurrentCategory || isCurrentLocation}
            onClick={() =>
              handleClick(
                isCurrentCategory
                  ? '/categories/delete-category'
                  : '/locations/delete-location'
              )
            }
            isSelected={
              pathname === '/categories/delete-category' ||
              pathname === '/locations/delete-location'
            }
          >
            DELETE
          </Action>
        </ActionsContainer>
      )}
    </TopBar>
  );
};

export default withRouter(Topbar);
