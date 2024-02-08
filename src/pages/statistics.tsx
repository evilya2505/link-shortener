import React, { useEffect } from "react";
import Table from "../components/table/table";
import Filters from "../components/filters/filters";
import statisticsStyles from './statistics.module.css';
import Header from "../components/header/header";
import { useParams } from "react-router-dom";
import { useDispatch } from "../services/hooks";
import { getStatistics } from "../services/actions/statistics";
import { useLocation } from "react-router-dom";
interface IStatisticsPageProps {
}

const StatisticsPage: React.FC<IStatisticsPageProps> = ({}: IStatisticsPageProps): JSX.Element => {
    let { pageNumber } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        let page:number = pageNumber ? parseInt(pageNumber) : 1;

        dispatch(getStatistics({ offset: (page - 1) * 10, limit: 10 }));
    }, [dispatch, pageNumber])
    
    return (
        <section className={statisticsStyles.section}>
            <Header />

            <div className={statisticsStyles.container}>
                <h2 className={statisticsStyles.containerTitle}>Статистика</h2>
                <Filters />
                <Table />
            </div>
        </section>
  );
};

export default StatisticsPage;