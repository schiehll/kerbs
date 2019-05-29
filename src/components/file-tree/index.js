import React, { useState } from 'react'
import List from 'components/list'

import * as S from './styles'

const FileTree = ({ files }) => {
  const [tree, setTree] = useState(files)

  const handleItemClick = file => {
    console.log('file', file)
    setTree(files)
  }

  return (
    <List>
      {tree.map((file, index) => (
        <S.Button key={index} onClick={() => handleItemClick(file)}>
          <S.Item
            isFolder={file.isFolder}
            icon={file.isFolder ? S.FolderIcon : S.FileIcon}
            {...file}
          />
        </S.Button>
      ))}
    </List>
  )
}

export default FileTree
