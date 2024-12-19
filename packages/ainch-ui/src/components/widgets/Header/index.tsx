import { Link as LinkProps } from '~features/ui/types';
import { Link, routes } from '~features/routing';
import { Button } from '~features/ui/components/Button';
import { Container as DefaultContainer } from '~features/ui/components/Container';
import { Navigation } from '~features/ui/components/Navigation';
import { Logo } from '~features/ui/components/Logo';
import classes from './Header.module.css';

type HeaderProps = { navLinks?: Array<LinkProps> };

export const Header = ({ navLinks }: HeaderProps) => {
  return (
    <DefaultContainer hasPadding>
      <header className={classes.header}>
        <Link className={classes['logo-wrapper']} route={routes.INDEX}>
          <Logo className={classes.logo} />
        </Link>
        <Navigation navLinks={navLinks} />
        <Button variant="tertiary" hash=".contacts-form">
          Обсудить проект
        </Button>
      </header>
    </DefaultContainer>
  );
};
