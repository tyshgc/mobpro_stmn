import TasksRepository from "../../repositories/task"

// リポジトリを初期化してインスタンスをimportできるようにしてます。
const repository = TasksRepository.initialize()
export default repository
