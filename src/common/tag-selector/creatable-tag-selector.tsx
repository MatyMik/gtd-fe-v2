import CreatableSelect from "react-select/creatable";
import { Option, Tag } from "../../GTD/GTD.types";
import { useCreateTag } from "../../GTD/GTD.api";

export const CreatableTagSelector = ({
                                       selectedTags,
                                       selectTagHandler,
                                       id,
                                       options,
                                       setSelectedTags
                                     }: TagSelectorProps) => {

  const [createTags, { isLoading: isCreatingTags }] = useCreateTag();
  const createTagHandler = async (newTag: string) => {
    const result = await createTags({ name: newTag }) as { data: Tag };
    setSelectedTags(result.data);
  };
  return <CreatableSelect
    isMulti
    id={id}
    onChange={selectTagHandler}
    onCreateOption={createTagHandler}
    isClearable
    options={options.map(tag => ({ label: tag.name, value: tag.id }))}
    value={selectedTags}
  />;
};

type TagSelectorProps = {
  selectedTags: Option[];
  selectTagHandler: (selectedTags: Option[]) => void;
  id: string;

  options: Tag[];
  setSelectedTags: (options: Tag) => void;
}
