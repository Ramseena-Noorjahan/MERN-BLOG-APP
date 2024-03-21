import React from 'react'
import { Link } from 'react-router-dom'
//start
const Footer = () => {
  return (
    <footer>
      <ul className="footer__category">
        <li><Link to="/posts/category/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/category/Business">Business</Link></li>
        <li><Link to="/posts/category/Education">Education</Link></li>
        <li><Link to="/posts/category/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/category/Art">Art</Link></li>
        <li><Link to="/posts/category/Investment">Investment</Link></li>
        <li><Link to="/posts/category/Uncategorized">Uncategorized</Link></li>
        <li><Link to="/posts/category/Weather">Weather</Link></li>
     </ul>
     <div className="footer__copyright">
      <small>All right Reserved &copy: Copyright, EGATOR Tutorials.</small>
     </div>
    </footer>
  )
}
//stop

export default Footer