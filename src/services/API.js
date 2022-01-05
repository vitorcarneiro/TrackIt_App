import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function login() {
  const promise = axios.get(`${BASE_URL}/movies`);
  return promise;
}

function signUp(clientData) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, clientData);
  return promise;
}

// function createHabit(showtimeId) {
//   const promise = axios.get(`${BASE_URL}/showtimes/${showtimeId}/seats`);
//   return promise;
// }

// function getHabits(booking) {
//   const promise = axios.post(`${BASE_URL}/seats/book-many`, booking);
//   return promise;
// }

// function deleteSingleHabit(booking) {
//   const promise = axios.post(`${BASE_URL}/seats/book-many`, booking);
//   return promise;
// }

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

const functionsAPI = {
  login,
  signUp
};

export default functionsAPI;