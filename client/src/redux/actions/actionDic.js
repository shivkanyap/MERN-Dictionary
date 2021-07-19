import { FETCH_ALL, POST_DATA, SEARCH_WORD } from "./types";
import axios from "axios";

export const fetchAll = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:5000/word/get");
    if (!response) {
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = response.data; // convert from json to js type
    console.log(resData, "res");
    dispatch({
      type: FETCH_ALL,
      allData: resData,
    });
  };
};

export const postData = (data) => {
  console.log("post", data);

  return async (dispatch) => {
    console.log("here");
    const response = await axios.post("http://localhost:5000/word/add", data);
    if (!response) {
      alert(" Oops,  please enter valid word..!!");
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = await response.data.data; // convert from json to js type
    console.log(resData, "res");

    dispatch({
      type: POST_DATA,
      addedWord: resData,
    });
  };
};

export const fetchSearchData = (searchword) => {
  console.log("dtasearch");
  return async (dispatch) => {
    console.log("here");
    const response = await axios.get(
      `http://localhost:5000/word/search?word=${searchword}`
    );
    if (!response) {
      throw new Error("Something went wrong ..!!");
      // more detail error handling can be done
    }
    const resData = response.data; // convert from json to js type
    console.log(resData, "res");
    dispatch({
      type: SEARCH_WORD,
      allData: resData,
    });
  };
};
