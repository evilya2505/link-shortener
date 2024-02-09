import React from "react";
import filters from "./filters.module.css";
import Filter from "../filter/filter";
import { IOption } from "../../utils/types";
import { useSearchParams } from "react-router-dom";

const Filters: React.FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const short = searchParams.get("short");
  const target = searchParams.get("target");
  const counter = searchParams.get("counter");

  const optionsText: IOption[] = [
    { id: "", label: "Не выбрано" },
    { id: "asc_short", label: "В алфавитном порядке" },
    { id: "desc_short", label: "В обратном порядке" },
  ];

  const optionsNumber: IOption[] = [
    { id: "", label: "Не выбрано" },
    { id: "asc_counter", label: "По возрастанию" },
    { id: "desc_counter", label: "По убыванию" },
  ];

  return (
    <>
      <h3 className={filters.title}>Сортировка</h3>
      <ul className={filters.filters}>
        <li className={filters.filter}>
          <Filter
            defaultOption={
              optionsText.find((option) => option.id === short) ||
              optionsText[0]
            }
            title="Короткая ссылка"
            name="short"
            options={optionsText}
          />
        </li>
        <li className={filters.filter}>
          <Filter
            defaultOption={
              optionsText.find((option) => option.id === target) ||
              optionsText[0]
            }
            title="Исходная ссылка"
            name="target"
            options={optionsText}
          />
        </li>
        <li className={filters.filter}>
          <Filter
            defaultOption={
              optionsNumber.find((option) => option.id === counter) ||
              optionsNumber[0]
            }
            title="Количество переходов"
            name="counter"
            options={optionsNumber}
          />
        </li>
      </ul>
    </>
  );
};

export default Filters;
