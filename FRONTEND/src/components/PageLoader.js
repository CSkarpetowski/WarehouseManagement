import React from 'react'
import './PageLoader.css';
import { Vortex } from 'react-loader-spinner';
export default function PageLoader() { //Przeładowanie strony
  return (
    <div className='page-loader'>
  <Vortex
  visible={true}
  height="200"
  width="200"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/>
</div>
  )
}
