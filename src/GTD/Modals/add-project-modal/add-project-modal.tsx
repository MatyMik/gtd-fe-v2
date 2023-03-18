import { Modal } from "../../../common/Modal";
import { useAppDispatch } from "../../../app.hook";
import { setIsProjectModalOpen } from "../../GTD.store";
import Select from "react-select";
import { ButtonsContainer, InputContainer, Label, Title } from "./componenets";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";
import { GTDStrings } from "../../GTD.strings";
import { LabelledInput } from "../../../common";
import { useState } from "react";
import { useCreateProject, useGetTags, useGetTopics } from "../../GTD.api";
import { CreatableTagSelector } from "../../../common/tag-selector";
import { Option, Tag } from "../../GTD.types";

export const AddProjectModal = () => {
  const { data: tags, isFetching: areTagsFetching, isUninitialized } = useGetTags({});
  const [createProject, { isLoading: isCreatingProject }] = useCreateProject({});
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(setIsProjectModalOpen(false));
  };

  const [projectName, setProjectName] = useState<string>("");
  const [projectDeadlineTimestamp, setProjectDeadlineTimestamp] = useState<number | null>(null);

  const { data: topics, isFetching } = useGetTopics({});
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Option | null>(null);
  const addNewTag = (newTag: Tag) => {
    setSelectedTags([...selectedTags, newTag]);
  };

  const selectTagHandler = (selectedTagValues: Option[]) => {
    setSelectedTags(selectedTagValues.map(selectedTag => ({ id: selectedTag.value, name: selectedTag.label } as Tag)));
  };
  const selectedTagOptions = selectedTags?.length ? selectedTags.map(tag => ({ label: tag.name, value: tag.id })) : [];

  const addProject = async () => {
    const newProject = {
      name: projectName,
      deadline: projectDeadlineTimestamp,
      tags: selectedTags.map(tag => tag.id),
      topicId: selectedTopic!.value
    };
    await createProject(newProject);
    closeModal();
  };
  return (
    <Modal closeHandler={closeModal}>
      <Title>Modal</Title>
      <InputContainer>
        <LabelledInput
          id={GTDStrings.PROJECT_NAME}
          label={GTDStrings.PROJECT_NAME}
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
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

        />
      </InputContainer>
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
        <input
          type="date"
          value={projectDeadlineTimestamp ? (new Date(projectDeadlineTimestamp)).toISOString().slice(0, 10) : ""}
          onChange={(e) => setProjectDeadlineTimestamp(e.target.valueAsNumber)} />
      </InputContainer>
      <ButtonsContainer>
        <Button label={commonStrings.CANCEL} onClick={closeModal} type={ButtonTypes.CANCEL} />
        <Button
          label={GTDStrings.ADD_PROJECT}
          onClick={addProject}
          type={ButtonTypes.PRIMARY}
          disabled={projectName.length === 0 || selectedTopic === null}
        />
        <Button
          label={GTDStrings.ADD_NEXT_ACTIONS}
          onClick={addProject}
          type={ButtonTypes.PRIMARY}
          disabled={projectName.length === 0 || selectedTopic === null}
        />
      </ButtonsContainer>
    </Modal>
  );
};
