import tasksRepository from "./initialize"

/**
 * UseCase/ ユーザは、任意条件のタスクを一覧で参照する
 */
export async function referTaskUseCase() {
  const repository = await tasksRepository
  const result = repository.getTasks()
}
