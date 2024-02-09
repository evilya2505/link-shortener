import { useEffect } from "react";
import app from "./app.module.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import { useLocation, useNavigate } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { useDispatch, useSelector } from "../../services/hooks";
import NewLinkPage from "../../pages/new-link";
import StatisticsPage from "../../pages/statistics";
import { checkIsTokenValid } from "../../services/actions/auth";
import NotFoundPage from "../../pages/not-found";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  useEffect(() => {
    // Если location "/" перенаправлять на /new-link
    if (location.pathname === "/") {
      navigate("/new-link");
    }
  }, [location, navigate]);

  // Отправляем запрос для получени статистики, чтобы проверить, что токен актуален
  useEffect(() => {
    dispatch(checkIsTokenValid());
  }, [dispatch]);

  useEffect(() => {
    if (
      !loggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      localStorage.getItem("username")
    ) {
      localStorage.setItem("token_error", "true");
      navigate("/login");
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <div className={app.app}>
      {/* Роуты */}
      <Routes>
        {/* Роут авторизации */}
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        {/* Роут регистрации */}
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        {/* Роут страниы создания новой ссылки */}
        <Route
          path="/new-link"
          element={<OnlyAuth component={<NewLinkPage />} />}
        />
        {/* Роут страницы статистики */}
        <Route
          path="/statistics/"
          element={<OnlyAuth component={<StatisticsPage />} />}
        />
        <Route
          path="/statistics/page/:pageNumber"
          element={<OnlyAuth component={<StatisticsPage />} />}
        />
        {/* Маршрут для обработки неизвестных URL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
