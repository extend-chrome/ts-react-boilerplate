import React from 'react'

const App = (): JSX.Element => {
  return (
    <div>
      <p>{chrome.i18n.getMessage("soon")}</p>
    </div>
  )
}

export default App
