export function initStore(get) {
    return function(dispatch) {
      dispatch({ type: "LOADING", payload: "LOADING" });
      return fetch(get)
          .then(response => response.json())
          .then(json => {                   
              dispatch({ type: "INIT_STORE", payload: json });                      
          })
          .catch(e=>console.log(e))
    };
  }
export function addDog(data) {
  return function() {
    return fetch("http://localhost:3001/dog",{
      method:"POST",
      body:data
    })
        .catch(e=>console.log(e))
  };
}  

  // export function getMoviesId(titulo) {
  //   return function(dispatch) {
  //     return fetch(`http://www.omdbapi.com/?i=${titulo}&apikey=dfe7df86`)
  //         .then(response => response.json())
  //         .then(json => {
  //           dispatch({ type: "GET_MOVIES", payload: json });
  //         });
  //   };
  // }  
  
 