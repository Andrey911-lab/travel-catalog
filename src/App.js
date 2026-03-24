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
        </div>
    );
};
function App() {
    return (
        <div>
            <h1>Каталог путешествий</h1>
        </div>
    );
}
export default App;