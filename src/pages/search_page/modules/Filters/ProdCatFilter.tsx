import { setActiveCategory } from "./FiltersReducer";
import { useAppSelector, useAppDispatch } from "@src/hook";
import { selectCrafter } from "./utils";

export const ProductCategoryFilter = () => {
	const dispatch = useAppDispatch();
	const selectCategory = (e): void => {
		dispatch(setActiveCategory(e.target.value));
	};

	const prodCatData = useAppSelector(
		(state) => state.FiltersReducer.prodCatFilter.categories
	);
	const prodCatFilter = selectCrafter('prodCatFilter', 'categories', prodCatData, selectCategory)

	
	
	return (
		<div className="filter__select-wrapper">
			<legend>Категория товаров</legend>
			{prodCatFilter}			
		</div>
	);
};