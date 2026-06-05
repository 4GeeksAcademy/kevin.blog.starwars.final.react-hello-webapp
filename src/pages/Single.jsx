
import { Link, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 


export const Single = () => {
  
    const { store, dispatch } = useGlobalReducer();

   
    const { type, uid } = useParams();

  
    const [details, setDetails] = useState(null);

   
    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${uid}`)
            .then(r => r.json())
            .then(data => setDetails(data.result.properties))
            .catch(err => console.error(err));
    }, [type, uid]);

   
    const isFav = store.favorites.some(f => f.uid === uid && f.type === type);

  
    const toggleFavorite = () => {
        const payload = { uid, name: details?.name, type };
        dispatch({ type: isFav ? "remove_favorite" : "add_favorite", payload });
    };

    
    const imgSrc = `https://starwars-visualguide.com/assets/img/${
        type === "people" ? "characters" : type
    }/${uid}.jpg`;

  
    if (!details) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-warning" role="status"></div>
                <p className="text-warning mt-3">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
          
            <Link to="/">
                <span className="btn btn-primary btn-lg mb-4" role="button">
                    Back home
                </span>
            </Link>

            <div className="row">
                {/* Image column */}
                <div className="col-md-4">
                    <img
                        src={imgSrc}
                        alt={details.name}
                        className="img-fluid rounded"
                        onError={e => {
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}
                    />
                </div>

               
                <div className="col-md-8 text-white">
                    
                    <h1 className="display-4 text-warning">{details.name}</h1>
                    <hr className="my-4" /> 

                    <button
                        className={`btn mb-4 ${isFav ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={toggleFavorite}
                    >
                        {isFav ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
                    </button>

                   
                    <table className="table table-dark table-bordered">
                        <tbody>
                            {Object.entries(details)
                                .filter(([key]) =>
                                    !["url", "created", "edited", "films", "residents", "pilots", "name"].includes(key)
                                )
                                .map(([key, value]) => (
                                    <tr key={key}>
                                        <th className="text-warning text-capitalize" style={{ width: "35%" }}>
                                            {key.replace(/_/g, " ")}
                                        </th>
                                        <td>{value || "n/a"}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
