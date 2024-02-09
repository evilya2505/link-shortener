import React, { ReactNode } from "react";
import circleStyles from "./circle.module.css";

interface ICircleProps {
  forKey: number | string;
  index: number;
  isActive: boolean;
  handleClick: ((index: number) => void) | (() => void);
  isLoading: boolean;
  children: ReactNode;
  isVisible: boolean;
}

const Circle: React.FC<ICircleProps> = ({
  index,
  forKey,
  isActive,
  children,
  isLoading,
  isVisible,
  handleClick,
}: ICircleProps): JSX.Element => {
  return (
    <li key={forKey} className={circleStyles.listItem}>
      <button
        className={`${
          isVisible
            ? `${circleStyles.circle} ${
                isActive ? circleStyles.circleActive : ""
              }`
            : circleStyles.circleHidden
        } `}
        type="button"
        onClick={() => handleClick(index)}
        disabled={isLoading}
      >
        {children}
      </button>
    </li>
  );
};

export default Circle;
