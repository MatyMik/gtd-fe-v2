import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: none;

  @media (min-width: 768px) {
    width: 100vw;
    height: 7vh;
    display: flex;
    justify-content: space-between;
  }

`;

export const Logo = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 8px;

`;
export const Picture = styled.picture`
  padding: 4px;
`;

export const RightItemsContainer = styled.div`
  display: flex;
`;

export const RightMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const ButtonsContainer = styled.div`
  display: grid;
  gap: 8px;
`;