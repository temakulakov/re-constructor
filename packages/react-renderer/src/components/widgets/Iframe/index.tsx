import classes from './Iframe.module.css';

type IframeProps = {
  url: string;
  height: number;
  width: number;
};

export const Iframe = ({ url, height, width }: IframeProps) => {
  return (
    <iframe
      title="iframe"
      src={url}
      height={height}
      width={width}
      className={classes.wrapper}
    />
  );
};
