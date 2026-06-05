import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const removeFavorite = (item) => {
        dispatch({ type: "remove_favorite", payload: item });
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand fw-bold text-warning">
                ⭐ Star Wars Blog
            </Link>

            <div className="dropdown">
                <button
                    className="btn btn-warning dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    Favorites ({store.favorites.length})
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">No favorites yet</li>
                    ) : (
                        store.favorites.map((item, i) => (
                            <li
                                key={i}
                                className="dropdown-item d-flex justify-content-between align-items-center"
                            >
                                <Link
                                    to={`/single/${item.type}/${item.uid}`}
                                    className="text-dark text-decoration-none me-2"
                                >
                                    {item.name}
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeFavorite(item)}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};