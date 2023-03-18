import { api } from "../api";
import { NextActionType, Project, Tag, Topic } from "./GTD.types";

export const gtdApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "/topics",
      transformResponse: (response: { topics: Topic[] }) => response.topics,
      providesTags: ["Topics"]
    }),
    getTags: builder.query({
      query: () => "/tags",
      providesTags: ["Tags"]
    }),
    createTag: builder.mutation({
      query: (tag: Partial<Tag>) => ({
        url: "/tags",
        method: "POST",
        body: tag
      })
    }),
    createTopic: builder.mutation({
      query: (topic: Partial<Topic>) => ({
        url: "/topics",
        method: "POST",
        body: topic
      }),
      invalidatesTags: ["Topics"]
    }),
    createProject: builder.mutation({
      query: (project: Partial<Topic>) => ({
        url: "/projects",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["Projects"]
    }),
    createNextAction: builder.mutation({
      query: (nextAction: Partial<NextActionType>) => ({
        url: "/next-actions",
        method: "POST",
        body: nextAction
      }),
      invalidatesTags: ["NextActions"]
    }),
    getProjects: builder.query({
      query: (topicIdsQueryString: string) => ({
        url: `/projects?${topicIdsQueryString}`
      }),
      providesTags: ["Projects"]
    }),
    getNextActions: builder.query({
      query: (projectId?: number) => ({
        url: `/next-actions?projectId=${projectId ?? ""}`
      }),
      providesTags: ["NextActions"]
    }),
    updateProject: builder.mutation({
      query: (project: Partial<Project>) => ({
        url: `/projects/${project.id!}`,
        method: "PUT",
        body: project
      }),
      invalidatesTags: ["Projects"]
    }),
    updateNextAction: builder.mutation({
      query: (nextAction: Partial<NextActionType>) => ({
        url: `/next-actions/${nextAction.id!}`,
        method: "PUT",
        body: nextAction
      }),
      invalidatesTags: ["NextActions"]
    })
  })

});

export const {
  useGetTopicsQuery: useGetTopics,
  useGetTagsQuery: useGetTags,
  useCreateTagMutation: useCreateTag,
  useCreateTopicMutation: useCreateTopic,
  useCreateProjectMutation: useCreateProject,
  useGetProjectsQuery: useGetProjects,
  useCreateNextActionMutation: useCreateNextAction,
  useGetNextActionsQuery: useGetNextActions,
  useUpdateProjectMutation: useUpdateProject,
  useUpdateNextActionMutation: useUpdateNextAction
} = gtdApi;
