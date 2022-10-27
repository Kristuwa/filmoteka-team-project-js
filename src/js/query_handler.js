'use strict';

import axios from 'axios';

// Team-lead API key:
const MOVIEDB_KEY = 'e5b8bd1b82d4f5b68280cf1e2b92e5f6';

export class QueryHandler {
  constructor() {
    this.page = 1;
    this.perPage = 100;
    this.searchQuery = '';
    this.movieId = null;
    this.axios = require('axios');
  }
  // Get trending movies per last Week:
  async fetchQueryResultsForTrending() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIEDB_KEY}`
      );
      const data = response.data.results;
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  // Search for movies:
  async fetchQueryResultsForMovieSearch() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`
      );
      const data = response.data.results;
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  // Get the primary information about a movie:
  async fetchQueryResultsForMovieInfo() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${MOVIEDB_KEY}&language=en-US`
      );
      const data = response.data;
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  // Get the videos that have been added to a movie:
  async fetchQueryResultsForVideo() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=${MOVIEDB_KEY}&language=en-US`
      );
      const data = response.data.results;
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
