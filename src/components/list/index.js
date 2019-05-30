import React from 'react'
import Grid from 'components/shell/grid'

const List = ({ children, ...props }) => {
  return <Grid {...props}>{children}</Grid>
}

export default List
