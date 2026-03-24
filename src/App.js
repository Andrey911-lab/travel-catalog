import React from 'react';

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
    }
];

const TravelCard = (props) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '12px',
            backgroundColor: 'white'
        }}>
            <h3>{props.travel.title}</h3>
            <p style={{ color: '#666', fontWeight: 'bold' }}>{props.travel.country}</p>
            <p>{props.travel.description}</p>
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

    const buttonStyle = {
        background: liked ? '#ff6b6b' : 'none',
        border: '1px solid #ff6b6b',
        color: liked ? 'white' : '#ff6b6b',
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer'
    };

    return (
        <button style={buttonStyle} onClick={handleClick}>
            ♥ {likes}
        </button>
    );
};
function App() {
    const handleLike = (id) => {
        console.log('Лайк для', id);
    };
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Каталог путешествий</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {mockTravels.map(travel => (
                    <TravelCard key={travel.id} travel={travel} onLike={() => handleLike(travel.id)} />
                ))}
            </div>
        </div>
    );
}
export default App;