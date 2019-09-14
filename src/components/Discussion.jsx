import React from 'react';

export default function ({ match }) {
  return <p>disc {match.params.id}</p>
}