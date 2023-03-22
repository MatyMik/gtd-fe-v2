import {
  ActionsContainer,
  Active,
  Archive,
  Complete,
  Delete,
  Edit,
  Hide,
  Menu,
  ProjectAndNextActionsContainer,
  Show,
  SingleProjectContainer,
  SubMenuContainer,
  SubMenuItemsContainer,
  TextContainer
} from "./components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Project } from "../../GTD.types";
import { Button, ButtonTypes } from "../../../common/button/button";
import { Suspense, useState } from "react";
import { NextActions } from "../next-action/next-actions";
import { useGetNextActions, useUpdateProject } from "../../GTD.api";
import { Spinner } from "../../../common/Spinner/Spinner";
import { useAppDispatch } from "../../../app.hook";
import { setIsNextActionModalOpen, setSelectedProjectData } from "../../GTD.store";
import { ActivateProjectModal } from "../../Modals/activate-project/activate-project";
import { EditProjectModal } from "../../Modals/add-project-modal";
import { CompleteProjectModal } from "../../Modals/complete-project-modal/complete-project-modal";

export const SingleProject = ({ project }: SingleProjectProps) => {
  const [areNextActionsVisible, setAreNextActionsVisible] = useState(false);

  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [areCompleteNextActionsVisible, setAreCompleteNextActionsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { data: nextActions, isFetching, isError } = useGetNextActions(project.id!, { skip: !areNextActionsVisible });
  const addNewNextActionHandler = () => {
    dispatch(setSelectedProjectData({ projectId: project.id!, topicId: project.topic! }));
    dispatch(setIsNextActionModalOpen(true));
  };

  const openActivateProjectModal = (e) => {
    e.stopPropagation();
    setIsActivateModalOpen(true);
  };
  const [updateProject] = useUpdateProject();
  const switchProjectActiveStatus = async (e) => {
    const updatedProject = { ...project, active: !project.active };
    await updateProject(updatedProject);
    setIsActivateModalOpen(false);
  };
  const switchProjectCompleteStatus = async () => {
    const updatedProject = { ...project, done: !project.done };
    await updateProject(updatedProject);
    setIsActivateModalOpen(false);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const openCompleteProjectModal = (e) => {
    e.stopPropagation();
    setIsCompleteModalOpen(true);
  };
  const openEditProjectModal = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };
  const toggleCompleteNextActionsVisible = (e) => {
    e.stopPropagation();
    setAreCompleteNextActionsVisible(!areCompleteNextActionsVisible);
  };
  return (
    <ProjectAndNextActionsContainer>
      <SingleProjectContainer onClick={() => setAreNextActionsVisible(!areNextActionsVisible)}>
        <TextContainer>{project.name}</TextContainer>
        <TextContainer>{project.tags || "tags"}</TextContainer>
        <TextContainer>{project.deadline || "-"}</TextContainer>
        <ActionsContainer>
          <ActionButtonWithTooltip
            label="Active"
            onClick={openActivateProjectModal}
            active={project.active!}
            tooltipContent={project.active ? "Deactivate" : "Activate"}
            Icon={Active}
            key={"active"}
          />
          <ActionButtonWithTooltip
            label="Complete"
            onClick={openCompleteProjectModal}
            active={project.done!}
            tooltipContent={project.done ? "Uncomplete" : "Complete"}
            Icon={Complete}
            key={"complete"}
          />
          <ActionButtonWithTooltip
            label="Edit"
            onClick={openEditProjectModal}
            active={false}
            tooltipContent={"Edit Project"}
            Icon={Edit}
            key={"edit"}
          />
          <SubMenuContainer>
            <ActionButtonWithTooltip
              label="Menu"
              onClick={toggleMenu}
              active={false}
              tooltipContent={"Open Submenu"}
              Icon={Menu}
              key={"submenu"}
            />
            {isMenuOpen ? <SubMenuItemsContainer>
              <ActionButtonWithTooltip
                label="Archive"
                onClick={toggleMenu}
                active={false}
                tooltipContent={"Archive"}
                Icon={Archive}
                key={"archive"}
              />
              <ActionButtonWithTooltip
                label="Delete"
                onClick={toggleMenu}
                active={false}
                tooltipContent={"Delete"}
                Icon={Delete}
                key={"delete"}
              />
              <ActionButtonWithTooltip
                label={areCompleteNextActionsVisible ? "Hide" : "Show"}
                onClick={toggleCompleteNextActionsVisible}
                active={false}
                tooltipContent={`${areCompleteNextActionsVisible ? "Hide" : "Show"} complete next actions`}
                Icon={areCompleteNextActionsVisible ? Hide : Show}
                key={"show-hide"}
              />
            </SubMenuItemsContainer> : null}
          </SubMenuContainer>
        </ActionsContainer>
      </SingleProjectContainer>

      {areNextActionsVisible ?
        <Suspense fallback={<Spinner />}>
          {!isFetching ? <NextActions
            nextActions={nextActions}
            addNewNextActionHandler={addNewNextActionHandler}
            areCompleteNextActionsVisible={areCompleteNextActionsVisible}
          /> : null}
        </Suspense> : null}
      {isActivateModalOpen ? <ActivateProjectModal
        closeHandler={() => setIsActivateModalOpen(false)}
        activateHandler={switchProjectActiveStatus}
        projectName={project.name}
      /> : null}
      {isEditModalOpen ? <EditProjectModal
        originalProjectName={project.name}
        originalProjectDeadline={project.deadline}
        originalTags={project.tags}
        closeHandler={() => setIsEditModalOpen(false)}
      /> : null}
      {isCompleteModalOpen ? <CompleteProjectModal
        closeHandler={() => setIsCompleteModalOpen(false)}
        completeHandler={switchProjectCompleteStatus}
        projectName={project.name!}
        isProjectComplete={project.done!}
      /> : null}
    </ProjectAndNextActionsContainer>
  );
};

type SingleProjectProps = {
  project: Partial<Project>;
}

const ActionButtonWithTooltip = ({ label, onClick, active, tooltipContent, Icon }) => {
  return <>
    <Button
      label={label}
      type={ButtonTypes.STYLELESS}
      key={label}
      onClick={onClick}
      labelHidden
    >
      <Icon
        $active={active}
        data-tooltip-content={tooltipContent}
        data-tooltip-id={label}
        data-tooltip-place="top"
      />
    </Button>
    <ReactTooltip id={label} />
  </>;
};