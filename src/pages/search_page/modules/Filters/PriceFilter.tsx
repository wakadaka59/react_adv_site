import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "@src/hook.ts";

import { setChosenPrices } from "@src/pages/search_page/SearchPageReducer";
import { addThinSpacesToNumber } from "@src/utils/prices";

/**
	Этот компонент отвечает за фильтр "Цена"
	Использует сторонний npm-пакет "react-slider"
	Сам используется в _Filters.tsx
*/

export const PriceFilter = () => {
	const dispatch = useAppDispatch();
	const selectedPrices = useAppSelector(
		(state) => state.SearchPageReducer.priceFilter.selectedPrices
	);
	const minBorder = useAppSelector((state) => state.SearchPageReducer.priceFilter.minBorder);
	const maxBorder = useAppSelector((state) => state.SearchPageReducer.priceFilter.maxBorder);
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);

	const changeSelectedPrices = (value) => {
		dispatch(setChosenPrices(value));
	};

	return (
		<div className="filter__range">
			<label>Цена, ₽</label>
			<div className="rs-tooltip-container">
				<div className="rs-tooltip">от {addThinSpacesToNumber(selectedPrices[0])}</div>
				<div className="rs-tooltip">до {addThinSpacesToNumber(selectedPrices[1])}</div>
			</div>
			<ReactSlider
				className="rs-container"
				thumbClassName="rs-thumb"
				trackClassName="rs-colored-line"
				min={minBorder}
				max={maxBorder}
				value={selectedPrices}
				onChange={changeSelectedPrices}
				ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
				ariaLabel={["Lower thumb", "Upper thumb"]}
				pearling
				minDistance={10}
				disabled={favIsActive === true}
			/>
		</div>
	);
};
