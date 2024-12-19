import merge from 'lodash/merge';

import { useTemplateContextStore } from '@finch-cloud/common';
import { useBuilderStore } from '~model/builderSlice';
import { inputs } from '~constants/inputs';
// import _ from 'lodash';
// import { NIL, parse, stringify, v1, v3, v4, v5, validate, version } from 'uuid';
// import {
//   copyToClipboard,
//   downloadFile,
//   goToURL,
//   setRouter,
//   showNotification,
// } from '../eventHandlerHelper/utils/commonUtils';
// import {
//   downloadFromDrive,
//   saveToDrive,
// } from '../eventHandlerHelper/utils/driveUtils';
// import {
//   setGlobalDataIn,
//   setGlobalDataValue,
// } from '../eventHandlerHelper/utils/globalDataUtils';
// import {
//   clearLocalStorage,
//   setValueLocalStorage,
// } from '../eventHandlerHelper/utils/localStorage';

const THIRD_PARTY_PACKAGES = {
  // _: {
  //   ..._,
  // },
  // uuid: {
  //   NIL,
  //   parse,
  //   stringify,
  //   v1,
  //   v3,
  //   v4,
  //   v5,
  //   validate,
  //   version,
  // },
  // dayjs,
};
class RuntimePropsCollector {
  private _runtimeProps: Record<string, unknown> = {};

  private static instance: RuntimePropsCollector | null = null;

  constructor() {
    this._runtimeProps = {
      ...THIRD_PARTY_PACKAGES,
      utils: {
        // goToURL,
        // showNotification,
        // copyToClipboard,
        // setRouter,
        // downloadFile,
        // downloadFromDrive,
        // setGlobalDataIn,
        // setGlobalDataValue,
        // setLocalStorage: setValueLocalStorage,
        // clearLocalStorage,
      },
    };
  }

  public static getInstance(): RuntimePropsCollector {
    if (!RuntimePropsCollector.instance) {
      RuntimePropsCollector.instance = new RuntimePropsCollector();
    }
    return RuntimePropsCollector.instance;
  }

  public addRuntimeProp(displayName: string, runtimeProp: unknown) {
    this._runtimeProps[displayName] = runtimeProp;
  }

  public deleteRuntimeProp(displayName: string) {
    if (!this._runtimeProps[displayName]) {
      return;
    }
    delete this._runtimeProps[displayName];
  }

  public getRuntimeProps() {
    return this._runtimeProps;
  }

  public getThirdPartyPackages() {
    return THIRD_PARTY_PACKAGES;
  }

  public getGlobalCalcContext(otherContext?: Record<string, unknown>) {
    const executionResult = useTemplateContextStore.getState()
      .templatesByName as object;
    const templateInputs = useBuilderStore.getState().templateSettings.inputs;

    return merge(
      {},
      this._runtimeProps,
      executionResult,
      {
        templateInputs: templateInputs.reduce((acc, input) => {
          acc[input.name] = inputs[input.renderer].defaultValue;
          return acc;
        }, {}),
      },
      otherContext
    );
  }
}

export const RuntimePropsCollectorInstance =
  RuntimePropsCollector.getInstance();
