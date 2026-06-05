import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        
        fetch("https://www.swapi.tech/api/people?page=1&limit=10")
            .then(r => r.json())
            .then(data => dispatch({ type: "load_people", payload: data.results }))
            .catch(err => console.error(err));

     
        fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10")
            .then(r => r.json())
            .then(data => dispatch({ type: "load_vehicles", payload: data.results }))
            .catch(err => console.error(err));

        
        fetch("https://www.swapi.tech/api/planets?page=1&limit=10")
            .then(r => r.json())
            .then(data => dispatch({ type: "load_planets", payload: data.results }))
            .catch(err => console.error(err));
    }, []);

    const isFavorite = (uid, type) =>
        store.favorites.some(f => f.uid === uid && f.type === type);

    const toggleFavorite = (item, type) => {
        const payload = { uid: item.uid, name: item.name, type };
        if (isFavorite(item.uid, type)) {
            dispatch({ type: "remove_favorite", payload });
        } else {
            dispatch({ type: "add_favorite", payload });
        }
    };

    const renderCards = (items, type) => {
        if (!items || items.length === 0) {
            return <p className="text-secondary">Loading...</p>;
        }
        return (
            <div className="d-flex overflow-auto gap-3 pb-3">
                {items.map(item => (
                    <div
                        key={item.uid}
                        className="card text-white bg-dark border-secondary"
                        style={{ minWidth: "220px" }}
                    >
                        <img
                            src={`https://starwars-visualguide.com/assets/img/${
                                type === "people" ? "characters" : type
                            }/${item.uid}.jpg`}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "200px", objectFit: "cover" }}
                            onError={e => {
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }}
                        />
                        <div className="card-body">
                            <h6 className="card-title">{item.name}</h6>
                            <div className="d-flex justify-content-between mt-2">
                                <Link
                                    to={`/single/${type}/${item.uid}`}
                                    className="btn btn-sm btn-outline-warning"
                                >
                                    Learn more!
                                </Link>
                                <button
                                    className={`btn btn-sm ${
                                        isFavorite(item.uid, type)
                                            ? "btn-warning"
                                            : "btn-outline-warning"
                                    }`}
                                    onClick={() => toggleFavorite(item, type)}
                                >
                                    {isFavorite(item.uid, type) ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container-fluid px-4 py-4" style={{ background: "#1a1a2e", minHeight: "100vh" }}>
            <h2 className="text-warning mb-4">Characters</h2>
            {renderCards(store.people, "people")}

            <h2 className="text-warning mt-5 mb-4">Vehicles</h2>
            {renderCards(store.vehicles, "vehicles")}

            <h2 className="text-warning mt-5 mb-4">Planets</h2>
            {renderCards(store.planets, "planets")}
        </div>
    );
};