import cx from 'clsx';
// import { useRouter } from 'next/router';

import { Link } from '~features/routing';
import { Link as LinkProps } from '~features/ui/types';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import classes from './Navigation.module.css';

export const Navigation: React.FC<{
  navLinks?: Array<LinkProps>;
  className?: string;
}> = ({ navLinks, className }) => {
  // TODO: const { asPath } = useRouter();

  return (
    <nav className={className}>
      {navLinks?.map(({ title, href }, index) => (
        <Link
          key={index}
          route={href}
          className={cx(
            typographyClasses.default,
            classes.link,
            window.location.pathname.startsWith(href) && classes.link_active
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
};
