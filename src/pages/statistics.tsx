import React, { useEffect } from "react";
import Table from "../components/table/table";
import Filters from "../components/filters/filters";
import statisticsStyles from "./statistics.module.css";
import Header from "../components/header/header";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { getStatistics } from "../services/actions/statistics";
import { useNavigate } from "react-router-dom";
import { choosePage } from "../services/reducers/pagination";
import { ELEMENTS_PER_PAGE } from "../utils/constants";

const StatisticsPage: React.FC = () => {
  let { pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statistics = useSelector((store) => store.statistics.statistics);
  const totalPages = useSelector((store) => store.pagination.totalPages);
  const currentPage = useSelector((store) => store.pagination.currentPage);
  const [searchParams] = useSearchParams();
  const short = searchParams.get("short");
  const target = searchParams.get("target");
  const counter = searchParams.get("counter");

  useEffect(() => {
    const page: number = pageNumber
      ? parseInt(pageNumber, ELEMENTS_PER_PAGE)
      : 1;
    dispatch(choosePage(page < 1 ? 1 : page));
  }, [dispatch, pageNumber, totalPages]);

  useEffect(() => {
    dispatch(
      getStatistics({
        offset: (currentPage - 1) * ELEMENTS_PER_PAGE,
        limit: ELEMENTS_PER_PAGE,
        order: {
          short: short || undefined,
          target: target || undefined,
          counter: counter || undefined,
        },
      })
    );
  }, [counter, currentPage, dispatch, short, target]);

  useEffect(() => {
    navigate(`/statistics/page/${currentPage}?${searchParams.toString()}`);
  }, [currentPage, navigate, searchParams]);

  return (
    <section className={statisticsStyles.section}>
      <Header />

      <div className={statisticsStyles.container}>
        <h2 className={statisticsStyles.title}>Статистика</h2>
        <Filters />
        {statistics.length !== 0 ? (
          <Table />
        ) : (
          <div className={statisticsStyles.linkCointainer}>
            <p className={statisticsStyles.text}>
              Пока что у вас нет созданных ссылок.
            </p>
            <Link className={statisticsStyles.link} to="/new-link">
              Создать ссылку
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatisticsPage;
