import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ActiveTypes } from "./GTD.constants";

// import { authApi } from './api/api';

export interface GTDState {
  isProjectModalOpen: boolean;
  isNextActionModalOpen: boolean;
  selectedProjectId: number | null;
  selectedTopicId: number | null;

  selectedProjectFilterTags: number[];
  activeProjectFilter: ActiveTypes;
}

const initialState: GTDState = {
  isProjectModalOpen: false,
  isNextActionModalOpen: false,
  selectedProjectId: null,
  selectedTopicId: null,
  selectedProjectFilterTags: [],
  activeProjectFilter: ActiveTypes.BOTH

};

export const gtdSlice = createSlice({
  name: "gtd",
  initialState,
  reducers: {
    setIsProjectModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProjectModalOpen = action.payload;
    },
    setIsNextActionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isNextActionModalOpen = action.payload;
    },
    setSelectedProjectData: (state, action: PayloadAction<{ projectId: number, topicId: number }>) => {
      state.selectedProjectId = action.payload.projectId;
      state.selectedTopicId = action.payload.topicId;
    },
    setSelectedProjectFilterTags: (state, action: PayloadAction<number[]>) => {
      state.selectedProjectFilterTags = action.payload;
    },
    setActivateProjectFilter: (state, action: PayloadAction<ActiveTypes>) => {
      state.activeProjectFilter = action.payload;
    },
    setSelectedTopicId: (state, action: PayloadAction<number>) => {
      state.selectedTopicId = action.payload;
    }
  }
});

export const {
  setIsProjectModalOpen,
  setIsNextActionModalOpen,
  setSelectedProjectData,
  setSelectedProjectFilterTags,
  setActivateProjectFilter,
  setSelectedTopicId
} =
  gtdSlice.actions;

export default gtdSlice.reducer;

export const selectModalStates = (state: RootState) => ({
  isProjectModalOpen: state.gtd.isProjectModalOpen,
  isNextActionModalOpen: state.gtd.isNextActionModalOpen
});

export const selectSelectedProjectData = (state: RootState) => ({
  projectId: state.gtd.selectedProjectId,
  topicId: state.gtd.selectedTopicId
});

export const selectProjectFilterTags = (state: RootState) => state.gtd.selectedProjectFilterTags;

export const selectActiveProjectFilter = (state: RootState) => state.gtd.activeProjectFilter;

export const selectSelectedTopicId = (state: RootState) => state.gtd.selectedTopicId;