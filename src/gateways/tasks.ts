const mockTasks = [
  {
    id: 1,
    priority: 1,
    title: '部屋の掃除',
    detail: '掃除機をかけて床を拭く',
    status: 'open',
    categories: [
      {
        id: 1,
        label: '掃除',
      },
      {
        id: 2,
        label: '生活',
      },
    ],
    update_at: '2021-09-30 00:00:00',
    create_at: '2021-09-30 00:00:00',
  },
];

export const fetchTasks = () => {
  return new Promise((resolve) => {
    return resolve(mockTasks);
  });
};

export const postTask = (task: TaskApiProps) => {
  return new Promise((resolve) => {
    return resolve({ ...mockTasks, task });
  });
};

type TaskApiProps = {
  title: string;
  detail: string;
  priority?: number;
  status?: TaskStatus;
};

export type TaskResponce = {
  id: number;
  priority: number;
  title: string;
  detail: string;
  categories: {
    id: number;
    label: string;
  };
};

export type TaskStatus = 'open' | 'close';
