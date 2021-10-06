import Entity from "../shared/Entity"
import CategoryName, { CategoryNameProps } from "../values/CategoryName"

/**
 * - カテゴリ名
 */
export default class Category extends Entity<CategoryProps> {
  public getName() {
    return this.props.name
  }

  public static factory(props: FactoryProps) {
    const name = CategoryName.factory({
      value: props.name.value,
    })

    return new Category({ name })
  }
}

type CategoryProps = {
  id?: number
  name: CategoryName
}

type FactoryProps = {
  name: CategoryNameProps
}
