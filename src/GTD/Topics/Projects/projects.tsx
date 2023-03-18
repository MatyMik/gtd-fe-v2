import { useGetProjects } from "../../GTD.api";
import { ProjectsContainer } from "./components";
import { SingleProject } from "./single-project";
import React, { useMemo } from "react";
import { useAppSelector } from "../../../app.hook";
import { selectActiveProjectFilter } from "../../GTD.store";
import { ActiveTypes } from "../../GTD.constants";

export const Projects = React.memo(function Projects({ topicIds, projectTagFilters }: ProjectProps) {
  const topicIdsQueryString = useMemo(() => topicIds ? topicIds.map(topicId => `topicId=${topicId}`).join("&") : "", [topicIds]);

  const activeFilter = useAppSelector(selectActiveProjectFilter);
  const {
    data: projects,
    isFetching: areProjectsFetching,
    isUninitialized
  } = useGetProjects(topicIdsQueryString, { skip: !topicIdsQueryString });

  const projectsToShow = useMemo(() => {
    return !areProjectsFetching && !isUninitialized && projects ? (
      projects.map(project => {
        if (projectTagFilters.length && !project?.tags?.some(tag => projectTagFilters.includes(tag.id))) {
          return null;
        }
        if ((activeFilter === ActiveTypes.ACTIVE && !project.active) || (activeFilter === ActiveTypes.INACTIVE && project.active)) {
          return null;
        }
        return <SingleProject key={project.id} project={project} />;
      })) : null;
  }, [projects, projectTagFilters, activeFilter]);

  return (
    <ProjectsContainer>
      {projectsToShow}
    </ProjectsContainer>
  );
}, arePropsEqual);


function arePropsEqual(prevProps: ProjectProps, nextProps: ProjectProps) {
  if (prevProps.topicIds.length !== nextProps.topicIds.length) {
    return false;
  }
  for (let i = 0; i < prevProps.topicIds.length; i++) {
    if (prevProps.topicIds[i] !== nextProps.topicIds[i]) {
      return false;
    }
  }
  if (prevProps.projectTagFilters.length !== nextProps.projectTagFilters.length) {
    return false;
  }
  for (let i = 0; i < prevProps.projectTagFilters.length; i++) {
    if (prevProps.projectTagFilters[i] !== nextProps.projectTagFilters[i]) {
      return false;
    }
  }
  return true;
}

type ProjectProps = {
  topicIds: number[];
  projectTagFilters: number[];
}