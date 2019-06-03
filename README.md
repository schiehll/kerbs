# kerbs

> Onboard new devs into your project

[![version](https://img.shields.io/npm/v/@schiehll/kerbs.svg?style=flat-square)](http://npm.im/@schiehll/kerbs)

## Demo

Here's a live demo of how Kerbs looks like, containing the documentation of Kerbs itself:

https://kerbs.netlify.com/

## The problem

Sometimes you are not the one starting the project from scratch, and it takes some time to understand how everything is glued together and all the reasoning behind the decisions made by the ones before you.

If you ever took some time to get back to your own sideproject you know that even the projects you started doesn't make much sense after a while.

Also, how many open source contributions have ceased to occur because someone willing to contribute did not knew where to start?

## This solution

Kerbs try to make the process of onboarding people into new projects easier to reproduce and evolve.

It does it by providing a simple and fast way of documenting your project, things like where this file goes and why, which's the tech stack, how to install and run it, etc.

## Installation

This project is distributed as a node modules and
should be installed as one of your project's `devDependencies`:

```bash
npm install @schiehll/kerbs --save-dev
```

Or if you prefer to use `yarn`:

```bash
yarn add @schiehll/kerbs --dev
```

## Usage

There's only 3 commands in Kerbs CLI:

### init

`init` will create the initial config file `.kerbsrc.js` in the root of your project as well as a `kerbs` folder with some initial documentation template.

```bash
kerbs init
```

### dev

`dev` will start a development server that will update in realtime while you edit your docs.

```bash
kerbs dev
```

### build

`build` will generate a `kerbs_public` folder that will contains a static site for your docs.

```bash
kerbs build
```

You can then deploy this folder wherever you prefer. We recomend [Netlify](https://www.netlify.com/) as it's free and as simple as drag and drop your `kerbs_public` folder and be done with it.

## Writing documentation

Once you have ran the `kerbs init` command you will have a `kerbs` folder in your project's root.

Inside this folder you will have some [mdx](https://github.com/mdx-js/mdx) files, which are basically markdown, but with components support.

Those are the files that compose your documentation. You can edit those files, remove them and create new ones as you like, but that initial template was created as a minimal documentation requirement, so we recomend that you have at least those in place with your specific project details.

### Using components inside your doc files

You can import any react component inside a mdx file, and Kerbs have some built-in ones that will help you with your docs.

You can see all the components that Kerbs have built-in in this repo's `src/components` folder.

#### Link component

The `Link` component uses [svgporn](https://github.com/gilbarbara/logos) data to show a logo of the tech you are linking to. If there's no data about the given tech it will simply not have a logo and will falback the url to `href="#"`.

Here's a example:

```mdx
// You can import built-in Kerbs components like below
// You can see all the components that Kerbs have built-in in this repo's `src/components` folder

import Link from 'components/link'

// All your documentation files have to export this meta object,
// the title is used as the sidebar menu item name and the order to sort it there.
// If you omit the order in meta, it will be defined as 0, and the order will then be alfabetical.

export const meta = {
  title: 'Link Example',
  order: 1
}

# Link Example

Here's a link for <Link to="nodejs">node</Link>, it will automatically have a logo and a link to the nodejs website.

## Customizing the link

You can customize the link it will use by giving it a `href` prop:

<Link to="github" href="https://github.com/schiehll/kerbs">
  Kerbs repo
</Link>

This link above will use the github logo from scgporn while directing who clicks on it to this repo.
```

#### LinkListItem component

It uses the `Link` component under the hood, so it will also get the logo and link from [svgporn](https://github.com/gilbarbara/logos).

Here's a example:

```mdx
// You can import built-in Kerbs components like below
// You can see all the components that Kerbs have built-in in this repo's `src/components` folder

import List from 'components/list'
import LinkListItem from 'components/link-list-item'

// All your documentation files have to export this meta object,
// the title is used as the sidebar menu item name and the order to sort it there.
// If you omit the order in meta, it will be defined as 0, and the order will then be alfabetical.

export const meta = {
  title: 'LinkListItem Example'
}

# LinkListItem Example

<List>
  <LinkListItem
    to="git"
    description="This will have the git logo and will redirect who clicks on it to the git website"
  />
  <LinkListItem
    to="github"
    name="Kerbs"
    href="https://github.com/schiehll/kerbs"
    description="This will have the github logo, but will redirect who clicks on it to this repo"
  />
</List>
```

#### File structure component

One of Kerbs most useful components is the `FileTree` one, which gives yout the ability to describe you project's file structure in a easy and comprehensive way.

Here's a example of how it would looks like:

```mdx
// You can import built-in Kerbs components like below
// You can see all the components that Kerbs have built-in in this repo's `src/components` folder

import FileTree from 'components/file-tree'

// All your documentation files have to export this meta object,
// the title is used as the sidebar menu item name and the order to sort it there.
// If you omit the order in meta, it will be defined as 0, and the order will then be alfabetical.

export const meta = {
  title: 'File Structure',
  order: 4
}

# File Structure

// The paths prop accepts an array of objects.
// Each item in the array is either, a folder or a file.
// If it have a children it's considered a folder, otherwise it's a file.
// If you want to show a folder without any children, just pass an empty array to children.

<FileTree
  paths={[
    {
      name: 'src',
      description: 'Here we have the code for the react app that powers Kerbs.',
      children: [
        {
          name: 'components',
          description: (
            <>
              All react components lives here.
              <div>Each component have an index and a syles file.</div>
              <div>
                Styles files are the only files that should have
                styled-components.
              </div>
            </>
          ),
          children: [
            {
              name: 'some-component',
              description:
                'This component do something specific that is not that clear so we are explaining here.',
              children: [
                {
                  name: 'index.js',
                  description: 'The component implementation.'
                },
                {
                  name: 'styles.js',
                  description: 'The components styles in CSS-in-JS.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: '.eslint',
      description: 'Our eslint configuration.'
    },
    {
      name: '.gitignore',
      description: 'A list of files and folders that should be ignored by git.'
    },
    {
      name: '.prettierrc',
      description: 'Our prettier config.'
    },
    {
      name: 'package.json',
      description: 'Where we list our dependencies and set some scripts.'
    }
  ]}
/>
```

## Creating custom components

You aren't limited to the built-in components, you can create your owns if you like to. Just make sure to use [styled-components](https://www.styled-components.com/) to be able to access the Kerbs' theme variables so it will looks nice in both, light and dark mode.

Here's a example of a custom button component:

```js
// ~/my-custom-components/button.js

import styled from 'styled-components'

export default styled.button`
  cursor: pointer;
  border: none;
  padding: ${({ theme }) => theme.spacing.small}px;
  background: ${({ theme }) => theme.colors.foreground};
  color: currentColor;
`
```

Then in your docs you can just import it:

```mdx
import Button from '../path-to/my-custom-components/button'

export const meta = {
  title: 'Custom Component Example',
  order: 0
}

# Custom Component Example

<Button>My custom button</Button>
```

## Extending the webpack config

Kerbs comes with batteries included, so it will just works out of the box. But if you need some kind of custom configuration, it's possible.

To extend Kerbs' webpack config, pass a `webpackConfig` object in the `.kerbsrc.js` file:

```js
import path from 'path'

export default {
  name: 'Your project name',
  webpackConfig: {
    resolve: {
      modules: [path.resolve(__dirname, 'src')]
    }
  }
}
```

The custom configuration will be merged with the original one using webpack-merge's [smart merging](https://github.com/survivejs/webpack-merge#smart-merging).

## Other solutions

Some open source projects have a `CONTRIBUTING.md` file which usually doesn't help that much, but if someone put the work it could work. But still, it's limited to only markdown, without the components.

In most companies I've worked we usually are onboarded by someone that worked in the project long enought to be able to explain it in their own words. Then you are on your own and will figure it out after some time.

There are companies with better onboarding process of course, but we need a solution simple and easy enought to be used more often.

We could do it with existing documentation solutions, like [docz](https://github.com/pedronauck/docz) or [docusaurus](https://docusaurus.io/) for example, but virtually nobody does, so I think having something dadicated to only project onboarding will help people to actually do it.
