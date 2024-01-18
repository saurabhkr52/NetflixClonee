import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import styled from "styled-components";
import SelectGenre from "../components/SelectGenres";


export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  // using dispatch in array [dispatch] is the soultion for React hook useEffect has missing dependecies: 'dispatch' and 'genres'.

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movies", genres }));
    }
  }, [genresLoaded]);

  // important bullshit
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYoffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
  <Container>
  <div className="navbar">
      <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        { movies.length ? <Slider movies={movies} /> : <NotAvailable /> }
      </div>
  </Container>
  );
}


const Container = styled.div`

.data{
  margin-top: 8rem;
  .not-available{
    text-allign: center;
    color: white;
    margin-top: 4rem;
  }
}
`;