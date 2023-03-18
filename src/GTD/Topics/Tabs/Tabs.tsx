import { GTDStrings } from "../../GTD.strings";
import { Button } from "../../../common/button/button";
import { TabsContainer } from "./components";
import Tab from "../../../common/tab/tab";
import { Topic } from "../../GTD.types";

export const Tabs = ({ setSelectedTopic, selectedTopic, isFetching, topics, openAddTopicModal }: TabsProps) => {
  return (
    <TabsContainer>
      <Tab label={GTDStrings.ALL_TOPICS} clickHandler={() => setSelectedTopic(0)} active={!selectedTopic}
           key="ALL" />
      {!isFetching && topics && topics.map((topic) =>
        <Tab
          label={topic.name}
          clickHandler={() => setSelectedTopic(topic.id)}
          active={selectedTopic === topic.id}
          key={topic.name}
        />)}

      <Button label={GTDStrings.ADD_TOPIC} onClick={openAddTopicModal} />
    </TabsContainer>
  );
};

type TabsProps = {
  setSelectedTopic: (id: number) => void;
  selectedTopic: number;
  isFetching: boolean;
  topics: Topic[];
  openAddTopicModal: () => void;
}