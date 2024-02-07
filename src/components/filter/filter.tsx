import React, { useState } from "react";
import filter from './filter.module.css';
import arrowIcon from '../../images/down-arrow.png';
import Arrow from "../arrow/arrow";

interface IFilterProps {
  options: string[];
  title: string;
}

const Filter: React.FC<IFilterProps> = ({  options, title }: IFilterProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const selectOption = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
  return (
    <>
    <div className={filter.dropdown}>
      <h3 className={filter.title}>{title}</h3>
      <button className={filter.button} onClick={toggleDropdown}>
        {selectedOption}
        <Arrow isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className={filter.list}>
          {options.map((option, index) => (
            <li className={filter.listItem} key={index} onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default Filter;