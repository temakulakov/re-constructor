/* eslint-disable max-len */
import cx from 'clsx';

type LogoProps = { className?: string } & React.SVGProps<SVGSVGElement>;

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100px"
      height="57px"
      viewBox="0 0 233 57"
      version="1.1"
      className={cx(className)}
      {...props}
    >
      <g fillRule="evenodd">
        <path d="M16.32 56.591H0V0h40.932v15.356H16.524v5.968h24.408v13.952H16.524zM45.246 0h20.466v56.591H45.246zM197.49 19.775h19.067V0H233v56.591h-16.443V35.365H197.49V56.59h-16.443V0h16.443zM106.03 25.626V0h16.358v56.591h-16.625L87.06 28.296l-.266 28.295H70.435V0h16.359l18.97 25.626zM177.932 16.5l-12.96 6.216c-2.058-4.568-6.522-7.733-11.697-7.733-7.13 0-12.91 6.007-12.91 13.416 0 7.41 5.78 13.416 12.91 13.416 5.018 0 9.367-2.975 11.503-7.32l13.061 5.804c-4.346 9.626-13.756 16.292-24.664 16.292-15.038 0-27.23-12.668-27.23-28.295C125.946 12.668 138.138 0 153.176 0c10.987 0 20.453 6.762 24.757 16.5Z" />
      </g>
    </svg>
  );
};
