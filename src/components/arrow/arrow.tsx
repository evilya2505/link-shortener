import React from "react";
import arrowIcon from '../../images/down-arrow.png';
import arrowStyles from './arrow.module.css';

interface IArrowProps {
  isOpen: boolean;
}

const Arrow: React.FC<IArrowProps> = ({ isOpen }: IArrowProps): JSX.Element => {
  return (
    <img className={`${arrowStyles.icon} ${isOpen ? arrowStyles.rotatedIcon : '' }`} src={arrowIcon} alt={`${isOpen ? 'иконка стрелки вверх' : 'иконка стрелки вниз' }`}/>
  );
};

export default Arrow;