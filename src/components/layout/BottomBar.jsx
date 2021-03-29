import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  RESET_CURRENT_CATEGORY,
  RESET_CURRENT_LOCATION,
} from '../../store/actions/constants';

const BottomBar = styled.div`
  background-color: rgba(1, 101, 255, 0.85);
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  bottom: 60px;
`;

const MenuItem = styled.div`
  margin: 15px 0;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  background-color: ${({ selected }) => (selected ? '#4f94fd' : 'auto')};
`;

const ItemText = styled.span`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: #ffffff;
`;

const VIEW_LOCATIONS_PATH = '/locations/view-locations';
const CATEGORY_DISPLAY_TITLE = 'Categories Display';
const VIEW_CATEGORIES_PATH = '/categories/view-categories';
const LOCATIONS_DISPLAY_TITLE = 'Locations Display';

const Bottmbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const getSelectedItemAndSetTitle = useCallback(() => {
    const { pathname } = history.location;
    const exactPatch = pathname.split('/')[1];
    switch (exactPatch) {
      case 'categories': {
        return '0';
      }
      case 'locations': {
        return '1';
      }
      default:
        return null;
    }
  }, [history.location]);

  const handleClick = (path, title) => {
    history.push(path);
    dispatch({
      type:
        path === VIEW_CATEGORIES_PATH
          ? RESET_CURRENT_LOCATION
          : RESET_CURRENT_CATEGORY,
    });
  };

  useEffect(() => {
    const selectedItem = getSelectedItemAndSetTitle();
    setSelectedItem(selectedItem);
  }, [history, getSelectedItemAndSetTitle]);

  return (
    <BottomBar>
      <MenuItem
        selected={selectedItem === '0'}
        onClick={() => {
          handleClick(VIEW_CATEGORIES_PATH, CATEGORY_DISPLAY_TITLE);
        }}
      >
        {<ItemText>Categories</ItemText>}
      </MenuItem>

      <MenuItem
        selected={selectedItem === '1'}
        onClick={() => {
          handleClick(VIEW_LOCATIONS_PATH, LOCATIONS_DISPLAY_TITLE);
        }}
      >
        {<ItemText>Locations</ItemText>}
      </MenuItem>
    </BottomBar>
  );
};

export default withRouter(Bottmbar);
