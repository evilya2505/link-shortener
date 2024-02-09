import React, { useState } from "react";
import filter from "./filter.module.css";
import Arrow from "../arrow/arrow";
import { IOption } from "../../utils/types";
import { useSearchParams } from "react-router-dom";

interface IFilterProps {
  options: IOption[];
  title: string;
  name: string;
  defaultOption: IOption;
}

const Filter: React.FC<IFilterProps> = ({
  options,
  name,
  title,
  defaultOption,
}: IFilterProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: IOption) => {
    if (option.label !== selectedOption.label) {
      setSelectedOption(option);
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (option.id) {
        newSearchParams.set(name, option.id);
        switch (name) {
          case "short":
            setSearchParams({ short: option.id });
            break;
          case "target":
            setSearchParams({ target: option.id });
            break;
          case "counter":
            setSearchParams({ counter: option.id });
            break;
        }
      } else {
        newSearchParams.delete(name);
      }
      setSearchParams(newSearchParams);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className={filter.dropdown}>
        <h3 className={filter.title}>{title}</h3>
        <button className={filter.button} onClick={toggleDropdown}>
          {selectedOption.label}
          <Arrow isOpen={isOpen} />
        </button>
        {isOpen && (
          <ul className={filter.list}>
            {options.map((option, index) => (
              <li
                className={filter.listItem}
                key={index}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Filter;
