import tasksRepository from "./initialize"
import { FactoryProps as TaskProps } from "../../models/entities/Task"
import { StoreType } from "../../redux"
import { TodoActions } from "../../redux/actions"

/**
 * UseCase/ ユーザは、タスクを追加する
 *
 * @param props.name (Task.FactoryProps['name']) タスク名
 * @param props.detail (Task.FactoryProps['detail']) タスクの詳細文
 * ※他の要素はおって実装する
 *
 * - ユーザは、タスクの情報を入力する
 * - アプリケーションは、タスクの情報を受け付けて検証し、誤りがある場合はエラー情報をストアへ渡す
 * - アプリケーションは、タスクの情報をシステムに送信し保存する
 * - アプリケーションは、新しいタスクを一覧へ追加する
 */
export async function userAddTask(
  store: StoreType, // storeはDIにして疎結合
  { name, detail }: TaskProps
) {
  // 初期化したリポジトリインスタンスを取得
  const repository = await tasksRepository

  // リポジトリにタスクを追加する（システムに送信し保存）
  const task = await repository.addTask({ name, detail }).catch((e) => {
    if (e instanceof Error) {
      // タスクの生成や追加に失敗をすればエラーをキャッチしてstoreへエラー情報をdispatchする
      store.dispatch({
        type: TodoActions.Type.ADD_TASK_ERROR,
        payload: {
          expection: e,
        },
      })
    }
  })

  // 成功したらstoreへdispatchする（新しいタスクを一覧へ追加）
  store.dispatch({
    type: TodoActions.Type.ADD_TASK,
    payload: {
      task,
    },
  })
}
