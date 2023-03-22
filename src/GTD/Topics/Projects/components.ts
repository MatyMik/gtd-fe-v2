import styled from "styled-components";
import { ReactComponent as DeleteSVG } from "../../../images/trash.svg";
import { ReactComponent as ActiveSVG } from "../../../images/active.svg";
import { ReactComponent as CompleteSVG } from "../../../images/complete.svg";
import { ReactComponent as ArchiveSVG } from "../../../images/archive.svg";
import { ReactComponent as EditSVG } from "../../../images/edit.svg";
import { ReactComponent as MenuSVG } from "../../../images/three-dots-vertical.svg";
import { ReactComponent as ShowSVG } from "../../../images/show.svg";
import { ReactComponent as HideSVG } from "../../../images/hide.svg";


const SVGProps = `
  width: 1.5rem;
  height: 1.5rem;
  transition-duration: 0.2s;

  &:hover {
    transform: scale(1.3);
  }
`;
export const ProjectsContainer = styled.section``;

export const SingleProjectContainer = styled.button`
  background: ${({ theme }) => theme.colors.white};
  display: grid;
  grid-template-columns: 4fr 2fr 1fr;
  border: 1px solid black;
  width: 90%;
  margin: auto;
  height: 2.5rem;
  align-items: center;
  border-radius: 8px;
`;

export const ProjectAndNextActionsContainer = styled.div`
`;

export const TextContainer = styled.div`
  text-align: left;
  font-size: 0.875rem;
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

export const Delete = styled(DeleteSVG)`
  ${SVGProps}
`;
export const Show = styled(ShowSVG)`
  ${SVGProps}
`;
export const Hide = styled(HideSVG)`
  ${SVGProps}
`;

export const Active = styled(ActiveSVG)<{ $active: boolean }>`
  ${SVGProps}

  ${({ $active, theme }) => $active ? `fill: ${theme.colors.primary.opacity()};` : ""}
`;

export const Complete = styled(CompleteSVG)`
  ${SVGProps}
`;

export const Menu = styled(MenuSVG)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Edit = styled(EditSVG)`
  ${SVGProps}
`;

export const Archive = styled(ArchiveSVG)`
  ${SVGProps}
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SubMenuContainer = styled.div`
  position: relative;
`;

export const SubMenuItemsContainer = styled.div`
  border: 1px solid black;
  position: absolute;
  top: 0rem;
  right: -3rem;
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 0.25rem;
  gap: 0.5rem;
  border-radius: 1rem;
`;