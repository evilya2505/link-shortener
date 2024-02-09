import React, { useMemo } from "react";
import paginationStyles from "./pagination.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  backward,
  choosePage,
  forward,
} from "../../services/reducers/pagination";
import leftArrow from "../../images/left-arrow.png";
import rightArrow from "../../images/right-arrow.png";
import Circle from "../circle/circle";
import GoToForm from "../go-to-form/go-to-form";
import { v4 as uuidv4 } from "uuid";

const Pagination: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentPage: number = useSelector(
    (store) => store.pagination.currentPage
  );
  const totalPages: number = useSelector(
    (store) => store.pagination.totalPages
  );
  const totalPagesArray = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index),
    [totalPages]
  );
  const isLoading: boolean = useSelector((store) => store.statistics.request);

  function onChoosePage(number: number) {
    dispatch(choosePage(number));
  }

  function onForward() {
    dispatch(forward());
  }

  function onBackward() {
    dispatch(backward());
  }

  return (
    <section className={paginationStyles.pagination}>
      <ul className={paginationStyles.list}>
        <Circle
          handleClick={onBackward}
          index={-1}
          forKey={uuidv4()}
          isActive={false}
          isVisible={currentPage !== 1}
          isLoading={isLoading}
        >
          <img
            src={leftArrow}
            className={paginationStyles.icon}
            alt="стрелка влево"
          />
        </Circle>
        {totalPagesArray.map((number, index) => {
          if (
            index < 3 ||
            index === totalPagesArray[totalPagesArray.length - 2] ||
            totalPagesArray.length <= 5
          ) {
            return (
              <Circle
                key={uuidv4()}
                isVisible={true}
                forKey={uuidv4()}
                handleClick={onChoosePage}
                index={index + 1}
                isActive={currentPage === index + 1}
                isLoading={isLoading}
              >
                {number + 1}
              </Circle>
            );
          }

          if (
            index === 3 &&
            (currentPage <= 3 ||
              currentPage === totalPagesArray[totalPagesArray.length - 1])
          ) {
            return (
              <>
                <Circle
                  key={uuidv4()}
                  isVisible={true}
                  forKey={uuidv4()}
                  handleClick={onChoosePage}
                  index={index + 1}
                  isActive={currentPage === index + 1}
                  isLoading={isLoading}
                >
                  {number + 1}
                </Circle>
                <li
                  key={index}
                  className={`${paginationStyles.more} ${paginationStyles.listItem}`}
                >
                  ...
                </li>
              </>
            );
          }

          if (
            index === 3 &&
            currentPage >= 4 &&
            currentPage !== totalPagesArray[totalPagesArray.length - 1]
          ) {
            return (
              <>
                <Circle
                  key={uuidv4()}
                  isVisible={true}
                  forKey={uuidv4()}
                  handleClick={onChoosePage}
                  index={index + 1}
                  isActive={true}
                  isLoading={isLoading}
                >
                  {currentPage}
                </Circle>
                <li
                  key={uuidv4()}
                  className={`${paginationStyles.more} ${paginationStyles.listItem}`}
                >
                  ...
                </li>
              </>
            );
          }

          return null;
        })}
        <Circle
          handleClick={onForward}
          index={-2}
          forKey={uuidv4()}
          isActive={false}
          isVisible={!(currentPage === totalPages)}
          isLoading={isLoading}
        >
          <img
            src={rightArrow}
            className={paginationStyles.icon}
            alt="стрелка вправо"
          />
        </Circle>
      </ul>
      <GoToForm choosePage={onChoosePage} isDisabled={isLoading} />
    </section>
  );
};

export default Pagination;
