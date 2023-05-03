---
title: 'React life cycle(Class Component)'
date: '2023-05-03'
---

# React life cycle(Class Component)

React life cycle exists only in class components,I will expand from the following aspects.



## Intialization

### constructor hook

 at the stage react will init props and state



## Mounting

### getDerivedStateFromProps(props,state)

state is related on props

### componentWillMount(18 abandoned)

executed when the component is about to be mounted

### Render

executed when state and props change

### componentDidMount

executed when virtual dom converted to real dom

> it is recommended to send request here

> add some subscriptions and operate dom in here

**note**:

componentWillMount and componentDidMount executed only in page refresh



## Updating

### static getDerivedStateFromProps

### shouldComponentUpdate(nextProps,nextState)

executed when props and state change

it must return a boolean value when the value is `true` components will execute next hook otherwise it will prevent component update

### componentWillUpdate(18 abandoned)

executed after shouldComponentUpdate was called

## render

### getSnapshotBeforeUpdate(prevProps, prevState)

the content returented by this method will be passed as a parameter to componentDidUpdate

### componentDidUpdate(preProps,preState,snapShot)

executed when component updated


