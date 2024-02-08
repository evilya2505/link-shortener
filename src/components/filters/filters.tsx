import React from "react";
import filters from './filters.module.css';
import Filter from "../filter/filter";

interface IFiltersProps {

}

const Filters: React.FC<IFiltersProps> = ({ }: IFiltersProps): JSX.Element => {
    const optionsText = [
        'Не выбрано',
        'В алфавитном порядке',
        'В обратном порядке',
    ];
    const optionsNumber = [
        'Не выбрано',
        'По возрастанию',
        'По убыванию',
    ];

    function handleFilterClick() {
        console.log("click");
    }
  return (
    <>
        <h3 className={filters.title}>Сортировка</h3>
        <ul className={filters.filters}>
            <li className={filters.filter}>
                <Filter handleFilterClick={handleFilterClick} title="Короткая ссылка" options={optionsText}/>
            </li>
            <li className={filters.filter}>
                <Filter handleFilterClick={handleFilterClick} title="Исходная ссылка" options={optionsText}/>
            </li>
            <li className={filters.filter}>
                <Filter handleFilterClick={handleFilterClick} title="Количество переходов" options={optionsNumber}/>
            </li>
        </ul>
    </>
  );
};

export default Filters;