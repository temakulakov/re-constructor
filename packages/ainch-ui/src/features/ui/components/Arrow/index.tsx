import cx from 'clsx';

import classes from './Arrow.module.css';

type ArrowProps = { className?: string } & React.SVGProps<SVGSVGElement>;

export const Arrow = ({ className, ...props }: ArrowProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(classes.arrow, className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M8.75 9.6875C8.23223 9.6875 7.8125 9.26777 7.8125 8.75C7.8125 8.23223 8.23223 7.8125 8.75 7.8125H21.25C21.7678 7.8125 22.1875 8.23223 22.1875 8.75V21.25C22.1875 21.7678 21.7678 22.1875 21.25 22.1875C20.7322 22.1875 20.3125 21.7678 20.3125 21.25V11.0133L9.41291 21.9129C9.0468 22.279 8.4532 22.279 8.08709 21.9129C7.72097 21.5468 7.72097 20.9532 8.08709 20.5871L18.9867 9.6875H8.75Z"
        fill="#2B2A29"
      />
    </svg>
  );
};
