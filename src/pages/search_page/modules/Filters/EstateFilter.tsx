import { useAppSelector, useAppDispatch } from "@src/hook.ts";
import { setMinSquare, setUlParams, getActiveCategory } from "@search_page/SearchPageReducer";
import { UlCrafter } from "@src/utils/html_elems_craft";

/**
	Этот компонент отвечает за фильтр "Недвижимость"
	Используется в _Filters.tsx
*/

export const EstateFilter = () => {
	const dispatch = useAppDispatch();
	const changeUlParams = (e) => {
		dispatch(
			setUlParams({
				type: e.target.type,
				filter: e.target.dataset.filter,
				subfilter: e.target.dataset.subfilter,
				value: e.target.value,
			})
		);
	};

	// Видимость
	const prodCatFilter = useAppSelector((state) => state.SearchPageReducer.prodCatFilter);
	const activeFilter = getActiveCategory(prodCatFilter);
	let filterClasses = "filter__estate";
	if (activeFilter !== "Недвижимость" || activeFilter === "Все") filterClasses += " hidden";

	// Минимальная площадь
	let minSquare = Number(
		useAppSelector((state) => state.SearchPageReducer.estateFilter.minSquare[0].value)
	);
	let minSquareValue;
	if (minSquare == 0) {
		minSquareValue = "";
	}
	const changeMinSquare = (e) => {
		const newValue = Number(e.target.value);
		dispatch(setMinSquare(newValue));
	};

	// Тип недвижимости
	const estateTypeData = useAppSelector((state) => state.SearchPageReducer.estateFilter.estateType);
	const estateTypeUlClasses = "filter__checkboxes-list filter__checkboxes-list--estate ";
	const estateTypeBtns = UlCrafter("checkbox", estateTypeData, estateTypeUlClasses, changeUlParams);

	// Количество комнат
	const roomsQuantityData = useAppSelector(
		(state) => state.SearchPageReducer.estateFilter.roomsQuantity
	);
	const roomsQuantityUlClasses = "filter__ram-list";
	const roomsQuantityBtns = UlCrafter(
		"radio",
		roomsQuantityData,
		roomsQuantityUlClasses,
		changeUlParams
	);

	return (
		<div className={filterClasses}>
			<fieldset className="filter__type">
				<legend>Тип недвижимости</legend>
				{estateTypeBtns}
			</fieldset>
			<div className="filter__min-square">
				<label htmlFor="square">
					Минимальная площать, м<sup>2</sup>
				</label>
				<input
					onChange={changeMinSquare}
					type="number"
					id="square"
					name="min-square"
					min="0"
					value={minSquare || ""}
					placeholder="0"
				/>
			</div>
			<fieldset className="filter__radiobuttons filter__radiobuttons--ram">
				<legend>Количество комнат</legend>
				{roomsQuantityBtns}
			</fieldset>
		</div>
	);
};
