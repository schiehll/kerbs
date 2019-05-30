import React, { Fragment, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import List from 'components/list'
import { FiChevronRight } from 'react-icons/fi'
import nanoid from 'nanoid'

import * as S from './styles'

const generatePathsIds = paths => {
  return paths.map(path => {
    let childsWithId = null
    if (path.children) {
      childsWithId = generatePathsIds(path.children)
    }

    return {
      id: nanoid(),
      ...path,
      ...(childsWithId ? { children: childsWithId } : {})
    }
  })
}

const findByIdInTree = (tree, id) => {
  return tree.reduce((found, path) => {
    if (path.id === id) {
      return path
    }

    if (path?.children?.length > 0) {
      const foundChild = findByIdInTree(path.children, id)
      if (foundChild) return foundChild
    }

    return found
  }, null)
}

const FileTree = ({ paths }) => {
  const root = useRef(null)
  const [breadcrumb, setBreadcrumb] = useState([])
  const [tree, setTree] = useState([])

  const handleItemClick = path => {
    if (path?.children?.length > 0) {
      setTree(path.children)
      setBreadcrumb(breadcrumb.concat(path))
    }
  }

  const handleBreadcrumbClick = id => {
    if (breadcrumb[breadcrumb.length - 1]?.id === id) {
      return
    }

    let pathFound = null

    if (id === root.current.id) {
      pathFound = root.current
    } else {
      pathFound = findByIdInTree(root.current.children, id)
    }

    if (pathFound) {
      setTree(pathFound.children)
      setBreadcrumb(
        breadcrumb.slice(0, breadcrumb.findIndex(b => b.id === id) + 1)
      )
    }
  }

  useEffect(() => {
    const newTree = generatePathsIds(paths)
    setTree(newTree)
    root.current = {
      id: '__ROOT__',
      name: '~ root',
      children: newTree
    }
    setBreadcrumb([root.current])
  }, [paths])

  return (
    <Fragment>
      <S.Breadcrumb>
        {breadcrumb.map((path, index) => {
          return (
            <S.BreadcrumbItem
              key={path.id}
              onClick={() => handleBreadcrumbClick(path.id)}
            >
              {path.id !== root.current.id && (
                <S.BreadcrumbSeparator
                  isActive={index === breadcrumb.length - 1}
                >
                  <FiChevronRight />
                </S.BreadcrumbSeparator>
              )}
              <S.BreadcrumbPath isActive={index === breadcrumb.length - 1}>
                {path.name}
              </S.BreadcrumbPath>
            </S.BreadcrumbItem>
          )
        })}
      </S.Breadcrumb>
      <S.Helper>You can navigate by clicking in a folder below</S.Helper>
      <List>
        {tree.map((file, index) => (
          <S.Button key={index} onClick={() => handleItemClick(file)}>
            <S.Item
              isFolder={file.children}
              icon={
                file.children
                  ? file.children.length === 0
                    ? S.EmptyFolderIcon
                    : S.FolderIcon
                  : S.FileIcon
              }
              {...file}
            />
          </S.Button>
        ))}
      </List>
    </Fragment>
  )
}

FileTree.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      children: PropTypes.array
    })
  )
}

export default FileTree
