import React from 'react';

import Header from './Header';
import Note from './Note';
import Footer from './Footer';

import notes from '../notes';

function App() {
    return (
        <>
            <Header />
            {notes.map(x => <Note key={x.key} title={x.title} content={x.content}/>)}
            <Footer />
        </>
    );
}

export default App;