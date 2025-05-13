import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'AgriMart | Farming Supplies',
  description: 'High-quality farming tools, seeds, and fertilizers',
  keywords: 'farming, agriculture, tools, seeds, fertilizers, pesticides',
};

export default Meta;
