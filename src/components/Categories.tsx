import {FC, memo} from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
  categories: Array<string>;
}

const Categories: FC<CategoriesProps> = memo(({value, onChangeCategory, categories}) => {
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>
          ))
        }
      </ul>
    </div>
  )
})

export default Categories;
