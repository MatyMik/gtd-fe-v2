import { Modal } from "../../common/Modal";
import { ButtonsContainer, InputContainer, ModalHeader, TagSelectorLabel } from "./components";
import { GTDStrings } from "../GTD.strings";
import { LabelledInput } from "../../common";
import { BaseSyntheticEvent, Suspense, useState } from "react";
import { CreatableTagSelector } from "../../common/tag-selector";
import { Option, Tag } from "../GTD.types";
import { Button, ButtonTypes } from "../../common/button/button";
import { commonStrings } from "../../common/common-strings";
import { useCreateTopic, useGetTags } from "../GTD.api";
import { Spinner } from "../../common/Spinner/Spinner";

export const AddTopicModal = ({ closeHandler, topicNamesUsed }: AddTopicModalProps) => {
  const { data: tags, isFetching, isUninitialized } = useGetTags({});
  const [topicName, setTopicName] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [createTopic, { isLoading: isTopicCreationLoading }] = useCreateTopic();

  const changeTopicName = (e: BaseSyntheticEvent) => {
    setTopicName(e.target.value);
  };

  const addTopic = async () => {
    const newTopic = {
      name: topicName,
      tags: selectedTags
    };
    await createTopic(newTopic);
    closeHandler();
  };

  const addNewTag = (newTag: Tag) => {
    setSelectedTags([...selectedTags, newTag]);
  };

  const selectTagHandler = (selectedTagValues: Option[]) => {
    setSelectedTags(selectedTagValues.map(selectedTag => ({ id: selectedTag.value, name: selectedTag.label } as Tag)));
  };
  const selectedTagOptions = selectedTags.map(tag => ({ label: tag.name, value: tag.id }));
  return (
    <Modal closeHandler={closeHandler}>
      <ModalHeader>{GTDStrings.ADD_NEW_TOPIC}</ModalHeader>
      <InputContainer>
        <LabelledInput
          label={GTDStrings.TOPIC_NAME}
          value={topicName}
          id={GTDStrings.TOPIC_NAME}
          key={GTDStrings.TOPIC_NAME}
          onChange={changeTopicName} />
      </InputContainer>
      <Suspense fallback={<Spinner />}>
        {!isFetching && !isUninitialized && <InputContainer>
          <TagSelectorLabel htmlFor="tag-selector">Tags</TagSelectorLabel>
          <CreatableTagSelector
            selectedTags={selectedTagOptions}
            selectTagHandler={selectTagHandler}
            setSelectedTags={addNewTag}
            id="tag-selector"
            options={tags || []}
          />
        </InputContainer>}
      </Suspense>

      <ButtonsContainer>
        <Button label={commonStrings.CANCEL} onClick={closeHandler} type={ButtonTypes.CANCEL} />
        <Button
          label={GTDStrings.ADD_TOPIC}
          onClick={addTopic}
          type={ButtonTypes.PRIMARY}
          disabled={!topicName}
        />
      </ButtonsContainer>
    </Modal>

  );
};

type AddTopicModalProps = {
  closeHandler: () => void;

  topicNamesUsed: string[];
}