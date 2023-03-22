import { Modal } from "../../../common/Modal";
import { useAppDispatch } from "../../../app.hook";
import { ButtonsContainer, InputContainer, Label, Title } from "./componenets";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";
import { GTDStrings } from "../../GTD.strings";
import { LabelledInput } from "../../../common";
import { useState } from "react";
import { useGetTags, useUpdateProject } from "../../GTD.api";
import { CreatableTagSelector } from "../../../common/tag-selector";
import { Option, Tag } from "../../GTD.types";

export const EditProjectModal = ({
                                   originalProjectName,
                                   originalProjectDeadline,
                                   closeHandler,
                                   originalTags
                                 }) => {
  const { data: tags, isFetching: areTagsFetching, isUninitialized } = useGetTags({});
  const [updateProject, { isLoading: isCreatingProject }] = useUpdateProject({});
  const dispatch = useAppDispatch();

  const [projectName, setProjectName] = useState<string>(originalProjectName);
  const [projectDeadlineTimestamp, setProjectDeadlineTimestamp] = useState<number | null>(originalProjectDeadline);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(originalTags ? originalTags.map(tagId => tags.find(tag => tag.id === tagId)) : []);
  const addNewTag = (newTag: Tag) => {
    setSelectedTags([...selectedTags, newTag]);
  };

  const selectTagHandler = (selectedTagValues: Option[]) => {
    setSelectedTags(selectedTagValues.map(selectedTag => ({ id: selectedTag.value, name: selectedTag.label } as Tag)));
  };
  const selectedTagOptions = selectedTags?.length ? selectedTags.map(tag => ({ label: tag.name, value: tag.id })) : [];

  const updateProjectHandler = async () => {
    const updatedProject = {
      name: projectName,
      deadline: projectDeadlineTimestamp,
      tags: selectedTags.map(tag => tag.id)
    };
    await updateProject(updatedProject);
    closeHandler();
  };
  return (
    <Modal closeHandler={closeHandler}>
      <Title>{GTDStrings.EDIT_PROJECT}</Title>
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
        <Button label={commonStrings.CANCEL} onClick={closeHandler} type={ButtonTypes.CANCEL} />
        <Button
          label={GTDStrings.UPDATE_PROJECT}
          onClick={updateProjectHandler}
          type={ButtonTypes.PRIMARY}
          disabled={projectName.length === 0}
        />
      </ButtonsContainer>
    </Modal>
  );
};
