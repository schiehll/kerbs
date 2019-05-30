import React from 'react'
import Grid from 'components/shell/grid'

const List = ({ children, ...props }) => {
  return (
    <Grid maxWidth={300} {...props}>
      {children}
    </Grid>
  )
}

export default List
