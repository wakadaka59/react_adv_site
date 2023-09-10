import { setActiveCategory } from "./FiltersReducer";
import { useAppSelector, useAppDispatch } from "@src/hook";

export const ProductCategoryFilter = () => {
	const dispatch = useAppDispatch();
	const selectCategory = (e): void => {
		dispatch(setActiveCategory(e.target.value));
	};

	const productCategories = useAppSelector(
		(state) => state.FiltersReducer.productCategoryFilter.categories
	);
	// const activeCategory = useAppSelector((state) => state.FiltersReducer.productCategoryFilter.activeCategory).map()
	const selectCrafter = () => {
		const options = productCategories.map((cat) => (
			<option
				key={cat.name + "_" + cat.value + "_key"}
				id={`${cat.name + '_' + cat.value}`}			
				selected={cat.checked === true ? true : false}
				onChange={selectCategory}
				value={cat.value}
			>
				{cat.text}
			</option>
		));
		return (
			<select id="categories" name="categories" onChange={selectCategory}>
				{options}
			</select>
		);
	};

	return (
		<div className="filter__select-wrapper">
			<label htmlFor="categories">Категория товаров</label>
			{selectCrafter()}
			<svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
				/>
			</svg>
		</div>
	);
};
