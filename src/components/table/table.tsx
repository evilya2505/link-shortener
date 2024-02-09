import React from "react";
import table from "./table.module.css";
import { useSelector } from "../../services/hooks";
import { TSqueezeObj } from "../../utils/types";
import Pagination from "../pagination/pagination";
import statisticsIcon from "../../images/statistics.png";

const Table: React.FC = (): JSX.Element => {
  const statisticsData: TSqueezeObj[] = useSelector(
    (store) => store.statistics.statistics
  );
  const pagesAmount: number = useSelector(
    (store) => store.pagination.totalPages
  );

  return (
    <>
      <section className={table.section}>
        <table className={table.table}>
          <thead className={table.thead}>
            <tr className={table.tr}>
              <th className={table.th}>Короткая ссылка</th>
              <th className={table.th}>Полная ссылка</th>
              <th className={table.th}>
                <img
                  src={statisticsIcon}
                  alt="недоступно"
                  className={table.lockIcon}
                />
                Количество переходов
              </th>
            </tr>
          </thead>
          <tbody className={table.tbody}>
            {statisticsData.length > 0 &&
              statisticsData.map((item, index) => (
                <tr key={index} className={table.tr}>
                  <td className={table.td}>
                    <a
                      target="_blank"
                      href={`https://front-test.hex.team/s/${item.short}`}
                      className={table.tdLink}
                      rel="noreferrer"
                    >{`https://front-test.hex.team/s/${item.short}`}</a>
                  </td>
                  <td className={table.td}>
                    <a
                      target="_blank"
                      href={item.target}
                      className={table.tdLink}
                      rel="noreferrer"
                    >
                      {item.target}
                    </a>
                  </td>
                  <td className={`${table.td} ${table.counterTd}`}>
                    <p className={table.tdText}>{item.counter}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      {pagesAmount > 1 && <Pagination />}
    </>
  );
};

export default Table;
