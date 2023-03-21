import { Modal, ModalTypes } from "../../../common/Modal";

import { ButtonsContainer, InputContainer, Label, TextArea, Title } from "./componenets";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";
import { GTDStrings } from "../../GTD.strings";
import { LabelledInput } from "../../../common";
import { useState } from "react";
import { useGetTags, useUpdateNextAction } from "../../GTD.api";
import { CreatableTagSelector } from "../../../common/tag-selector";
import { Option, Tag } from "../../GTD.types";

export const EditNextActionModal = ({
                                      originalNextActionTitle,
                                      originalTags,
                                      originalDeadline,
                                      originalDescription,
                                      originalNextActionId,
                                      closeModal
                                    }: EditNextActionModalProps) => {
  const { data: tags, isFetching: areTagsFetching, isUninitialized } = useGetTags({});
  const [updateNextAction, { isLoading: isCreatingNextAction }] = useUpdateNextAction("");

  const [nextActionName, setNextActionName] = useState<string>(originalNextActionTitle);
  const [nextActionDeadlineTimestamp, setNextActionDeadlineTimestamp] = useState<string>(originalDeadline);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(originalTags);
  const [description, setDescription] = useState<string>(originalDescription);
  const addNewTag = (newTag: Tag) => {
    setSelectedTags([...selectedTags, newTag]);
  };


  const selectTagHandler = (selectedTagValues: Option[]) => {
    setSelectedTags(selectedTagValues.map(selectedTag => ({ id: selectedTag.value, name: selectedTag.label } as Tag)));
  };
  console.log(selectedTags);
  const selectedTagOptions = selectedTags.length ? selectedTags.map(tag => ({ label: tag.name, value: tag.id })) : [];

  const updateNextActionHandler = async () => {
    const newNextAction = {
      name: nextActionName,
      deadline: nextActionDeadlineTimestamp!,
      tags: selectedTags.map(tag => tag.id),
      description,
      id: originalNextActionId
    };
    await updateNextAction(newNextAction);
    closeModal();
  };

  return (
    <Modal closeHandler={closeModal} modalType={ModalTypes.LARGE}>
      <Title>Modal</Title>
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
          label={GTDStrings.UPDATE_NEXT_ACTION}
          onClick={updateNextActionHandler}
          type={ButtonTypes.PRIMARY}
          disabled={nextActionName.length === 0}
        />
      </ButtonsContainer>
    </Modal>
  );
};

type EditNextActionModalProps = {
  originalNextActionTitle: string;
  originalTags: number[];
  originalDeadline: string;
  originalDescription: string;
  originalNextActionId: number;

  closeModal: () => void;
}