import './css/App.css';
import React from 'react';
//add-ons
import { useMediaQuery } from 'react-responsive'
//components
import MainSectionComponent from './main-body-section-component/MainSectionComponent';

function App() {
  //Medi Query responsive
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  return (
    <React.Fragment>
      <MainSectionComponent props={[isTabletOrMobile, isPortrait]}/>
    </React.Fragment>
  );
}

export default App;
