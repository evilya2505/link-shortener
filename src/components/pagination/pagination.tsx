import React from "react";
import paginationStyles from './pagination.module.css';
import { useDispatch, useSelector } from "../../services/hooks";
import { backward, choosePage, forward } from "../../services/reducers/pagination";
import leftArrow from "../../images/left-arrow.png";
import rightArrow from '../../images/right-arrow.png';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { goToFormSchema } from "../../validations/go-to-validations";
import { GoToFormValues } from "../../utils/types";
import { useNavigate } from "react-router-dom";
interface IPaginationProps {

}

const Pagination: React.FC<IPaginationProps> = ({  }: IPaginationProps): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPage: number = useSelector(
        (store) => store.pagination.currentPage
        );
    const totalPages: number = useSelector(
        (store) => store.pagination.totalPages
        );
    const totalPagesArray: number[] = Array.from({ length: totalPages }, (value, index) => index);
    const isLoading: boolean = useSelector(
        (store) => store.statistics.request
        );

    function onChoosePage(number: number) {
        dispatch(choosePage(number));
    }

    const form = useForm<GoToFormValues>({
        defaultValues: {
          pageNumber: 0,
        },
        resolver: yupResolver(goToFormSchema),
    });

    const { register, handleSubmit } = form;

    function onSubmit(data: GoToFormValues) {
        if (data.pageNumber <= totalPages && data.pageNumber > 0) onChoosePage(data.pageNumber - 1);
    }

    return (
    <section className={paginationStyles.pagination}>
    <ul className={paginationStyles.list}>
    <li key="prev" className={`${paginationStyles.listItem} ${paginationStyles.circle} ${currentPage === 0 ? paginationStyles.circleHidden : ''}`}>
        <button className={paginationStyles.circle} type="button" onClick={() => dispatch(backward())} disabled={isLoading}>
            <img src={leftArrow} className={paginationStyles.icon} alt="стрелка влево" />
        </button>
    </li>

    {totalPagesArray.map((number, index) => {
        // Показывать все элементы без троеточия, если страниц 4 или меньше
        if (totalPagesArray.length <= 4) {
            return (
                <li key={number} className={paginationStyles.listItem}>
                    <button className={`${paginationStyles.circle} ${currentPage === index ? paginationStyles.circleActive : ''}`} type="button" onClick={() => onChoosePage(index)} disabled={isLoading}>
                        {number + 1}
                    </button>
                </li>
            );
        }

        // Первые два элемента всегда отображаются
        if (index < 2) {
            return (
                <li key={index} className={paginationStyles.listItem}>
                    <button className={`${paginationStyles.circle} ${currentPage === index ? paginationStyles.circleActive : ''}`} type="button" onClick={() => onChoosePage(index)} disabled={isLoading}>
                        {number + 1}
                    </button>
                </li>
            );
        }

        // Текущий элемент и, если он больше 2, троеточие после последним элементом
        if ((index === 2 && currentPage !== 3) || ((index === currentPage && currentPage > 1) && (currentPage < totalPagesArray.length - 1))) {
            return (
                <>
                    <li key={index} className={paginationStyles.listItem}>
                        <button className={`${paginationStyles.circle} ${currentPage === index ? paginationStyles.circleActive : ''}`} type="button" onClick={() => onChoosePage(index)} disabled={isLoading}>
                            {number + 1}
                        </button>
                    </li>
                    <li key="more" className={`${paginationStyles.more} ${paginationStyles.listItem}`}>...</li>
                </>
            );
        }

        // Последний элемент
        if (index === totalPagesArray.length - 1) {
            return (
                <li key={index} className={paginationStyles.listItem}>
                    <button className={`${paginationStyles.circle} ${currentPage === index ? paginationStyles.circleActive : ''}`} type="button" onClick={() => onChoosePage(index)} disabled={isLoading}>
                        {number + 1}
                    </button>
                </li>
            );
        }

        return null;
    })}

    <li key="next" className={`${paginationStyles.listItem} ${paginationStyles.circle} ${currentPage === totalPagesArray.length - 1 ? paginationStyles.circleHidden : ''}`}>
        <button className={paginationStyles.circle} onClick={() => dispatch(forward())} type="button" disabled={isLoading}>
            <img src={rightArrow} className={paginationStyles.icon} alt="стрелка вправо" />
        </button>
    </li>
</ul>


        <form className={paginationStyles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <p className={paginationStyles.formTitle}>Перейти на страницу</p>
            <fieldset className={paginationStyles.fieldset}>
                <input 
                    {...register("pageNumber")} 
                    id="pageNumber" 
                    className={paginationStyles.input} 
                    maxLength={totalPagesArray[totalPagesArray.length - 1] ? totalPagesArray[totalPagesArray.length - 1].toString().split("").length : 0}
                />
                <button type="submit" className={paginationStyles.circle} disabled={isLoading}>
                    <img src={rightArrow} className={paginationStyles.icon} alt="стрелка вправо" />
                </button>
            </fieldset>

        </form>
    </section>
  );
};

export default Pagination;