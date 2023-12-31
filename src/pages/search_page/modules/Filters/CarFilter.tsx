import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setUlParams, setSelectParams, getActiveCategory } from "@search_page/SearchPageReducer";
import { UlCrafter, SelectCrafter } from "@src/utils/html_elems_craft";

/**
	Этот компонент отвечает за фильтр "Автомобили"
	Используется в _Filters.tsx
*/

export const CarFilter = () => {
	const dispatch = useAppDispatch();
	const changeUlParams = (e): void => {
		dispatch(
			setUlParams({
				filter: e.target.dataset.filter,
				type: e.target.type,
				subfilter: e.target.dataset.subfilter,
				value: e.target.value,
			})
		);
	};
	const changeSelectParams = (e): void => {
		dispatch(
			setSelectParams({
				filter: e.target.selectedOptions[0].dataset.filter,
				subfilter: e.target.selectedOptions[0].dataset.subfilter,
				value: e.target.value,
			})
		);
	};

	// Видимость
	const prodCatFilter = useAppSelector((state) => state.SearchPageReducer.prodCatFilter);
	const activeFilter = getActiveCategory(prodCatFilter);
	let filterClasses = "filter__car";
	if (activeFilter !== "Автомобиль" || activeFilter === "Все") filterClasses += " hidden";

	// Минимальный год выпуска
	const minYearData = useAppSelector((state) => state.SearchPageReducer.carFilter.minimalYear);
	const minimalYearFilter = SelectCrafter(minYearData, changeSelectParams);

	// Коробка передач
	const transmissionData = useAppSelector((state) => state.SearchPageReducer.carFilter.transmission);
	const transFilterUlClasses = "filter__radiobuttons-list";
	const transmissionFilter = UlCrafter(
		"radio",
		transmissionData,
		transFilterUlClasses,
		changeUlParams
	);

	// Тип кузова
	const bodyTypeData = useAppSelector((state) => state.SearchPageReducer.carFilter.bodyType);
	const bodyTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--car-body";
	const bodyTypeFilter = UlCrafter("checkbox", bodyTypeData, bodyTypeUlClasses, changeUlParams);

	return (
		<div className={filterClasses}>
			<div className="filter__select-wrapper">
				<legend>Минимальный год выпуска</legend>
				{minimalYearFilter}
			</div>
			<fieldset className="filter__radiobuttons filter__radiobuttons--transmission">
				<legend>Коробка передач</legend>
				{transmissionFilter}
			</fieldset>
			<fieldset className="filter__type filter__type--car-body">
				<legend>Тип кузова</legend>
				{bodyTypeFilter}
			</fieldset>
		</div>
	);
};
