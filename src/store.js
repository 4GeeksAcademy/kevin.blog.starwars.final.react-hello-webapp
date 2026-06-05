export const initialStore = () => {
    return {
        people: [],
        vehicles: [],
        planets: [],
        favorites: []
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {

        case 'load_people':
            return { ...store, people: action.payload };

        case 'load_vehicles':
            return { ...store, vehicles: action.payload };

        case 'load_planets':
            return { ...store, planets: action.payload };

        case 'add_favorite':
            // Evita duplicados
            const exists = store.favorites.find(
                f => f.uid === action.payload.uid && f.type === action.payload.type
            );
            if (exists) return store;
            return { ...store, favorites: [...store.favorites, action.payload] };

        case 'remove_favorite':
            return {
                ...store,
                favorites: store.favorites.filter(
                    f => !(f.uid === action.payload.uid && f.type === action.payload.type)
                )
            };

        default:
            throw Error('Unknown action.');
    }
}