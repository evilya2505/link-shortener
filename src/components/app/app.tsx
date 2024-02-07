import React, { useEffect } from 'react';
import app from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import { useLocation, useNavigate   } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useDispatch } from '../../services/hooks';
import { setUserInfo } from '../../services/reducers/auth';
import NewLinkPage from '../../pages/new-link';
import StatisticsPage from '../../pages/statistics';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Если location "/" перенаправлять на dashboard
    if (location.pathname === '/') {
      navigate("/new-link");
    }
  }, [location, navigate])

  /* Проверка наличия токена и юзернейма в local storage
  (в идеале проверять валидность токена или отправлять запрос на получение данных о пользователе, но в данном случае проверяется только его наличие в local storage) */
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    const username = localStorage.getItem("username");

    // Если access token и username хранятся в local storage, то сохраняем username в хранилище redux
    if (accessToken && username) {
      dispatch(setUserInfo( { username: username } ));
    }
  }, [dispatch]);

  return (
    <div className={app.app}>
      {/* Роуты */}
      <Routes>
        {/* Роут авторизации */}
        <Route
          path="/login"
          element={
            <OnlyUnAuth
              component={<LoginPage />}
            />
          }
        />

        {/* Роут регистрации */}
        <Route
          path="/register"
          element={
            <OnlyUnAuth
              component={
                <RegisterPage />
              }
            />
          }
        />
        {/* Роут страниы создания новой ссылки */}
          <Route
          path="/new-link"
          element={
            <OnlyAuth
              component={
                <NewLinkPage />
              }
            />
          }
        />
        {/* Роут страниы статистики */}
        <Route
          path="/statistics"
          element={
            <OnlyAuth
              component={
                <StatisticsPage />
              }
            />
          }
        />
        <Route
          path="/statistics/page/:pageNumber"
          element={
            <OnlyAuth
              component={
                <StatisticsPage />
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
