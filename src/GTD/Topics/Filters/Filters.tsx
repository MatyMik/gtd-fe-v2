import { FilterContainer, FilterItemContainer, SingleFilterContainer } from "./components";
import Select from "react-select";
import { useGetTags } from "../../GTD.api";
import { useAppDispatch } from "../../../app.hook";
import { setActivateProjectFilter, setSelectedProjectFilterTags } from "../../GTD.store";
import { ActiveTypes } from "../../GTD.constants";

export const Filters = () => {
  const { data: tags } = useGetTags({});
  const dispatch = useAppDispatch();
  const tagSelectionHandler = (selectedTags: any) => {
    dispatch(setSelectedProjectFilterTags(selectedTags.map((tag: any) => tag.value)));
  };
  const activeSelectionHandler = (activeType: ActiveTypes) => {
    dispatch(setActivateProjectFilter(activeType));
  };

  return <FilterContainer>
    Filters
    <FilterItemContainer>
      <h1>Topic Filters</h1>
    </FilterItemContainer>
    <FilterItemContainer>
      <h1>ProjectFilters</h1>
      <SingleFilterContainer>
        <label>
          <input type="radio" value="active" name="active"
                 onChange={() => activeSelectionHandler(ActiveTypes.ACTIVE)} />
          Active
        </label>
        <label>
          <input type="radio" value="not active" name="active"
                 onChange={() => activeSelectionHandler(ActiveTypes.INACTIVE)} />
          Not Active
        </label>
        <label>
          <input type="radio" value="both" name="active" onChange={() => activeSelectionHandler(ActiveTypes.BOTH)} />
          both
        </label>
      </SingleFilterContainer>
      <SingleFilterContainer>
        <label>
          Tags
          <Select
            isMulti
            options={tags?.map(tag => ({ value: tag.id, label: tag.name })) || []}
            onChange={tagSelectionHandler}
          />
        </label>
      </SingleFilterContainer>
    </FilterItemContainer>
    <FilterItemContainer>
      <h1>Next Action Filters</h1>
      <label>
        <input type="radio" value="active" name="active" onChange={() => activeSelectionHandler(ActiveTypes.ACTIVE)} />
        Show Done
      </label>
      <label>
        <input type="radio" value="not active" name="active"
               onChange={() => activeSelectionHandler(ActiveTypes.INACTIVE)} />
        Do Not Done
      </label>
      <label>
        <input type="radio" value="both" name="active" onChange={() => activeSelectionHandler(ActiveTypes.BOTH)} />
        Show Done with Strikethrough
      </label>
      <label>
        Tags
        <Select
          isMulti
          options={tags?.map(tag => ({ value: tag.id, label: tag.name })) || []}
          onChange={tagSelectionHandler}
        />
      </label>
    </FilterItemContainer>

  </FilterContainer>;
};