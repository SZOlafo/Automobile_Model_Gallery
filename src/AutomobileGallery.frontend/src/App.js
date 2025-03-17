import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from './components/Layout';
import ModelList from './pages/ModelList';
import DetailsView from './pages/DetailsView';

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModelList />} />
            <Route path="/:id" element={<DetailsView />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
