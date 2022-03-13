import * as React from 'react';
import { render } from 'react-dom';
import './options.css';

function Options(): JSX.Element {
  return (
    <div>
      <p>Página de opções</p>
    </div>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
render(<Options />, root);
