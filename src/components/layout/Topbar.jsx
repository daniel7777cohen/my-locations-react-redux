import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { APPEND_ACTION_TO_TITLE } from '../../store/actions/constants';

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

const Action = styled(({ isCurrentCategory, isSelected, ...props }) => (
  <Link {...props} />
))`
  opacity: ${({ isCurrentCategory }) => (isCurrentCategory ? 'unset' : '20%')};
  text-decoration: none;
  color: ${({ isSelected }) => (isSelected ? '#377afe' : 'black')};
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  pointer-events: ${({ isCurrentCategory }) =>
    isCurrentCategory ? 'all' : 'none'};
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
  const { currentCategory, title } = useSelector(
    (state) => state.categoriesReducer
  );
  const [currentAction, setCurrentAction] = useState(null);
  const [isCurrentCategory, setIsCurrentCategory] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsCurrentCategory(currentCategory !== null);
    if (!currentCategory) {
      setCurrentAction(null);
    }
  }, [currentCategory]);

  const handleClick = (text) => {
    setCurrentAction(text);
    dispatch({
      type: APPEND_ACTION_TO_TITLE,
      payload: text,
    });
  };
  return (
    <TopBar className="display-user">
      <Title>{title}</Title>
      {
        <ActionsContainer>
          <Action
            isCurrentCategory={isCurrentCategory}
            to={`/categories/view-category`}
            onClick={() => handleClick('view')}
            isSelected={isCurrentCategory && currentAction === 'view'}
          >
            VIEW
          </Action>
          <Action
            isCurrentCategory={isCurrentCategory}
            to={`/categories/edit-category`}
            onClick={() => handleClick('edit')}
            isSelected={isCurrentCategory && currentAction === 'edit'}
          >
            EDIT
          </Action>
          <Action
            isCurrentCategory={isCurrentCategory}
            to={`/categories/delete-category`}
            onClick={() => handleClick('delete')}
            isSelected={isCurrentCategory && currentAction === 'delete'}
          >
            DELETE
          </Action>
        </ActionsContainer>
      }
    </TopBar>
  );
};

export default withRouter(Topbar);
