import React, { useEffect, useState } from "react";
import table from './table.module.css';
import { useDispatch, useSelector } from "../../services/hooks";
import { getStatistics } from "../../services/actions/statistics";
import { TSqueezeObj } from "../../utils/types";
import lockIcon from '../../images/padlock.png';
import Pagination from "../pagination/pagination";
import { useNavigate } from "react-router-dom";
interface ITableProps {

}

const Table: React.FC<ITableProps> = ({  }: ITableProps): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const statisticsData: TSqueezeObj[] = useSelector(
        (store) => store.statistics.statistics
        );
    const currentPage: number = useSelector(
        (store) => store.pagination.currentPage
        );

    useEffect(() => {
        navigate(`/statistics/page/${currentPage}`);
    }, [navigate, currentPage]);
    
  return (
    <>
    <section className={table.section}>
        <table className={table.table}>
        <thead className={table.thead}>
            <tr className={table.tr}>
            <th className={table.th}>Короткая ссылка</th>
            <th className={table.th}>Полная ссылка</th>
            <th className={table.th}>Количество переходов</th>
            </tr>
        </thead>
        <tbody className={table.tbody}>
            {statisticsData.length > 0 && statisticsData.map((item, index) => (
            <tr key={index} className={table.tr}>
                <td className={table.td}>
                    <a target="_blank" href={`https://front-test.hex.team/s/${item.short}`} className={table.tdLink} rel="noreferrer">{`https://front-test.hex.team/s/${item.short}`}</a>
                </td>
                <td className={table.td}>
                    <a target="_blank" href={item.target}  className={table.tdLink} rel="noreferrer">{item.target}</a>                    
                </td>
                <td className={`${table.td} ${table.counterTd}`}>
                    <p className={table.tdText}>Недоступно<img src={lockIcon} alt="недоступно" className={table.lockIcon}/></p>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </section>
    <Pagination />
    </>
  );
};

export default Table;