import React from 'react';

export const EmptyState: React.FC<{ message?: string }> = ({ message }) => (
  <div style={{ textAlign: 'center', padding: 32, color: '#a6a6a6' }}>
    {message ?? 'Nothing was found. Try changing the search query'}
  </div>
);
