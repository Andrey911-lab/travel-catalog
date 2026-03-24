import React, { useState } from 'react';

const styles = {
    app: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '32px',
        marginBottom: '20px'
    },
    filter: {
        margin: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
    },
    select: {
        marginLeft: '10px',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ddd'
    },
    form: {
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '8px 0',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    textarea: {
        width: '100%',
        padding: '8px',
        margin: '8px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        minHeight: '80px'
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    buttonHover: {
        backgroundColor: '#45a049'
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    country: {
        color: '#666',
        fontWeight: 'bold',
        margin: '8px 0'
    },
    description: {
        color: '#333',
        margin: '8px 0'
    },
    likeButton: {
        background: 'none',
        border: '1px solid #ff6b6b',
        color: '#ff6b6b',
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    likedButton: {
        background: '#ff6b6b',
        color: 'white',
        border: '1px solid #ff6b6b',
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    }
};

const mockTravels = [
    {
        id: 1,
        country: 'Италия',
        title: 'Романтическая Венеция',
        description: 'Прогулка на гондолах по каналам',
        likes: 15
    },
    {
        id: 2,
        country: 'Япония',
        title: 'Сакура в Токио',
        description: 'Цветение сакуры и древние храмы',
        likes: 23
    },
    {
        id: 3,
        country: 'Франция',
        title: 'Вкусный Париж',
        description: 'Круассаны, сыры и Эйфелева башня',
        likes: 12
    },
    {
        id: 4,
        country: 'Россия',
        title: 'Красная площадь в Москве',
        description: 'Собор Василия Блаженного и Кремль',
        likes: 42
    }
];

const TravelCard = (props) => {
    return (
        <div style={styles.card}>
            <h3>{props.travel.title}</h3>
            <p style={styles.country}>{props.travel.country}</p>
            <p style={styles.description}>{props.travel.description}</p>
            <LikeButton likes={props.travel.likes} onLike={props.onLike} />
        </div>
    );
};

const LikeButton = ({ likes, onLike }) => {
    const [liked, setLiked] = React.useState(false);

    const handleClick = () => {
        if (!liked) {
            setLiked(true);
            onLike();
        }
    };

    const buttonStyle = liked ? styles.likedButton : styles.likeButton;

    return (
        <button style={buttonStyle} onClick={handleClick}>
            ♥ {likes}
        </button>
    );
};

const Filter = ({ countries, selectedCountry, onFilterChange }) => {
    return (
        <div style={styles.filter}>
            <label>Фильтр по стране: </label>
            <select
                value={selectedCountry}
                onChange={(e) => onFilterChange(e.target.value)}
                style={styles.select}
            >
                <option value="">Все страны</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );
};

const AddForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        country: '',
        title: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.country && formData.title && formData.description) {
            onAdd({
                ...formData,
                id: Date.now(),
                likes: 0
            });
            setFormData({ country: '', title: '', description: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Добавить новое путешествие</h3>
            <input
                type="text"
                placeholder="Страна"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Название"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={styles.input}
            />
            <textarea
                placeholder="Описание"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={styles.textarea}
            />
            <button type="submit" style={styles.button}>
                Добавить
            </button>
        </form>
    );
};

function App() {
    const [travels, setTravels] = useState(mockTravels);
    const [selectedCountry, setSelectedCountry] = useState('');
    const countries = [...new Set(travels.map(t => t.country))];
    const filteredTravels = selectedCountry
        ? travels.filter(t => t.country === selectedCountry)
        : travels;
    const handleLike = (id) => {
        setTravels(travels.map(travel =>
            travel.id === id
                ? { ...travel, likes: travel.likes + 1 }
                : travel
        ));
    };
    const handleAddTravel = (newTravel) => {
        setTravels([...travels, newTravel]);
    };

    return (
        <div style={styles.app}>
            <h1 style={styles.title}>Каталог путешествий</h1>

            <Filter
                countries={countries}
                selectedCountry={selectedCountry}
                onFilterChange={setSelectedCountry}
            />

            <AddForm onAdd={handleAddTravel} />

            <div style={styles.cardsContainer}>
                {filteredTravels.map(travel => (
                    <TravelCard key={travel.id} travel={travel} onLike={() => handleLike(travel.id)} />
                ))}
            </div>
        </div>
    );
}
export default App;