type UtilDescription = {
  desc?: string;
  usage: string;
};

export const UTILS_DESRIPTION: Record<string, UtilDescription> = {
  goToURL: {
    desc: '',
    usage: 'utils.goToURL({url:string,newTab?:boolean = false})',
  },
  showNotification: {
    desc: '',
    usage: `utils.showNotification({type:"info" | "error" | "success" | "warning" | "normal" = "info",title?:string,description?:string,duration?:number = 4500})`,
  },
  copyToClipboard: {
    desc: '',
    usage: `utils.copyToClipboard(copiedValue:any)`,
  },
  setRouter: {
    desc: '',
    usage: 'utils.setRouter({pagePath:string;viewPath?:string})',
  },
  downloadFile: {
    desc: '',
    usage: `utils.downloadFile({fileType?:string = "auto";fileName?:string = "Untitled File",data:any})`,
  },
  setGlobalDataIn: {
    desc: '',
    usage: `utils.setGlobalDataIn({key:string,path:string,value:any})`,
  },
  setGlobalDataValue: {
    desc: '',
    usage: `utils.setGlobalDataValue({key:string,value:any})`,
  },
  setLocalStorage: {
    desc: '',
    usage: `utils.setLocalStorage({key:string,value:any})`,
  },
  clearLocalStorage: {
    desc: '',
    usage: `utils.clearLocalStorage()`,
  },
};
