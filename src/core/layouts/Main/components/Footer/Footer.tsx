import Logo from '@/core/layouts/Main/components/Header/Logo';

import { Container, Group, Anchor, ActionIcon } from '@mantine/core';

import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
import { IconBrandTelegram, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner} fluid>
        {/* Logo */}
        <Logo />

        {/* Links */}
        <Group gap="lg" className={styles.links}>
          <Anchor href="/about" size="sm">
            {t('about')}
          </Anchor>
          <Anchor href="/contact" size="sm">
            {t('contact')}
          </Anchor>
          <Anchor href="/privacy" size="sm">
            {t('privacy_policy')}
          </Anchor>
          <Anchor href="/terms" size="sm">
            {t('terms_and_conditions')}
          </Anchor>
        </Group>

        {/* Socials */}
        <Group gap="sm" className={styles.socials}>
          <ActionIcon size="lg" variant="subtle" component="a" href="https://t.me/" target="_blank">
            <IconBrandTelegram size={22} />
          </ActionIcon>
          <ActionIcon size="lg" variant="subtle" component="a" href="https://github.com/" target="_blank">
            <IconBrandInstagram size={22} />
          </ActionIcon>
          <ActionIcon size="lg" variant="subtle" component="a" href="https://linkedin.com/" target="_blank">
            <IconBrandFacebook size={22} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
