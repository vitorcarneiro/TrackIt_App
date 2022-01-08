import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function login(clientLogin) {
  const promise = axios.post(`${BASE_URL}/auth/login`, clientLogin);
  return promise;
};

function signUp(clientData) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, clientData);
  return promise;
};

// function createHabit(showtimeId) {
//   const promise = axios.get(`${BASE_URL}/showtimes/${showtimeId}/seats`);
//   return promise;
// }

function getTodayHabits(user) {
  const promise = axios.get(`${BASE_URL}/habits/today`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );
  return promise;
}

function checkHabit(token, task) {
  const promise = axios.post(`${BASE_URL}/habits/${task.id}/check`,
    task,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function uncheckHabit(token, task) {
  const promise = axios.post(`${BASE_URL}/habits/${task.id}/uncheck`,
  task,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

// function habitsToday(booking) {
//   const promise = axios.get(`${BASE_URL}/seats/book-many`, booking);
//   return promise;
// }

// function habitDone(booking) {
//   const promise = axios.post(`${BASE_URL}/seats/book-many`, booking);
//   return promise;
// }

// function habitsHistory(booking) {
//   const promise = axios.get(`${BASE_URL}/seats/book-many`, booking);
//   return promise;
// }

export {
  login,
  signUp,
  getTodayHabits,
  checkHabit,
  uncheckHabit
};
