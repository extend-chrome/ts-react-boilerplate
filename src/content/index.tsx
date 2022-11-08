import React from 'react'
import { render } from 'react-dom'
import Prices from "./prices";
const appElement = document.createElement('div')
appElement.id = 'prices-box'
render(<Prices/>, appElement)

const ratingElement = document.getElementById('rating')
ratingElement?.parentNode?.insertBefore(appElement, ratingElement?.nextSibling)