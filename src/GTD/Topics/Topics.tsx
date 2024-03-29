import { useGetTopics } from "../GTD.api";
import { Suspense, useState } from "react";
import { Spinner } from "../../common/Spinner/Spinner";
import { AddTopicModal } from "./add-topic-modal";
import { useBoolean } from "../../common/hooks/use-boolean";
import {
  AddProjectButtonContainer,
  ProjectsContainer,
  ProjectsHeader,
  TopicsContainer,
  TopicsWithMenusContainer
} from "./components";
import { Filters } from "./Filters/Filters";
import { ActionsRightBar } from "./ActionsRightBar/actions-right-bar";
import { Tabs } from "./Tabs";
import { Projects } from "./Projects/projects";
import { useAppDispatch, useAppSelector } from "../../app.hook";
import { selectProjectFilterTags, setIsProjectModalOpen, setSelectedTopicId } from "../GTD.store";
import { GTDStrings } from "../GTD.strings";
import { Button } from "../../common/button/button";

export const Topics = () => {
  const { data: topics, isFetching, isError } = useGetTopics({});
  const { value: isAddTopicModalOpen, setFalse: closeAddTopicModal, setTrue: openAddTopicModal } = useBoolean(false);
  const [selectedTopic, setSelectedTopic] = useState<number>(topics?.[0]?.id || 0);
  const projectTagFilters = useAppSelector(selectProjectFilterTags);
  const dispatch = useAppDispatch();

  const openAddProjectModal = () => {
    dispatch(setIsProjectModalOpen(true));
    dispatch(setSelectedTopicId(selectedTopic));
  };
  return <TopicsWithMenusContainer>
    <Filters />
    <Suspense fallback={<Spinner />}>
      {!isFetching ? <TopicsContainer>
        <Tabs
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topics={topics || []}
          openAddTopicModal={openAddTopicModal}
          isFetching={isFetching} />

        <ProjectsContainer>
          <AddProjectButtonContainer>
            <Button label={GTDStrings.ADD_PROJECT} onClick={openAddProjectModal} />
          </AddProjectButtonContainer>
          <ProjectsHeader>
            <div>Project Name</div>
            <div>Project Deadline</div>
          </ProjectsHeader>
          <Projects
            topicIds={selectedTopic ? [selectedTopic] : (topics ? topics.map(topic => topic.id) : [])}
            projectTagFilters={projectTagFilters}
          />
        </ProjectsContainer>
      </TopicsContainer> : null}
    </Suspense>

    <ActionsRightBar />
    {isAddTopicModalOpen ?
      <AddTopicModal
        closeHandler={closeAddTopicModal}
        topicNamesUsed={topics?.map(topic => topic.name) || []}
      /> : null}
  </TopicsWithMenusContainer>;
};