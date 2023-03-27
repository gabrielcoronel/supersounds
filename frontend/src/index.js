import React from 'react';
import ReactDOM from 'react-dom/client';
import CategoriesField from './components/CategoriesField';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Test = () => {
  const [categories, setCategories] = useState([]);

  return <CategoriesField categories={categories} setCategories={setCategories} />;
};
root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);