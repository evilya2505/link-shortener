import React from "react";
import { Link } from "react-router-dom";
import notFoundStyles from "./not-found.module.css";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <section className={notFoundStyles.section}>
      <h1 className={notFoundStyles.title}>404 Not Found</h1>
      <p className={notFoundStyles.subtitle}>
        Извините, страница, которую вы искали, не существует.
      </p>
      <Link className={notFoundStyles.link} to="/">
        Вернуться на главную
      </Link>
    </section>
  );
};

export default NotFoundPage;
