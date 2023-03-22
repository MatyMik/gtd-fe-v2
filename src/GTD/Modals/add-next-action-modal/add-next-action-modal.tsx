import { Modal, ModalTypes } from "../../../common/Modal";
import { useAppDispatch, useAppSelector } from "../../../app.hook";
import { selectSelectedProjectData, setIsNextActionModalOpen } from "../../GTD.store";
import Select from "react-select";
import { ButtonsContainer, InputContainer, Label, TextArea, Title } from "./componenets";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";
import { GTDStrings } from "../../GTD.strings";
import { LabelledInput } from "../../../common";
import { useEffect, useState } from "react";
import { useCreateNextAction, useGetProjects, useGetTags, useGetTopics } from "../../GTD.api";
import { CreatableTagSelector } from "../../../common/tag-selector";
import { Option, Tag } from "../../GTD.types";
import { selectUserId } from "../../../Authentication/Authentication.store";

export const AddNextActionModal = () => {
  const { data: tags, isFetching: areTagsFetching, isUninitialized } = useGetTags({});
  const [createNextAction, { isLoading: isCreatingNextAction }] = useCreateNextAction({});
  const { projectId, topicId } = useAppSelector(selectSelectedProjectData);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(setIsNextActionModalOpen(false));
  };

  const [nextActionName, setNextActionName] = useState<string>("");
  const [nextActionDeadlineTimestamp, setNextActionDeadlineTimestamp] = useState<string>("");

  const [selectedTopic, setSelectedTopic] = useState<Option | null>(null);
  const { data: topics, isFetching: areTopicsFetching } = useGetTopics({});
  const {
    data: projects,
    isFetching: areProjectsFetching
  } = useGetProjects(`&topicId=${(topicId || selectedTopic?.value) ?? ""}`, { skip: !topicId && !selectedTopic?.value });
  useEffect(() => {
    if (projectId && topics && projects && !selectedTopic && !selectedProject) {
      const projectToAddNextActionTo = projects.find(project => project.id === projectId);
      const topicToAddNextActionTo = topics.find(topic => topic.id === topicId);
      if (!projectToAddNextActionTo || !topicToAddNextActionTo) return;
      setSelectedTopic({ label: topicToAddNextActionTo.name, value: topicToAddNextActionTo.id });
      setSelectedProject({ label: projectToAddNextActionTo.name, value: projectToAddNextActionTo.id });
    }
  }, [topicId, projectId, projects]);
  const userId = useAppSelector(selectUserId);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const addNewTag = (newTag: Tag) => {
    setSelectedTags([...selectedTags, newTag]);
  };

  const selectTagHandler = (selectedTagValues: Option[]) => {
    setSelectedTags(selectedTagValues.map(selectedTag => ({ id: selectedTag.value, name: selectedTag.label } as Tag)));
  };
  const [description, setDescription] = useState<string>("");
  const selectedTagOptions = selectedTags.map(tag => ({ label: tag.name, value: tag.id }));

  const addNextAction = async () => {
    const newNextAction = {
      name: nextActionName,
      deadline: nextActionDeadlineTimestamp!,
      tags: selectedTags.map(tag => tag.id),
      project: selectedProject!.value,
      description,
      userId
    };
    await createNextAction(newNextAction);
  };

  const addHandler = async () => {
    await addNextAction();
    closeModal();
  };

  const addAndNextHandler = async () => {
    await addNextAction();
    setNextActionName("");
    setNextActionDeadlineTimestamp(undefined);
    setDescription("");
  };
  return (
    <Modal closeHandler={closeModal} modalType={ModalTypes.LARGE}>
      <Title>{GTDStrings.ADD_NEXT_ACTION}</Title>
      <InputContainer>
        <LabelledInput
          id={GTDStrings.NEXT_ACTION_NAME}
          label={GTDStrings.NEXT_ACTION_NAME}
          value={nextActionName}
          onChange={(e) => {
            setNextActionName(e.target.value);
          }}
        />
      </InputContainer>
      <InputContainer>
        <Label>
          {GTDStrings.SELECT_TOPIC}
        </Label>
        <Select
          defaultValue={topics && topics[0]}
          name="topics"
          options={topics ? topics.map(topic => ({ label: topic.name, value: topic.id })) : []}
          onChange={(selectedOption) => {
            setSelectedTopic(selectedOption as Option);
          }}
          value={selectedTopic}
        />
      </InputContainer>
      {selectedTopic ? <InputContainer>
        <Label>
          {GTDStrings.SELECT_PROJECT}
        </Label>
        <Select
          defaultValue={projects && projects[0]}
          name="topics"
          options={projects ? projects.map(project => ({ label: project.name, value: project.id })) : []}
          onChange={(selectedOption) => {
            setSelectedProject(selectedOption as Option);
          }}
          value={selectedProject}
        />
      </InputContainer> : null}
      <InputContainer>
        <Label>
          {GTDStrings.SELECT_TAGS}
        </Label>
        <CreatableTagSelector
          selectedTags={selectedTagOptions}
          selectTagHandler={selectTagHandler}
          setSelectedTags={addNewTag}
          id="tag-selector"
          options={tags || []}
        />
      </InputContainer>
      <InputContainer>
        <label>Deadline</label>
        <input
          type="datetime-local"
          value={nextActionDeadlineTimestamp ? nextActionDeadlineTimestamp : ""}
          onChange={(e) => setNextActionDeadlineTimestamp(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <Label>
          {GTDStrings.NEXT_ACTION_DESCRIPTION}
          <TextArea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Label>
      </InputContainer>
      <ButtonsContainer>
        <Button label={commonStrings.CANCEL} onClick={closeModal} type={ButtonTypes.CANCEL} />
        <Button
          label={GTDStrings.ADD_NEXT_ACTION_BTN_TEXT}
          onClick={addHandler}
          type={ButtonTypes.PRIMARY}
          disabled={nextActionName.length === 0 || selectedProject === null}
        />
        <Button
          label={GTDStrings.ADD_NEXT_ACTION_AND_CONTINUE_BTN_TEXT}
          onClick={addAndNextHandler}
          type={ButtonTypes.PRIMARY}
          disabled={nextActionName.length === 0 || selectedProject === null}
        />
      </ButtonsContainer>
    </Modal>
  );
};
