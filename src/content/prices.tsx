import React, {useEffect, useState} from "react";
import {Perfumehub} from "../provider/perfumehub";
import {Data} from "../model/data";

const Prices = () => {
  const [prices, setPrices] = useState(new Data())
  const h1 = document.getElementsByTagName('h1')
  const name = h1[0]?.innerHTML.replace(/<.*>.*?/ig, '')

  //TODO move providers to options and use builder
  const provider = new Perfumehub

  useEffect(() => {
    provider.getData(name).then(data => setPrices(data))
  }, [])

  return (
      <div>
        {prices?.types?.map((type, i) => {
          return (
              <div key={i}>
                <p><strong>{chrome.i18n.getMessage(type.name.replace(' ', '_'))}</strong> <a target={"_blank"} href={provider.getHost() + type.url} rel="noreferrer">link</a></p>
                <table>
                  <thead>
                  <tr>
                    <td style={{width: "50%"}}>{chrome.i18n.getMessage("size")}</td>
                    <td style={{width: "50%"}}>{chrome.i18n.getMessage("price")}</td>
                  </tr>
                  </thead>
                  <tbody>
                    {type.sizes.map((size, j) => {
                      return (
                          <tr key={j}>
                            <td>{size.size} ml {size.tester && <span>{chrome.i18n.getMessage("tester")}</span>} {size.set && <span>{chrome.i18n.getMessage("set")}</span>}</td>
                            <td>{size.price} {provider.getCurrency()} {size.priceChange != 0 && <span style={{color: size.priceChange > 0 ? 'red' : 'green'}}>{size.priceChange.toFixed(2)}%</span>}</td>
                          </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          )
        })}
        {prices.provider && <p><i>{chrome.i18n.getMessage("source")}: {provider.getName()}</i></p>}
      </div>
  )
}

export default Prices