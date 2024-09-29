/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'

import useDynamicScript from '../customHooks/useDynamicScript'
import StatusPage from '../common/StatusPage'
import { StateView } from '../state/store'
import { DynamicMicrofrontendProps } from './DynamicMicrofrontend'

interface ModuleLoaderProps extends DynamicMicrofrontendProps {
  url: string;
  changePanelData: (data: Partial<StateView>) => void;
  getCurrentView: () => StateView | undefined;
}

interface ComponentCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type LazyComponentType = React.LazyExoticComponent<React.ComponentType<unknown>>;

const ModuleLoader: React.FC<ModuleLoaderProps> = (props) => {
  console.log(props)
  const [Component, setComponent] = useState<React.FC<ModuleLoaderProps>>()
  const { ready, failed } = useDynamicScript({ url: props.url })
  const componentCache: ComponentCache = {}

  async function loadComponent(scope: string , module: string) {
    // Check if the container exists
    if (!(window as ComponentCache)[scope]) {
      throw new Error(`Container ${scope} does not exist`)
    }

    // Initialize the share scope
    await __webpack_init_sharing__("default")
    const container = (window as ComponentCache)[scope]
    console.log(container)

    // Initialize the container
    await container.init(__webpack_share_scopes__.default)

    // Get the factory for the module
    const factory = await container.get(module)
    const Module = factory()
    return Module
  }

  useEffect(() => {
    async function fetchComponent() {
      if (!props.component) {
        setComponent(() => () => <p>No Remote component specified</p>)
        return
      }

      if (failed) {
        setComponent(() => () => <StatusPage componentLine={`Error loading ${props.component}`} urlLine={`Components from ${props.url} are not available`} status={'error'} />)
        return
      }

      if (!ready) {
        setComponent(() => () => <StatusPage componentLine={props.component} urlLine={props.url} status={'loading'}/>)
        return
      }

      const [scope, module] = props.component.split('/')

      if (componentCache[props.component]) {
        setComponent(() => componentCache[props.component])
      } else {
        try {
          const LoadedComponent: LazyComponentType = React.lazy(() => loadComponent(scope, `./${module}`))
          componentCache[props.component] = LoadedComponent
          setComponent(() => LoadedComponent)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setComponent(() => () => <p>Error loading component: {props.component}</p>)
        }
      }
      console.log('cache', componentCache)
    }

    fetchComponent()
  }, [props.component, props.url, ready, failed])

  return (
    <>
      {Component ? <Component {...props} /> : <p>Loading...</p>}
    </>
  )
}

export default ModuleLoader
