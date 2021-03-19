import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import minimize from './assets/minimize.svg';
import maximize from './assets/maximize.svg';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_SIDEBAR_AS_TITLE } from '../../store/actions/constants';

const SideBar = styled.div`
  background-color: rgba(1, 101, 255, 0.85);
  position: relative;
  width: ${({ collapsed }) => (collapsed ? '20px' : '150px')};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Button = styled.img`
  position: absolute;
  left: 100%;
  transform: translateX(-50%);
  top: 20px;
  width: 24px;
  height: 24px;
  z-index: 2;
`;

const Header = styled.div`
  height: 60px;
  background-color: #0165ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 768px) {
    min-height: 85px;
  }
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
  line-height: 1.43px;
  color: #ffffff;
`;

const ADD_CATEGORY_TITLE = 'Add a new category';
const CATEGORY_DOSPLAY_TITLE = 'Category Display';
const VIEW_CATEGORIES_PATH = '/categories/view-categories';
const ADD_CATEGORIY_PATH = '/categories/add-category';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);

  const getSelectedItemAndSetTitle = useCallback(() => {
    const { pathname } = history.location;
    const exactPatch = pathname.split('/')[2];
    switch (exactPatch) {
      case 'view-categories': {
        dispatch({
          type: SET_SIDEBAR_AS_TITLE,
          payload: 'Categories',
        });
        return '0';
      }
      case 'add-category': {
        dispatch({
          type: SET_SIDEBAR_AS_TITLE,
          payload: 'Add a new category',
        });
        return '1';
      }
      default:
        return null;
    }
  }, [dispatch, history.location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (index, path, title) => {
    setSelectedItem(index);
    history.push(path);
    dispatch({
      type: SET_SIDEBAR_AS_TITLE,
      payload: title,
    });
  };

  useEffect(() => {
    const selectedItem = getSelectedItemAndSetTitle();
    setSelectedItem(selectedItem);
  }, [history, getSelectedItemAndSetTitle]);

  return (
    <SideBar collapsed={collapsed}>
      <Header>{!collapsed && `<--->`}</Header>
      <Button src={collapsed ? maximize : minimize} onClick={toggleCollapsed} />
      <MenuItem
        collapsed={collapsed}
        selected={selectedItem === '0'}
        onClick={() => {
          handleClick('0', VIEW_CATEGORIES_PATH, CATEGORY_DOSPLAY_TITLE);
        }}
      >
        {!collapsed && <ItemText>Category List</ItemText>}
      </MenuItem>

      <MenuItem
        collapsed={collapsed}
        selected={selectedItem === '1'}
        onClick={() => {
          handleClick('1', ADD_CATEGORIY_PATH, ADD_CATEGORY_TITLE);
        }}
      >
        {!collapsed && <ItemText>New Category</ItemText>}
      </MenuItem>
    </SideBar>
  );
};

export default withRouter(Sidebar);
