import React from 'react';
// Redux
import { connect } from 'react-redux';
const Footer = ({ toggleCheck }) => {
  const color = toggleCheck ? 'light' : 'dark';
  return (
    <footer className={`footer-${color} Footer-top Footer-Padding`}>
      <div>&copy; 2019 Eden Elmalich</div>
    </footer>
  );
};
const mapStateToProps = state => ({
  toggleCheck: state.toggleReducer.toggleCheck
});
export default connect(mapStateToProps)(Footer);
