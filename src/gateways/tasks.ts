const mockTasks: TaskResponce[] = [
  {
    id: 1,
    priority: 1,
    title: "部屋の掃除",
    detail: "掃除機をかけて床を拭く",
    status: "open",
    categories: [
      {
        id: 1,
        label: "掃除",
      },
      {
        id: 2,
        label: "生活",
      },
    ],
    updated_at: "2021-09-30 00:00:00",
    created_at: "2021-09-30 00:00:00",
  },
]

export const fetchTasks = (): Promise<TaskResponce[]> => {
  return new Promise((resolve) => {
    return resolve(mockTasks)
  })
}

export const postTask = (task: TaskApiProps): Promise<TaskResponce[]> => {
  const createNewTask = {
    ...task,
    id: 2,
    updated_at: "2021-09-30 00:00:00",
    created_at: "2021-09-30 00:00:00",
  }
  return new Promise((resolve) => {
    return resolve([...mockTasks, createNewTask])
  })
}

export type TaskApiProps = Pick<
  TaskResponce,
  "title" | "detail" | "priority" | "status"
>

export type TaskResponce = {
  id: number
  title: string
  detail?: string
  priority?: number
  status?: TaskStatus
  categories?: {
    id: number
    label: string
  }[]
  updated_at: string
  created_at: string
}

export type TaskStatus = "open" | "close"
