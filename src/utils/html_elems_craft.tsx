/**
	Этот компонент отвечает за создание инпутов с типом checkbox, radio, select
	Используется во всех фильтрах, кроме фильтра цены	
*/

import { useAppSelector } from "@src/hook";

/**
	UlCrafter. Делает чекбоксы и радиокнопки.
	На вход принимает:
		inputType: "checkbox" или "radio"
		data: массив с объектами из стейта, например:
			laptopType: [
				{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			],
		ulClasses: специфичные для места расположения css-классы
		eventHandler: функция-обработчик событий
*/

export const UlCrafter = (inputType, data, ulClasses, eventHandler) => {
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	let liClasses;
	switch (inputType) {
		case "checkbox":
			liClasses = "filter__checkboxes-item";
			break;
		case "radio":
			liClasses = "filter__radiobuttons-item";
			break;
	}

	const list = data.map((item) => {
		return (
			<li className={liClasses} key={item.subfilter + "_" + item.value + "_key"}>
				<input
					className="visually-hidden"
					type={inputType}
					value={item.value}
					id={`${item.subfilter + "_" + item.value}`}
					onChange={eventHandler}
					data-filter={item.filter}
					data-subfilter={item.subfilter}
					checked={item.checked === true}
					disabled={favIsActive === true}
				/>
				<label htmlFor={`${item.subfilter + "_" + item.value}`}>{item.text}</label>
			</li>
		);
	});

	return <ul className={ulClasses}>{list}</ul>;
};

/**
	SelectCrafter. Делает инпуты с типом Селект.
	На вход принимает:		
		data: массив с объектами из стейта, например:
			laptopType: [
				{ value: "ultra", checked: false, text: "Ультрабук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "home", checked: false, text: "Домашний ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
				{ value: "gaming", checked: false, text: "Игровой ноутбук", category: "Ноутбук", filter: 'laptopFilter', subfilter: 'laptopType'},
			],
		eventHandler: функция-обработчик событий
*/
export const SelectCrafter = (data, eventHandler) => {
	const favIsActive = useAppSelector((state) => state.SearchPageReducer.favIsActive);
	const options = data.map((item) => (
		<option
			key={item.subfilter + "_" + item.value + "_key"}
			id={`${item.subfilter + "_" + item.value}`}
			value={item.value}
			data-filter={item.filter}
			data-subfilter={item.subfilter}
		>
			{item.text}
		</option>
	));
	// Находим активный элемент и устанавливаем его по-умолчанию на весь <select>, делая компонент управляемым.
	// Ставить defaultValue={item.checked ? item.value : undefined} на сам <option> здесь бесполезно.
	const activeValue = data.find((item) => item.checked)?.value || "";
	return (
		<>
			<select
				value={activeValue}
				title={data[0].subfilter}
				id={data[0].filter + "_" + data[0].subfilter}
				name={data[0].subfilter}
				onChange={eventHandler}
				disabled={favIsActive === true}
			>
				{options}
			</select>
			<svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
				/>
			</svg>
		</>
	);
};
