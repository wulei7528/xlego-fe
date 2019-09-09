import React from 'react'
import { Link } from 'dva/router'

function NavLink({ target, linkText }) {
  return <Link to={target}>{linkText}</Link>
}

export default NavLink
