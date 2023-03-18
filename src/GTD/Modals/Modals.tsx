import { useAppSelector } from "../../app.hook";
import { selectModalStates } from "../GTD.store";
import { AddProjectModal } from "./add-project-modal";
import { AddNextActionModal } from "./add-next-action-modal";
import React from "react";

export const Modals = () => {
  const { isProjectModalOpen, isNextActionModalOpen } = useAppSelector(selectModalStates);
  return (
    <>
      {isProjectModalOpen ? <AddProjectModal /> : null}
      {isNextActionModalOpen ? <AddNextActionModal /> : null}
    </>
  );
};