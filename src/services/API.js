import axios from "axios";

const BASE_URL = "https://mock-api.driven.com.br/api/v4/cineflex";

function getMovies() {
  const promise = axios.get(`${BASE_URL}/movies`);
  return promise;
}

function getShowtimes(movieId) {
  const promise = axios.get(`${BASE_URL}/movies/${movieId}/showtimes`);
  return promise;
}

function getSeats(showtimeId) {
  const promise = axios.get(`${BASE_URL}/showtimes/${showtimeId}/seats`);
  return promise;
}

function createBooking(booking) {
  const promise = axios.post(`${BASE_URL}/seats/book-many`, booking);
  return promise;
}

export {
  getMovies,
  getShowtimes,
  getSeats,
  createBooking
}